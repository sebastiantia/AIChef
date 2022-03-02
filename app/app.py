from typing import List
import os
import openai
import argparse
import re

MAX_INPUT_LENGTH = 12

def main():
    print("Running app!")

    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    print(f"User input: {user_input}")

    if validate_length(user_input):
        branding_result = generate_branding_snippet(user_input)
        keywords_result = generate_keywords(user_input)
    else:
        raise ValueError("Input length is too long. Must be under 12")

def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH

def generate_keywords(prompt: str) -> List[str]:
    # Load your API key from an environment variable or secret management service
    openai.api_key = "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"
    enriched_prompt = f"Generate related branding keywords for {prompt}: "
    print(f"Enriched prompt: {enriched_prompt}")

    response = openai.Completion.create(
        engine="davinci-instruct-beta-v3", prompt=enriched_prompt, max_tokens=32
    )

    # Extract output text.
    keywords_text: str = response["choices"][0]["text"]

    # Strip whitespace.
    keywords_text = keywords_text.strip()
    keywords_array = re.split(",|\n|;|-", keywords_text)
    keywords_array = [k.lower().strip() for k in keywords_array]
    keywords_array = [k for k in keywords_array if len(k) > 0]

    print(f"Keywords: {keywords_array}")
    return keywords_array

def generate_branding_snippet(prompt: str):

    openai.api_key = "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"

    enriched_prompt = f"Generate upbeat poem for {prompt}: "

    response = openai.Completion.create(
        engine="davinci-instruct-beta-v3", prompt=enriched_prompt, max_tokens=32
    )
    # Extract output text
    branding_text: str  = response["choices"][0]["text"]
    #Strip \n
    branding_text = branding_text.strip()
    #Added ... to truncated statements
    last_char = branding_text[-1]
    if last_char not in {".","!","?"}:
        branding_text += "..."
    print(f"Resulting branding text: {branding_text}")
    return(branding_text)

if __name__ == '__main__':
    main()