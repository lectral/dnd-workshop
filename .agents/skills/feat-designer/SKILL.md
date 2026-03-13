---
name: feat-designer
description: Design or revise Dungeons & Dragons 5e feats. Use when a DM or designer needs balanced 2024-first feat wording, clear prerequisites, and copy-paste-ready mechanics. Default to English output.
compatibility: Offline-friendly. Markdown only.
metadata:
  domain: dnd
  editions: 2024 primary; 2014 fallback
  output: feat-block
---

# Feat Designer

Use this skill when the user wants a new feat, a revised feat, a feat chain entry, a background-linked feat, an Epic Boon style reward, or a balance pass on an existing feat.

## Core operating rules

- Use the Sage persona only for analysis. Final feat text must read like clean game material.
- Prefer **D&D 2024** feat structure and wording. Use **2014** only when the request depends on it, and mark that fallback with `⚠️`.
- Default to English for descriptive and mechanical text.
- Correct grammar, punctuation, and spelling while preserving the feat's intended voice and function.
- Keep names, terminology, and formatting consistent unless the user explicitly changes them.
- Remove strikethrough text, editor comments, meta notes, and unresolved suggestions from the final feat.
- Avoid bullet points in the finished feat text. Use direct rules paragraphs instead.
- Design for table speed. Avoid feats that require constant tracking, nested exceptions, or vague triggers.
- Output only the finished feat unless the user explicitly asks for notes, alternatives, or balance commentary.

## Workflow

1. Identify the feat's role: combat, exploration, social, mobility, magic, crafting, defensive, origin, general, or Epic Boon.
2. Lock the intended power band: entry feat, mid-tier build piece, capstone reward, or narrative perk with light mechanics.
3. Decide whether the feat needs a `Prerequisite`. If yes, write the minimum condition needed to control abuse.
4. Draft the benefit package using standard 5e wording, exact triggers, and explicit limits.
5. Check action economy, stacking risk, frequency, and class interaction. If the feat competes poorly with official options, strengthen it. If it eclipses them, cut scope or frequency.
6. Remove all hidden notes and leave a publication-ready feat block.

## Hard requirements

- Start with the feat name as the header.
- State the feat category or context when it matters, especially for **Origin Feat**, **General Feat**, or **Epic Boon** style output.
- If a feat has a requirement, include a `Prerequisite:` line immediately under the title.
- Benefits must be written as direct rules text, not design explanation.
- Use exact 5e terms such as `Action`, `Bonus Action`, `Reaction`, `Attack Roll`, `Saving Throw (DC X)`, `Advantage`, `Disadvantage`, `Hit Points`, `Restrained`, `Immunity`, `Expend a Charge`, and capitalized Conditions.
- Write conditional mechanics as explicit statements such as `If`, `When`, `As long as`, and `Otherwise`.
- Use exact measurements and limits: `feet`, `pounds`, `rounds`, `minutes`, `hours`, and `X charges` where relevant.
- Use player-facing imperative language. Do not drift into passive or DM-facing explanation.
- If the feat includes a saving throw, use this exact format:

  ```
  **Ability.** *Saving Throw Type:* **DC X**, targets/area. *Failure:* effect. *Success:* effect. *Additional Clauses (if any):* further consequences.
  ```

  Do not deviate from this phrasing, line breaks, or punctuation.
- Do not bundle too many unrelated benefits into one feat. Each feat should have a single mechanical identity.
- If the feat grants spellcasting, name the spell, casting limit, spellcasting ability, and recharge condition.

## Default structure

1. Feat name
2. Optional `Prerequisite:` line
3. Optional short flavor line (default English)
4. English mechanical benefits

## Balance guidance

- Entry feats should grant a clear identity without becoming mandatory.
- Repeatable combat bonuses should be narrower than class features.
- Defensive feats should not invalidate common encounter tools.
- Mobility feats should specify timing, distance, and constraints.
- Epic Boon style feats may be stronger, but they still need concise wording and one dominant payoff.
