# Scenario Template Reference

Use this reference to generate a complete compact scenario focused on one major location or one event.

## Core rules

- Narrative text, flavor, and read-aloud default to English. Mechanical terms remain in English (for example `Strength`, `Perception`, `Athletics`, `DC`, `AC`, `HP`).
- Do not generate full statblocks. Use short stat block references only.
- Keep scene components selective: include only elements that exist and matter in the scene.

## Required output shape

Use this exact structure and section order:

```markdown
# [Location Name]
## Overview
*   **Campaign Hook / Introduction:** [...]
*   **Key Themes & Tone:** [...]
*   **Location-Wide Mechanics:** [...]
*   **Scaling Advice:** [...]

## Description
[2-4 concise paragraphs]

## Scenes
### Scene [Number]: [Descriptive Scene Name]
**Read Aloud:**
> *[Scene introduction text]*

### Components
**[Component Name]:** [Mechanics, checks, DCs, triggers, outcomes]
When [trigger], read:
> [Outcome text]

**Objectives:** [...]
**Rewards (if not covered in Loot):** [...]

**Connections:**
*   **Entrance From:** [...]
*   **Exits To:** [...]

### Scene [Number]: [Next Descriptive Scene Name]
*(Repeat as needed.)*

## NPCs
*   **[NPC Name]:** [Role, traits, Stat Block Reference]

## Loot & Rewards Summary
*   **Treasure:** [...]
*   **Information & Secrets:** [...]
*   **Story Advances:** [...]

## DM Handbook
### Plot Integration Points
### Alternate Outcomes
### Pacing and Session Flow
### Difficulty and Scaling Adjustments
### Player Agency and Choices
### Common Pitfalls and Troubleshooting
```

## Component coverage checklist

For each important scene component, specify:

- how the DM presents it
- what triggers it
- what check or condition matters
- what success, failure, or mixed progress changes
- what clue or fallback exists if it gates progress

## Reference style

Use short references to external mechanics, for example:

`**Custom: Spectral Guardian** (use existing statblock reference).`

Do not inline complete statblocks or full item writeups.
