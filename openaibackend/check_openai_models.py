#!/usr/bin/env python3
"""
A simple script to check which OpenAI models are available to your account.
This helps troubleshoot why certain models might not be working.
"""

import os
import sys
from openai import OpenAI
from dotenv import load_dotenv

# Load API key from .env file if available
load_dotenv()

# Get API key from environment variable
api_key = os.environ.get("OPENAI_API_KEY")
if not api_key:
    print("Error: OPENAI_API_KEY environment variable not set.")
    print("Please set it with: export OPENAI_API_KEY='your-api-key'")
    sys.exit(1)

# Initialize the client
client = OpenAI(api_key=api_key)

def check_model_availability(model_id):
    """Test if a specific model is available by making a minimal API call."""
    try:
        # Make a minimal, cheap API call
        response = client.chat.completions.create(
            model=model_id,
            messages=[{"role": "user", "content": "Hi"}],
            max_tokens=1  # Minimal tokens to keep cost down
        )
        return True, "Available"
    except Exception as e:
        return False, str(e)

def main():
    # Models we're interested in checking
    models_to_check = [
        "gpt-3.5-turbo",  # Baseline model - should work
        "gpt-4o",         # Used in your search_agent and verifier_agent
        "gpt-4o-mini",    # Used in your planner_agent (after update)
        "o1-mini",        # Previously used in planner_agent (causing errors)
        "o3-mini",        # Previously used model
        "gpt-4.5-preview-2025-02-27",  # Previously used in writer_agent
    ]
    
    print("Checking OpenAI API connection and model availability...\n")
    
    # First, list all available models
    try:
        print("Fetching list of all available models...")
        models = client.models.list()
        available_models = [model.id for model in models.data]
        print(f"Total models available to your account: {len(available_models)}\n")
        
        # Print first few models
        print("Sample of available models:")
        for model in available_models[:5]:
            print(f"- {model}")
        print("...\n")
        
    except Exception as e:
        print(f"Error fetching models: {e}")
        available_models = []
    
    # Check specific models we're interested in
    print("Checking specific models for our application:")
    for model in models_to_check:
        # First check if model is in the available list
        list_available = model in available_models
        
        # Then try to make a minimal API call
        is_available, message = check_model_availability(model)
        
        status = "✅" if is_available else "❌"
        list_status = "Listed" if list_available else "Not listed"
        
        print(f"{status} {model}: {list_status}")
        if not is_available:
            print(f"   Error: {message}")
    
    print("\nRecommendations:")
    print("1. If a model is unavailable, check that your account has access to it")
    print("2. Some models (like preview models) might be deprecated or renamed")
    print("3. For each unavailable model, update your code to use an available alternative")

if __name__ == "__main__":
    main() 