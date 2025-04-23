import asyncio
import uuid
from typing import Dict

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Assuming FinancialResearchManager is adjusted to handle conversations
from examples.financial_research_agent.manager import FinancialResearchManager, FinancialReportData

app = FastAPI(
    title="Crypto Financial Advisor Agent API",
    description="API for interacting with the conversational financial research agent.",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, replace with specific frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# In-memory store for conversation managers (replace with persistent store if needed)
sessions: Dict[str, FinancialResearchManager] = {}


class ChatRequest(BaseModel):
    query: str
    session_id: str | None = None


class ChatResponse(BaseModel):
    response: str # Changed from placeholder: Will hold the markdown report
    follow_up_questions: list[str]
    session_id: str

def log_api_update(message: str):
    """Callback function to print updates from the manager in the API server context."""
    print(f"[API Update] {message}")

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    """Receive a query and return the agent's response for a session."""
    session_id = request.session_id or str(uuid.uuid4())

    if session_id not in sessions:
        print(f"Creating new session: {session_id}")
        # Pass the callback function during initialization
        sessions[session_id] = FinancialResearchManager(update_callback=log_api_update) 
    elif not sessions[session_id].update_callback: 
        # Ensure existing managers also get the callback if they were created before this change
        # (This is less likely needed if restarting the server but good practice)
        sessions[session_id].update_callback = log_api_update

    manager = sessions[session_id]

    # --- Use the refactored manager --- 
    print(f"Processing API request for session {session_id}...")
    report: FinancialReportData = await manager.process_query(request.query)
    print(f"Finished processing API request for session {session_id}.")
    # --- End manager interaction ---

    return ChatResponse(
        response=report.markdown_report, # Use actual report data
        follow_up_questions=report.follow_up_questions, # Use actual follow-up data
        session_id=session_id
    )

if __name__ == "__main__":
    import uvicorn
    # Note: Run this from the workspace root usually
    # Example: uvicorn examples.financial_research_agent.api_server:app --reload --port 8000
    uvicorn.run(app, host="127.0.0.1", port=8000) 