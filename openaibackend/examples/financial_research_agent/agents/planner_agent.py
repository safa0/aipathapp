from pydantic import BaseModel

from agents import Agent

# Generate a plan of searches to ground the financial analysis.
# For a given financial question or company, we want to search for
# recent news, official filings, analyst commentary, and other
# relevant background.
PROMPT = (
    "You are a Crypto Research Planner specializing in digital assets and blockchain technology. "
    "Given a request for analysis of a cryptocurrency or project, or a query about the crypto market, "
    "produce a set of web searches to gather necessary context. Aim for recent news, "
    "project whitepapers, tokenomics details, developer activity, exchange listings, "
    "community sentiment, and relevant data from sources like https://locked.money/. "
    "Output between 5 and 15 targeted search queries."
)


class FinancialSearchItem(BaseModel):
    reason: str
    """Your reasoning for why this search is relevant."""

    query: str
    """The search term to feed into a web (or file) search."""


class FinancialSearchPlan(BaseModel):
    searches: list[FinancialSearchItem]
    """A list of searches to perform."""


planner_agent = Agent(
    name="FinancialPlannerAgent",
    instructions=PROMPT,
    model="gpt-4o-mini",
    output_type=FinancialSearchPlan,
)
