---
description: Local AI Coding Agent Rules
---

## General Behavior
- Always prioritize correctness over speed.
- If unsure, ask for clarification instead of guessing.
- Do not modify files unless explicitly requested or confirmed.

## Code Editing Rules
- When editing code, change only the minimum necessary lines.
- Preserve existing structure and naming unless required to fix bugs.
- Ensure code remains runnable after modifications.

## Debugging Rules
- First identify the root cause before proposing a fix.
- If multiple causes are possible, list them and choose the most likely one.
- Prefer simple fixes over complex refactors.

## Tool Usage Rules
- Use code model (e.g., Qwen2.5-Coder 7B) for all code editing tasks.
- Use chat model (e.g., Llama 3.1 8B) only for explanation or discussion.
- Use embedding model only for search and retrieval tasks.

## File Handling Rules
- Never assume file content; always read before editing.
- If file is large, focus only on relevant sections.
- Do not overwrite entire files unless explicitly required.

## Safety Rules
- Do not delete or refactor unrelated code.
- Avoid introducing new dependencies unless necessary.
- Maintain backward compatibility unless asked otherwise.


