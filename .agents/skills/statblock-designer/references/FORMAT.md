# Statblock Designer Reference

## Minimal structure

```markdown
## [Creature Name]
*[Size] [Type] ([Subtype if any]), [Alignment]*

**Armor Class** ...
**Hit Points** ...
**Speed** ...

|       | STR | DEX | CON | INT | WIS | CHA |
|:-----:|:---:|:---:|:---:|:---:|:---:|:---:|
| Score | ... | ... | ... | ... | ... | ... |
| Mod   | ... | ... | ... | ... | ... | ... |
| Save  | ... | ... | ... | ... | ... | ... |

**Skills** ...
**Damage Resistances** ...
**Damage Immunities** ...
**Condition Immunities** ...
**Senses** ..., passive Perception ...
**Languages** ...
**Challenge** X (Y XP; PB +Z)

**Trait Name.** ...

### Actions
**Multiattack.** ...
**Action Name.** ...

### Bonus Actions
### Reactions
### Legendary Actions
### Lair Actions
### Regional Effects

## DM Handbook
### Meta
### Tactics
### Roleplaying
### Lore
### Rescaling
```

## Quality checklist

- Does the offense match the stated CR?
- Does the defense match the stated CR?
- Does the creature have a clear encounter role?
- Can a DM run it without rereading every turn?
- Are all user requirements present?
- Are names, factions, environments, and lore consistent?

## Handbook prompts

### Meta
Weight range, environments, sensory cues, diet, lifecycle, lairs, treasure, renown, migration, creation myths.

### Tactics
Opening move, target priority, movement pattern, synergy, bloodied behavior, retreat logic, minion coordination.

### Roleplaying
Demeanor, motives, tells, body language, bargains, taboos, sample speech.

### Lore
Use structured checks such as `**History (Intelligence).** *DC 12:* ...`

### Rescaling
Add or swap one meaningful module at a time: Reaction, Legendary Action, aura, phase two, lair action, mythic rider, death throes, minion synergy.
