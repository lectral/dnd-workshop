---
name: item-designer
description: Design or revise Dungeons & Dragons 5e items, weapons, armor, relics, consumables, and cursed treasures. Use when a DM needs clear, copy-paste-ready 2024-first wording and precise mechanics. Default to English output.
compatibility: Offline-friendly. Requires only Markdown output.
metadata:
  domain: dnd
  editions: 2024 primary; 2014 fallback
  output: item-block
---

# Item Designer

Use this skill when the user wants a magic item, relic, consumable, cursed object, quest reward, signature weapon, or revision of an existing item.

## Core operating rules

- Use the Sage persona only for analysis. Final item text must not sound robotic.
- Prefer **D&D 2024** phrasing and terminology. Use **2014** only as a fallback and mark it with `⚠️`.
- Default to English for both flavor and mechanics.
- Correct grammar, punctuation, and spelling while preserving the author's voice. Keep names, terminology, and formatting consistent unless the user explicitly changes them.
- Remove strikethrough text, editor comments, meta notes, and unresolved suggestions from the final output.
- Avoid bullet points in the finished item text. Use the standard item block structure instead.
- Use precise 5e wording. No invented action types, no fuzzy durations, no vague ranges.
- Output only the finished item unless the user explicitly asks for notes or variants.

## Workflow

1. Parse the request for item type, rarity, attunement, intended bearer, effect theme, and power ceiling.
2. Decide which sections are needed: flavor, attunement, passive property, activated ability, charges, curse, table, or lore rider.
3. Draft mechanics in player-facing English with exact triggers, limits, and outcomes.
4. Write 1-2 sentences of vivid flavor in English by default.
5. Check rarity discipline. If the effect is too strong, reduce frequency, scope, scaling, or action economy abuse.
6. Remove all hidden notes and leave a clean, publication-ready item block.

## Hard requirements

- Header format: item name and type line with rarity and attunement.
- Use `You can` for optional abilities and `You must` for requirements.
- Use only defined 5e terms such as `Action`, `Bonus Action`, `Reaction`, `Attack Roll`, `Saving Throw (DC X)`, `Hit Points`, `Restrained`, `Immunity`, and `Expend a Charge`.
- Write conditional mechanics as explicit statements such as `If you hit with this weapon, you can...`, `When you take the Attack action, you can...`, `As long as you are attuned...`, and `Otherwise, the effect ends.`
- Use exact measurements and limits: distances in `feet`, weights in `pounds`, time in `rounds`, `minutes`, or `hours`, and charges as `X charges`.
- Write mechanics from the player's perspective. Do not shift into DM-facing passive voice for item functions.
- Charges must state maximum, recharge timing, and cost per effect.
- Random tables must state the die and cover every result.
- Saving throw text must follow this exact format:

  ```
  **Ability.** *Saving Throw Type:* **DC X**, targets/area. *Failure:* effect. *Success:* effect. *Additional Clauses (if any):* further consequences.
  ```

  Do not deviate from this phrasing, line breaks, or punctuation.
- Attunement requirements must say **by whom** or under what condition.

## Default structure

1. Item name
2. Italicized type, rarity, and attunement line
3. Flavor text (default English)
4. English mechanical sections

Use the detailed checklist in `references/CHECKLIST.md`.

## Balance guidance

- `Common`: tiny convenience or flavorful minor magic
- `Uncommon`: reliable low-tier value
- `Rare`: encounter-shaping but not campaign-breaking
- `Very Rare`: strong high-tier identity piece
- `Legendary`: build-defining, powerful, still playable
- `Artifact`: world-shaping, story-bound, often dangerous

## References

- Item checklist and formatting law: `references/CHECKLIST.md`
