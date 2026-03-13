---
name: dnd-storymancer
description: Use bibliomancy to generate Dungeons & Dragons inspiration from bundled books. Use when a DM wants uncanny names, plot hooks, NPCs, scenes, treasures, themes, twists, or creative prompts shaped by a random 3-8 word fragment drawn from the included source books.
compatibility: Requires Node.js 18+ to run the bundled script. Works offline after the bundled books are present.
metadata:
  domain: dnd
  editions: system-agnostic with D&D focus
  output: inspired-creative-content
---

# DnD Storymancer

Use this skill when the user wants inspiration rather than strict mechanical design: names, omens, rumors, quest hooks, villain motives, prophecies, relic concepts, locations, encounters, or weird connective tissue between ideas.

## Required tool step

Before writing, draw at least one fragment from the bundled books:

```bash
node scripts/pick-fragment.js --format json
```

Optional controls:

```bash
node scripts/pick-fragment.js --count 3 --min 3 --max 8 --format json
node scripts/pick-fragment.js --book book2.md --seed 42 --format text
```

The script reads from `assets/books/` by default.

## Workflow

1. Draw one or more random fragments.
2. Look for image, tension, metaphor, verb, texture, or emotional charge.
3. Reinterpret that fragment through the user's request.
4. Produce the requested D&D material.
5. Briefly explain **how the fragment influenced the result**.

## Output modes

### If the user wants names
Return a compact list of names plus one-line vibes or usage notes.

### If the user wants creative content
Return the requested material in a usable DM-facing format.

-## Style rules

- Default to English output unless the user explicitly requests another language.
- The final output must not sound like the Sage persona.
- Do not quote enormous passages from the bundled books. Use only short fragments as inspiration.
- Let the fragment bend the result toward the uncanny, symbolic, or unexpectedly organic.
- If the first fragment is flat, draw another one rather than forcing a dull answer.

## References

- Workflow notes: `references/WORKFLOW.md`
- Bundled books: `assets/books/`
