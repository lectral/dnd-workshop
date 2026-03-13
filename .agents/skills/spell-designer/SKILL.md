---
name: spell-designer
description: Design or revise Dungeons & Dragons 5e spells. Use when a DM or designer needs balanced 2024-first spell wording, correct spell block structure, and copy-paste-ready mechanics. Default to English output.
compatibility: Offline-friendly. Markdown only.
metadata:
  domain: dnd
  editions: 2024 primary; 2014 fallback
  output: spell-block
---

# Spell Designer

Use this skill when the user wants a new spell, a rewritten spell, a class spell list addition, a signature boss spell, a ritual, or a balance and wording pass on an existing spell.

## Core operating rules

- Use the Sage persona only for analysis. Final spell text must read like published game material.
- Prefer **D&D 2024** spell wording and structure. Use **2014** only when the request requires it, and mark that fallback with `⚠️`.
- Default to English for flavor, descriptive, and mechanical text.
- Correct grammar, punctuation, and spelling while preserving the spell's authored voice and intent.
- Keep names, terminology, and formatting consistent unless the user explicitly changes them.
- Remove strikethrough text, editor comments, meta notes, and unresolved suggestions from the final spell entry.
- Avoid bullet points in the finished spell text. Use the standard spell block structure instead.
- The spell must respect slot level, concentration pressure, action economy, and comparable official spell power.
- Output only the finished spell unless the user explicitly asks for variants, balance notes, or design commentary.

## Workflow

1. Identify the spell's job: damage, control, defense, mobility, utility, summoning, information, restoration, battlefield shaping, or hybrid.
2. Lock the spell's parameters first: level, school, casting time, range, components, duration, classes, and whether `Concentration` is needed.
3. Draft the full spell block using exact 5e spell language, including targets, area, save, attack, scaling, and end conditions.
4. Compare the draft against official spells at the same level and one level below and above. Adjust scope, damage, reliability, or flexibility to keep it honest.
5. Add a short flavor line in English by default only if it improves table use and does not clutter the spell block.
6. Remove all hidden notes and leave a publication-ready spell entry.

## Hard requirements

- Start with the spell name and the standard line for level and school.
- Include `Casting Time`, `Range`, `Components`, and `Duration` as explicit fields.
- If the spell uses material components with a cost or consumption clause, state that exactly.
- If the spell allows a `Saving Throw`, write it in this exact format:

  ```
  **Ability.** *Saving Throw Type:* **DC X**, targets/area. *Failure:* effect. *Success:* effect. *Additional Clauses (if any):* further consequences.
  ```

  Do not deviate from this phrasing, line breaks, or punctuation.
- If the spell can be cast at higher levels, include an `At Higher Levels.` section.
- Use exact 5e terms such as `Action`, `Bonus Action`, `Reaction`, `Attack Roll`, `Concentration`, `Saving Throw (DC X)`, `Advantage`, `Disadvantage`, `Hit Points`, `Restrained`, `Immunity`, `Expend a Charge`, and capitalized Conditions.
- Write conditional mechanics with unambiguous phrasing such as `If`, `When`, `As long as`, and `Otherwise`.
- Use exact measurements only: `feet`, `pounds`, `rounds`, `minutes`, `hours`, and clearly stated counts or charges.
- Use player-facing imperative language where the spell addresses the caster.
- Do not hide critical limits in flavor text.

## Default structure

1. Spell name
2. Level and school line
3. Spell block fields
4. Optional short flavor line (default English)
5. English rules text
6. Optional `At Higher Levels.` section

## Balance guidance

- Low-level spells need narrow scope or modest numbers.
- Broad utility spells should pay for flexibility with time, range, concentration, or duration limits.
- Control spells should make counterplay legible.
- Summoning or multi-target spells must justify their slot level with strict wording.
- Signature boss spells may be dramatic, but they still need player-readable counterplay and resolution steps.
