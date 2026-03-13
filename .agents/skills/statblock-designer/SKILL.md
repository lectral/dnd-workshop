---
name: statblock-designer
description: Create or revise balanced Dungeons & Dragons 5e statblocks for monsters, villains, allies, and combat-ready NPCs. Use when a DM needs encounter-ready mechanics, 2024-first wording, and an attached DM handbook for tactics, roleplay, lore, and rescaling.
compatibility: Offline-friendly. Requires only Markdown output. Designed for D&D 2024 first, with explicit 2014 fallback when needed.
metadata:
  domain: dnd
  editions: 2024 primary; 2014 fallback
  output: statblock-plus-handbook
---

# Statblock Designer

Use this skill when the user wants a new creature, a revised statblock, a boss upgrade, a faction elite, a summon, or a combat-ready named NPC.

## Core operating rules

- Use the Sage persona only while discussing or analyzing. Drop it completely in the final deliverable.
- Prefer **D&D 2024** wording, formatting, and Challenge line style. Use **2014** only when the request depends on it, and mark that fallback with `⚠️`.
- Use only official 5e terminology: `Action`, `Bonus Action`, `Reaction`, `Saving Throw`, `Advantage`, `Disadvantage`, and capitalized Condition names.
- Correct grammar, punctuation, and spelling while preserving the creature's authored identity and voice.
- Keep names, terminology, and formatting consistent unless the user explicitly changes them.
- Remove strikethrough text, editor comments, meta notes, and unresolved suggestions from the finished statblock and handbook.
- Write rules in **player-facing imperative language** when abilities address the creature's target or wielder. Keep monster rules unambiguous and table-fast.
- Final output should be the finished statblock and handbook only. No design notes unless the user explicitly asks for them.

## Workflow

1. Identify the creature role: brute, skirmisher, controller, artillery, lurker, support, solo boss, or companion.
2. Lock the expected threat: CR, level band, intended party size, solo or group use, and signature gimmick.
3. Build the math before prose: AC, HP, attack bonus, save DC, DPR, mobility, senses, saving throws, and resistances.
4. Write traits and actions using standard 5e formatting. If the creature has a complex gimmick, make each rule understandable on a single read.
5. Decide whether Bonus Actions, Reactions, Legendary Actions, Lair Actions, or Bloodied-style escalations are actually necessary. Do not add subsystems without payoff.
6. Append a practical **DM Handbook** with `Meta`, `Tactics`, `Roleplaying`, `Lore`, and `Rescaling`.
7. Run the final quality gate: balance, clarity, continuity, and completeness.

## Output package

Always aim for this order unless the user requests a narrower revision:

1. Creature name and type line.
2. Full statblock.
3. `## DM Handbook`
   - `### Meta`
   - `### Tactics`
   - `### Roleplaying`
   - `### Lore`
   - `### Rescaling`

Use the quick structure in `references/FORMAT.md`.

## Hard requirements

- Ability scores include modifiers in parentheses.
- Speeds are comma-separated.
- `Senses` ends with `passive Perception X`.
- `Challenge` uses `Challenge X (XP; PB +Y)` in 2024 style.
- Attack lines follow: `*Melee or Ranged Weapon Attack:* +X to hit ... Hit: ...`
- Recharge text uses `(Recharge 5-6)` or `(Recharge after a Short or Long Rest)`.
- Saving throw riders inside traits, actions, bonus actions, or reactions must use this exact format:

  ```
  **Ability.** *Saving Throw Type:* **DC X**, targets/area. *Failure:* effect. *Success:* effect. *Additional Clauses (if any):* further consequences.
  ```

  Do not deviate from this phrasing, line breaks, or punctuation.
- Use explicit conditional phrasing such as `If`, `When`, `As long as`, and `Otherwise` so triggers and end states are unmistakable.
- Use exact measurements only: `feet`, `rounds`, `minutes`, `hours`, and clearly stated ranges, areas, and durations.
- Do not invent vague timing like "briefly" or "for a while".
- If the user gives an existing statblock, preserve its identity while correcting wording, math, and formatting.

## When to be conservative

- If the user does not ask for a boss, do not add Legendary Actions by default.
- If a creature is meant for repeated use, reduce bookkeeping over novelty.
- If a feature could create table confusion, simplify the trigger or split the effect into separate abilities.

## References

- Formatting and checklist: `references/FORMAT.md`
