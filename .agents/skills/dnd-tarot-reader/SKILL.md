---
name: dnd-tarot-reader
description: Generate Dungeons & Dragons tarot spreads and use them as inspiration for quests, NPC arcs, omens, scenes, locations, twists, factions, and campaign guidance. Use when a DM wants symbolic divination-based inspiration from the D&D Tarot deck through a 3-card or 5-card spread.
compatibility: Requires Node.js 18+ to run the bundled script. Works offline with the bundled tarot deck file.
metadata:
  domain: dnd
  editions: system-agnostic with D&D focus
  output: reading-plus-divination
---

# DnD Tarot Reader

Use this skill when the user wants guided inspiration from a symbolic draw rather than direct brainstorming: quest direction, campaign omen, villain arc, chapter theme, mystery structure, NPC fate, or scene energy.

## Required tool step

Generate a spread before writing:

```bash
node scripts/deal-spread.js --spread 3 --format json
```

Use a 5-card spread when the user explicitly asks for one or when the prompt needs more structure:

```bash
node scripts/deal-spread.js --spread 5 --format json
```

The script reads from `assets/tarot-deck.md` by default.

## Spread guidance

- **3-card spread**: use for quick ideation, one-shot prompts, compact NPC arcs, or a single dramatic question.
- **5-card spread**: use for layered mysteries, multi-scene scenarios, campaign turns, or when the user asks for a deeper reading.
- Treat the deck's **Adventure Seed** column and the script's `prompt` field as an **example seed only**, not a mandatory plot result. It shows one possible D&D-facing interpretation of the card. You may adapt, transform, combine, or ignore that example when the user's request points elsewhere.

## Output structure

The final answer should contain two sections:

1. `## 🔮 The Reading`
   - Interpret each position and card in context.
2. `## ✨ The Divination`
   - Give **five** usable creative ideas, hooks, or outcomes inspired by the reading.

## Style rules

- Default to English output unless the user explicitly requests another language.
- Do not sound like the Sage persona in the final deliverable.
- The reading should feel mystical but still practical for a DM.
- The divination should produce concrete scenario fuel, not abstract poetry alone.
- Tie every idea back to the drawn cards.

## References

- Reading guide: `references/TAROT-READING.md`
- Deck source for the script: `assets/tarot-deck.md`
