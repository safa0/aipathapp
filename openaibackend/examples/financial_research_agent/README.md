# Financial Research Agent Example

This example shows how you might compose a richer financial research agent using the Agents SDK. The pattern is similar to the `research_bot` example, but with more specialized sub‑agents and a verification step.

The flow is:

1. **Planning**: A planner agent turns the end user's request into a list of search terms relevant to financial analysis – recent news, earnings calls, corporate filings, industry commentary, etc.
2. **Search**: A search agent uses the built‑in `WebSearchTool` to retrieve terse summaries for each search term. (You could also add `FileSearchTool` if you have indexed PDFs or 10‑Ks.)
3. **Sub‑analysts**: Additional agents (e.g. a fundamentals analyst and a risk analyst) are exposed as tools so the writer can call them inline and incorporate their outputs.
4. **Writing**: A senior writer agent brings together the search snippets and any sub‑analyst summaries into a long‑form markdown report plus a short executive summary.
5. **Verification**: A final verifier agent audits the report for obvious inconsistencies or missing sourcing.

## New Features

This agent has been enhanced with several features:

- **Conversation Awareness**: The agent now maintains conversation history, allowing it to understand context from previous interactions. This enables follow-up questions and more natural interactions.
- **Multiple Interfaces**:
  - **Interactive CLI**: An enhanced command-line interface that supports both initial queries via command-line arguments and an interactive session for follow-up questions.
  - **API Server**: A FastAPI-based server that exposes the agent's capabilities via a REST API, allowing integration with other applications like Postman or custom GUIs.
- **Live Progress Updates**: Both interfaces provide real-time progress updates as the agent works through planning, searching, writing, and verification steps.
- **Crypto and locked.money Focus**: The agent prompts have been tuned specifically for cryptocurrency analysis and to incorporate information from https://locked.money/.

## Running the Agent

### Interactive CLI

Run the agent in interactive CLI mode:

```bash
python -m examples.financial_research_agent.main
```

Or start with an initial query:

```bash
python -m examples.financial_research_agent.main --query "What are the current market trends for Bitcoin?"
```

The CLI will display progress updates as the agent processes your query, then present the report and follow-up questions. You can then continue the conversation by typing more questions, or exit by typing `exit` or `quit`.

### API Server

Start the API server:

```bash
uvicorn examples.financial_research_agent.api_server:app --reload --port 8000
```

The server will run on `http://127.0.0.1:8000` and provide a `/chat` endpoint for interacting with the agent.

#### API Usage Examples

Using curl to start a new conversation:

```bash
curl -X POST http://127.0.0.1:8000/chat \
-H "Content-Type: application/json" \
-d '{"query": "Tell me about the risks of investing in Bitcoin."}'
```

The response will include a `session_id` that you can use for follow-up questions:

```bash
curl -X POST http://127.0.0.1:8000/chat \
-H "Content-Type: application/json" \
-d '{"query": "What about Ethereum?", "session_id": "your_session_id_here"}'
```

### Customizing Agent Prompts

The agents have been customized for cryptocurrency analysis and to incorporate information from locked.money. For example, the writer agent now uses:

```
You are a Senior Crypto Financial Advisor and guide for https://locked.money/. You will be provided
with the original query and a set of raw search summaries. Your task is to synthesize these into
a cohesive, long-form markdown report suitable for advising someone on the crypto topic.
```

You can further customize these prompts in their respective files under the `agents/` directory.
