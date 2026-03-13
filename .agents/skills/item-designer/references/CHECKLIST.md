# Item Designer Reference

## Recommended item skeleton

```markdown
## [Item Name]
*[Type], [rarity][, requires attunement by ...]*

*[Flavor text in English by default.*]

**Property Name.** English mechanics.
**Property Name.** English mechanics.
**Charges.** X charges. The item regains ... at dawn. You can expend ...
**Curse.** English mechanics.
```

## Saving throw format

Use this exact pattern whenever an effect calls for a save:

```text
**Ability.** *Saving Throw Type:* **DC X**, targets/area. *Failure:* effect. *Success:* effect. *Additional Clauses:* further consequences.
```

## Mechanical checklist

- Is the activation type explicit?
- Is the range exact in feet?
- Is the duration exact in rounds, minutes, or hours?
- Is the limit clear: at will, once per day, charges, or recharge?
- Does attunement specify the creature, class, ability score, lineage, or condition?
- If the item modifies attacks or spellcasting, is the bonus bounded and rarity-appropriate?

## Style checklist

- Flavor text in English by default.
- Mechanics in English.
- No developer commentary.
- No empty sections.
- No contradiction between flavor and mechanics.
