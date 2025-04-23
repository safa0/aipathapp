import asyncio
import argparse

from .manager import FinancialResearchManager, FinancialReportData


# Entrypoint for the financial bot example.
# Run this as `python -m examples.financial_bot.main` and enter a
# financial research query, for example:
# "Write up an analysis of Apple Inc.'s most recent quarter."
async def run_interactive_session(manager: FinancialResearchManager, initial_query: str | None = None):
    """Runs the interactive command-line session."""
    if initial_query:
        print(f"Processing initial query: '{initial_query}'...")
        # --- Use refactored manager --- 
        try:
            report: FinancialReportData = await manager.process_query(initial_query)
            print("\n===== Agent Response =====\n")
            print(report.markdown_report)
            if report.follow_up_questions:
                print("\n----- Follow-up Questions -----")
                for q in report.follow_up_questions:
                    print(f"- {q}")
            print("\n===========================\n")
        except Exception as e:
            print(f"\nError processing initial query: {e}")
        # --- End manager interaction ---
        

    while True:
        try:
            user_input = input("> ")
            if user_input.lower() in ["exit", "quit"]:
                print("Exiting.")
                break
            if not user_input:
                continue
            
            print("Processing...")
            # --- Use refactored manager --- 
            try:
                report: FinancialReportData = await manager.process_query(user_input)
                print("\n===== Agent Response =====\n")
                print(report.markdown_report)
                if report.follow_up_questions:
                    print("\n----- Follow-up Questions -----")
                    for q in report.follow_up_questions:
                        print(f"- {q}")
                print("\n===========================\n")
            except Exception as e:
                print(f"\nError processing query: {e}")
            # --- End manager interaction ---

        except KeyboardInterrupt:
            print("\nExiting.")
            break
        except EOFError:
            print("\nExiting.")
            break

async def main() -> None:
    parser = argparse.ArgumentParser(description="Run the Crypto Financial Advisor Agent.")
    parser.add_argument("-q", "--query", help="Initial query to process before starting interactive mode.", type=str)
    args = parser.parse_args()

    print("Initializing Crypto Financial Advisor...")
    # Instantiate the manager once for the session, passing print as the callback
    manager = FinancialResearchManager(update_callback=print) 
    print("Ready. Type your query or 'exit' to quit.")

    await run_interactive_session(manager, args.query)


if __name__ == "__main__":
    asyncio.run(main())
