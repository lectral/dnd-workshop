---
name: offsession-adventure-yaml
description: Build branching Offsession adventure YAML files with scenes, exits, counters, inventory, and gates. Use when a DM needs repository-ready YAML that passes remote validation before the adventure is considered complete.
compatibility: Requires Node.js for validation. Markdown and YAML only. Uses a remote validation API.
metadata:
  domain: offsession
  output: validated-adventure-yaml
---

# Offsession Adventure YAML

Use this skill when the user wants a branching adventure file for the Offsession app, including new adventures, rewrites, expansions, examples, and schema corrections.

## Core operating rules

- Final output is YAML only unless the user explicitly asks for commentary.
- The adventure is not complete until the full YAML has been validated with `node .agents/skills/offsession-adventure-yaml/scripts/validate-yaml.js <path-to-yaml>`, which forwards the YAML to the remote validation API and reports its response.
- Always include `meta` and `scenes`.
- The first playable scene must be `id: start`.
- Every non-terminal branch must lead somewhere. Avoid dead ends unless the scene intentionally ends with `exits: []`.
- When a gate can fail, provide `failure_target` to avoid soft locks.
- Keep official D&D ability and skill names in English inside gate text and labels.
- The canonical gate vocabulary in `references/CHECKS.md` is recommended as a default set. The validator script itself does not enforce repository-local lint rules.
- Inventory items may include an optional `icon` field with an RPG Awesome icon id (see `references/ICONS.md`). The validator script will translate `icon:` into `image:` before validation.
- Use only `bonus` inventory items with `bonus_timing: "after"`. Repository references and the validator do not support `before` or `both`.

## Workflow

1. Confirm the adventure frame: premise, tone, theme, one-shot or campaign use, and expected branch depth.
2. Build the state model only as needed:
  - `counters` for hidden logic.
  - `inventory` for items, currencies, rerolls, and `after` bonuses.
3. Outline the scene graph before writing prose. Ensure `start` exists and every exit target resolves to a scene id.
4. Write scenes with concise titles, markdown-ready descriptions, and exits that are easy to run at the table.
5. Use gates only when tension or uncertainty improves the branch. Keep DCs readable and consequences clear.
6. For each gate, use a short, readable label. The canonical list in `references/CHECKS.md` remains the default recommendation.
7. Use `visible_if`, `requires_item`, `one_time`, `effects`, `add_items`, `remove_items`, and `color` only when they materially change play.
8. Validate the finished YAML with the validator script. If the remote validator reports errors, fix them and validate again before presenting the result as complete.

## Output contract

Default deliverable: a single YAML document, ready to save as an Offsession adventure file.

Unless the user requests otherwise, include sections in this order when they are needed:

1. `meta`
2. `counters`
3. `inventory`
4. `scenes`

## Schema guidance

- `meta.title` is required. `description`, `theme`, and `one_shot` should be present unless the user explicitly wants a minimal stub.
- Counter types must be `number` or `boolean`.
- Valid inventory types are `currency`, `item`, `reroll`, and `bonus`.
- `usage_count` is available for charge-based non-currency inventory.
- If `type: "bonus"`, always include `value` and set `bonus_timing: "after"`.
- Keep inventory ids stable, lowercase, and underscore-separated.
- Scene descriptions can use markdown and multiple paragraphs.
- Ending scenes should use `exits: []`.

## Exit and gate rules

- `gate.text` should clearly describe the roll and the stakes.
- `gate.short_text` should be a short, readable label for the check, such as `Dexterity`, `Investigation`, or a custom label supported by your adventure.
- `gate.show_short` should be `true` when `short_text` is present.
- `gate.dc` should reflect the actual challenge, not arbitrary difficulty inflation.
- `gate.failure_target` should resolve to an existing scene id.
- `requires_item` should use an existing inventory id and a positive integer amount.
- `visible_if` should define exactly one subject: `counter`, `item`, or `currency`.
- Prefer `effects` on an exit when choosing that path should immediately change state.
- Prefer `add_items` and `remove_items` on a scene when the state change should happen on arrival and needs player-facing text.
- Use exit `color` sparingly to signal urgency, danger, reward, or a highlighted path.

## Completion checklist

The YAML is complete only if all of the following are true:

- The document follows the schema summarized in `references/SCHEMA.md`.
- Every scene id and exit target is valid.
- The first playable scene is `start`.
- Conditional logic references existing counters or inventory ids.
- The remote validator returns success.

## References

- Schema summary: `references/SCHEMA.md`
- Canonical gate checks: `references/CHECKS.md`
- Example adventure: `references/EXAMPLE.yaml`
- Validator script: `scripts/validate-yaml.js`
