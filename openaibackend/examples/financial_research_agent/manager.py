from __future__ import annotations

import asyncio
import time
from collections.abc import Sequence, AsyncGenerator, Callable
from typing import Tuple, Optional

from rich.console import Console

from agents import Runner, RunResult, custom_span, gen_trace_id, trace

from .agents.financials_agent import financials_agent
from .agents.planner_agent import FinancialSearchItem, FinancialSearchPlan, planner_agent
from .agents.risk_agent import risk_agent
from .agents.search_agent import search_agent
from .agents.verifier_agent import VerificationResult, verifier_agent
from .agents.writer_agent import FinancialReportData, writer_agent
from .printer import Printer


async def _summary_extractor(run_result: RunResult) -> str:
    """Custom output extractor for sub‑agents that return an AnalysisSummary."""
    # The financial/risk analyst agents emit an AnalysisSummary with a `summary` field.
    # We want the tool call to return just that summary text so the writer can drop it inline.
    return str(run_result.final_output.summary)


class FinancialResearchManager:
    """
    Orchestrates the full flow: planning, searching, sub‑analysis, writing, and verification,
    maintaining conversation history and providing progress updates via callback.
    """

    def __init__(self, update_callback: Optional[Callable[[str], None]] = None) -> None:
        """Initializes the manager, optionally accepting a callback for progress updates."""
        self.history: list[Tuple[str, str]] = []
        self.update_callback = update_callback

    def _log_update(self, message: str):
        """Helper method to safely call the update callback."""
        if self.update_callback:
            self.update_callback(message)

    async def process_query(self, query: str) -> FinancialReportData:
        """Processes a single user query within the context of the conversation history."""
        trace_id = gen_trace_id()
        self.history.append(("user", query))
        
        with trace("Financial research trace", trace_id=trace_id):
            self._log_update(f"[Trace ID: {trace_id}] Starting processing for query: '{query[:50]}...'")
            search_plan = await self._plan_searches(query)
            search_results = await self._perform_searches(search_plan)
            report = await self._write_report(query, search_results, self.history)
            verification = await self._verify_report(report)
            
            self.history.append(("assistant", report.markdown_report))

            self._log_update(f"[Trace ID: {trace_id}] Finished processing. Verification: {verification.verified}")
            return report

    async def _plan_searches(self, query: str) -> FinancialSearchPlan:
        self._log_update("Planning searches...")
        result = await Runner.run(planner_agent, f"Query: {query}")
        plan = result.final_output_as(FinancialSearchPlan)
        self._log_update(f"Planning complete. Will perform {len(plan.searches)} searches.")
        return plan

    async def _perform_searches(self, search_plan: FinancialSearchPlan) -> Sequence[str]:
        with custom_span("Search the web"):
            num_tasks = len(search_plan.searches)
            self._log_update(f"Starting {num_tasks} searches...")
            tasks = [asyncio.create_task(self._search(item)) for item in search_plan.searches]
            results: list[str] = []
            num_completed = 0
            for task in asyncio.as_completed(tasks):
                result = await task
                if result is not None:
                    results.append(result)
                num_completed += 1
                self._log_update(f"Searching... {num_completed}/{num_tasks} completed")
            self._log_update(f"Searching complete. Got {len(results)} results.")
            return results

    async def _search(self, item: FinancialSearchItem) -> str | None:
        input_data = f"Search term: {item.query}\nReason: {item.reason}"
        try:
            result = await Runner.run(search_agent, input_data)
            return str(result.final_output)
        except Exception as e:
            self._log_update(f"Search failed for query '{item.query}': {e}")
            return None

    async def _write_report(self, query: str, search_results: Sequence[str], history: list[Tuple[str, str]]) -> FinancialReportData:
        # Expose the specialist analysts as tools so the writer can invoke them inline
        # and still produce the final FinancialReportData output.
        fundamentals_tool = financials_agent.as_tool(
            tool_name="fundamentals_analysis",
            tool_description="Use to get a short write‑up of key financial metrics",
            custom_output_extractor=_summary_extractor,
        )
        risk_tool = risk_agent.as_tool(
            tool_name="risk_analysis",
            tool_description="Use to get a short write‑up of potential red flags",
            custom_output_extractor=_summary_extractor,
        )
        writer_with_tools = writer_agent.clone(tools=[fundamentals_tool, risk_tool])

        # Format history for the prompt
        history_str = "\n".join([f"{role.capitalize()}: {msg}" for role, msg in history[:-1]]) # Exclude current query
        if history_str:
            history_prompt = f"Conversation History:\n{history_str}\n\n---"
        else:
            history_prompt = ""
        
        # Construct input data including history
        input_data = (
            f"{history_prompt}\n"
            f"Current User Query: {query}\n"
            f"Summarized search results: {search_results}"
        )

        self._log_update(f"Calling Writer Agent (Model: {writer_with_tools.model})...")
        # Use run instead of run_streamed as we removed the streaming updates
        result = await Runner.run(writer_with_tools, input_data)
        self._log_update("Writer Agent finished.")
        
        # Removed streaming logic
        # update_messages = [...]
        # last_update = time.time()
        # next_message = 0
        # async for _ in result.stream_events():
        #     ...
        # self.printer.mark_item_done("writing")
        
        return result.final_output_as(FinancialReportData)

    async def _verify_report(self, report: FinancialReportData) -> VerificationResult:
        self._log_update("Verifying report...")
        result = await Runner.run(verifier_agent, report.markdown_report)
        verification = result.final_output_as(VerificationResult)
        self._log_update(f"Verification complete. Verified: {verification.verified}")
        return verification
