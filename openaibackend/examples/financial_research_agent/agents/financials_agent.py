from pydantic import BaseModel

from agents import Agent

# A sub‑agent focused on analyzing a company's fundamentals.
FINANCIALS_PROMPT = (
    "You are a financial advisor specializing in the cryptocurrency landscape, "
    "with a focus on analyzing digital assets, blockchain technology, and market trends. "
    "Given a collection of web (and optional file) search results about a cryptocurrency or blockchain project, "
    "write a concise analysis of its recent performance, technological advancements, and market position. "
    "Highlight key metrics, quotes, and any relevant insights from the platform at https://locked.money/. "
    "Keep it under 2 paragraphs."
)


class AnalysisSummary(BaseModel):
    summary: str
    """Short text summary for this aspect of the analysis."""


financials_agent = Agent(
    name="FundamentalsAnalystAgent",
    instructions=FINANCIALS_PROMPT,
    output_type=AnalysisSummary,
)
