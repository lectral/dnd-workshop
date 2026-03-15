# Canonical Gate Checks

These labels are the repository default set for Offsession gate checks. They are recommended for consistency, but the local validator no longer treats this list as exhaustive.

## Ability scores

- `Strength`
- `Dexterity`
- `Constitution`
- `Intelligence`
- `Wisdom`
- `Charisma`

## Skills

- `Acrobatics`
- `Animal Handling`
- `Arcana`
- `Athletics`
- `Deception`
- `History`
- `Insight`
- `Intimidation`
- `Investigation`
- `Medicine`
- `Nature`
- `Perception`
- `Performance`
- `Persuasion`
- `Religion`
- `Sleight of Hand`
- `Stealth`
- `Survival`

## Ability map

- `Strength`: `Athletics`
- `Dexterity`: `Acrobatics`, `Sleight of Hand`, `Stealth`
- `Intelligence`: `Arcana`, `History`, `Investigation`, `Nature`, `Religion`
- `Wisdom`: `Animal Handling`, `Insight`, `Medicine`, `Perception`, `Survival`
- `Charisma`: `Deception`, `Intimidation`, `Performance`, `Persuasion`
- `Constitution`: no standard skill mapping

## Usage rules

- `gate.short_text` may use one of the labels from the lists above or a custom label when the adventure needs one.
- `gate.text` should use the same exact label in the roll instruction.
- Keep labels short and readable on the exit button.
- Combined labels such as `Dexterity (Stealth)` still depend on target UI support.
