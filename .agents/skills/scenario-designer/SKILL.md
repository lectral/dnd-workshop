---
name: scenario-designer
description: Build compact Dungeons & Dragons location or event scenarios in one pass using a fixed template. Use when a DM needs clear scenario structure, readable read-aloud copy, and DM-ready scene components. Default to English output.
compatibility: Offline-friendly. Markdown only.
metadata:
  domain: dnd
  editions: 2024 primary; 2014 fallback references
  output: complete-scenario-template
---

# Scenario Designer

Use this skill when the user wants a compact scenario centered on one major location or one event, such as a bank, villa, garden, forest, ritual site, party, siege point, or investigation venue.

## Non-negotiable rules

- Use the Sage persona only while reasoning. Final scenario text must match the fiction and user brief.
- Default to English for narrative and read-aloud. Mechanical terms such as `Perception`, `Stealth`, `Strength`, `Frightened`, `AC`, `HP`, and `DC` remain in **English**.
- Default to English for narrative, read-aloud, and component names unless a separate localization skill is active.
- Do not generate full statblocks or full magic item writeups inside the scenario. Reference them briefly instead.
- Scenarios are smaller adventure packages focused on one larger place or one event.
- Compile the full template in one pass unless the user explicitly asks for only part of it.

## Output contract

Always return the scenario using this exact structure and section order:

```markdown
# [Location Name]
## Overview
*   **Campaign Hook / Introduction:** [[How the party learns of or is drawn to this location. Suggested rumors, quest leads, or discoveries.]]
*   **Key Themes & Tone:** [[The dominant moods and themes (e.g., claustrophobic decay, fey trickery, divine awe, paranoid survival).]]
*   **Location-Wide Mechanics:** [[Any rules that apply everywhere here, like "All fire spells deal +1 damage but risk collapsing tunnels," or "A psychic whisper imposes a -1 penalty to Concentration saves."]]
*   **Scaling Advice:** [[Brief notes on adjusting encounters/loot for party level or size.]]

## Description
[[A general description of the scenario, its overall theme, significance, history, and place in the world. Aim for 2-4 concise paragraphs.]]

## Scenes
### Scene [Number]: [Descriptive Scene Name]
**Read Aloud:**
> *[Primary descriptive text read to players upon entering the scene or at a key moment.]*

### Components
[*Note: This section should contain only the mechanics, features, and interactive elements that are present and relevant to this specific scene. Describe each element in a clear, concise format.*]
**[Component Name]:** [Detailed description of how this element works, including any associated checks, DCs, consequences, or triggers. Format similar to the example. If the component has multiple outcomes include Narrative Text / Read Aloud on each outcome.]
(Add or remove components as needed for the scene.)
[optional, multiple if needed] When [trigger], read:
> [In component narrative / read alout for outcomes and events]

[**Available components:**
*Note: Not all components listed here need to be present in every scene. Include only those that are relevant.*
*   [Narrative Text / Object Descriptions / NPC Descriptions / Read Aloud]
*   [Passive Clues] / [Lore]
*   [Active Skill Checks / Skill Challenges]
*   [Progress Clocks (or Threat Gauges)] / [Time Pressure / Countdown]
*   [NPC Encounter] / [Social Encounter]
*   [Environmental Hazard / Trap]
*   [Combat Encounter]
*   [Interactive Object]
*   [Secret / Revelatory Information]
*   [Choice / Branching Path]
*   [Consequence of Previous Actions]
*   [Loot / Treasure]
*   [Narrative Notes / Letters / Handouts]
*(Select and elaborate only on the components used in this scene. Components can be used multiple times. Give each Descriptive Component Name)*]
[... write scene components in needed number ...]

**Objectives:** [What the players can achieve, progress, gain, or lose in this scene.]
**Rewards (if not covered in Loot):** [Non-material gains like key information, faction reputation, a new ally, or a story milestone.]

**Connections:**
*   **Entrance From:** [Previous Scene or Location]
*   **Exits To:** [Next Scene or Location]

### [Scene [Number]: [Next Descriptive Scene Name]]
*(Repeat the above structure for each scene in the location.)*

## NPCs
*   **[NPC Name]:** [Brief description, role, key traits, and **Stat Block Reference** (e.g., "Commoner" or "Custom: Spectral Guardian").]

## Loot & Rewards Summary
*   **Treasure:** [Consolidated list of all monetary treasure, magic items, and key objects found in the location, with their source scene noted.]
*   **Information & Secrets:** [List of all crucial lore, secrets, and revelations that can be uncovered.]
*   **Story Advances:** [List of major campaign or quest milestones achievable here.]

## DM Handbook

### Plot Integration Points
[[Suggestions for tying this location to the party's backstories, an ongoing villain's plans, or a larger world event. For example, a PC's lost artifact might be hidden here, or the villain could be using the site as a ritual ground that threatens the party's hometown. Provide hooks that feel personal and urgent to draw players in.]]

### Alternate Outcomes
[[Potential major deviations if the party fails key challenges, bypasses content, or makes a dramatic choice. Outline branching paths, such as a collapsed tunnel sealing off rewards, an awakened guardian allying with the villain, or a successful bypass leading to an unintended alliance with local factions. Include 3-5 key what-if scenarios with brief consequences to maintain flexibility.]]

### Pacing and Session Flow
[[Advice on managing time across scenes, such as estimated playtime per scene (e.g., 30-45 minutes for exploration, 1 hour for combat), ways to accelerate or extend encounters, and transitions between scenes to keep momentum. Suggest downtime activities or roleplaying opportunities to balance tension.]]

### Difficulty and Scaling Adjustments
[[Tips for adapting challenges to party size, level, or playstyle, beyond the overview notes. For instance, reduce enemy numbers for smaller groups, add environmental aids for lower levels, or introduce optional side challenges for experienced players. Include contingency plans for overpowered or underprepared parties.]]

### Player Agency and Choices
[[Guidance on empowering player decisions, including non-linear paths, moral dilemmas, or creative problem-solving. Describe how choices in one scene ripple to others (e.g., sparing an NPC unlocks a secret exit) and ways to improvise if players go off-script.]]

### Common Pitfalls and Troubleshooting
[[Warnings about potential issues, like scenes dragging due to heavy roleplaying or combat imbalances, and solutions such as foreshadowing hazards or providing subtle hints. Also cover handling meta-knowledge, group conflicts, or technical VTT glitches if applicable.]]
```

## Scene construction rules

- Keep only relevant components in each scene. Do not pad scenes with unused component categories.
- If a component has branching outcomes, include specific trigger text and in-scene read-aloud for each outcome.
- Include clear scene objectives, consequences, and forward connections.
- Keep clues fair and discoverable; add passive hints before hard gates when possible.

## Component law for scenes

Every meaningful option, clue, obstacle, or shortcut should state:
- how the DM presents it
- what triggers access
- what check or condition matters
- what success, failure, or partial progress changes
- what clues or hints exist if it is a trap, puzzle, or challenge

## Default quality bar

- Every scene has a purpose.
- Every obstacle has at least one clue or fair read.
- Every reward changes information, position, allies, resources, or momentum.
- Every connection tells the DM where play can move next.
- Do not include generated statblocks. Use stat block references only.

