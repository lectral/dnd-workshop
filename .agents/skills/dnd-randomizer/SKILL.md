---
name: dnd-randomizer
description: Roll randomized D&D content properties (statblocks, items, spells, feats, scenarios, shops) using weighted chance tables. Use when a DM or designer wants serendipitous mechanical inspiration without generating full finished content.
compatibility: Requires Node.js. Offline-friendly. Script reads references/tables.json locally.
metadata:
  domain: dnd
  editions: [2014, 2024]
  output: json-inspiration-object
---

# DnD Randomizer

Use this skill **only when all of the following are true**:

1. The user has not provided enough information to determine a specific property.
2. That property cannot be reasoned from the request context, the designer skill's own guidelines, or standard 5e conventions.
3. A random roll is preferable to an arbitrary agent choice for that property.

**Do not use this skill as a default pre-step** before every design task. Use it surgically — to fill one or a few specific gaps the agent cannot fill on its own.

The script does **not** produce finished content. It returns a short JSON object containing only the rolled fields you request, which the agent then treats as hard creative constraints.

> **Example of correct use:** The user asks for a CR 8 monster but does not say whether it should have legendary actions. The agent cannot decide without guidance. Roll `has_legendary_actions` only.
>
> **Example of incorrect use:** The user asks for a fire-themed dragon. Rolling the damage type is unnecessary — it is obvious from context.

---

## Core operating rules

- Only invoke this skill when specific properties are missing and cannot be inferred.
- Always pass `--fields` with only the properties you actually need. Do not request all fields.
- Treat every returned field as a hard creative constraint, not a suggestion.
- If a field resolves to `false` or `0`, omit that feature from the design entirely.
- When tier is not supplied, the script defaults to tier `2` (baseline).
- Drop the Sage persona in all final design deliverables. Use it only to discuss the rolls.

---

## Script invocation

```bash
node .agents/skills/dnd-randomizer/scripts/randomize.js --generator <name> --fields <f1,f2,...> [options]
```

`--fields` is **required**. Pass a comma-separated list of the specific field names you need rolled. Meta fields (`generator`, `cr`, `tier`, `cr_band`, `level`, `level_band`, `type`, `settlement`, `economy_tier`) are always included automatically and do not need to be listed.

Requesting only the fields you need keeps the output focused and prevents the agent from over-constraining designs with properties the user already determined.

**All generators support `--tier <1|2|3>`.**

| Tier | Meaning |
|------|---------|
| `1`  | Above average — more complex, more powerful, more features than its CR/level/rarity implies |
| `2`  | Baseline — matches its CR/level/rarity normally |
| `3`  | Below average — simpler, weaker, fewer features than its CR/level/rarity implies |

---

## Generator reference

### `statblock`

Rolls structural combat properties for a monster or villain.

```bash
# Roll only the properties you are missing:
node .agents/skills/dnd-randomizer/scripts/randomize.js --generator statblock --cr 6 --fields attacks,spellcasting_type
node .agents/skills/dnd-randomizer/scripts/randomize.js --generator statblock --cr 5 --tier 1 --fields has_legendary_actions,movement_types
node .agents/skills/dnd-randomizer/scripts/randomize.js --generator statblock --cr 17 --tier 3 --fields trait_count,saving_throw_count,damage_immunity_count
```

**Parameters**

| Flag | Required | Values | Notes |
|------|----------|--------|-------|
| `--cr` | Yes | `0–30` | Challenge Rating |
| `--tier` | No | `1`, `2`, `3` | Default: `2` |

**Output fields**

| Field | Description |
|-------|-------------|
| `generator` | `"statblock"` |
| `cr` | The CR provided |
| `tier` | The tier used |
| `cr_band` | Resolved band: `low`, `mid`, `high`, or `epic` |
| `size` | Creature size |
| `attacks` | Number of attacks per Attack action |
| `damage_type` | Primary damage type |
| `has_reactions` | Boolean — whether the creature has a reaction |
| `has_legendary_actions` | Boolean |
| `legendary_action_count` | Number of legendary actions (only if `has_legendary_actions` is true) |
| `has_lair_actions` | Boolean |
| `has_legendary_resistance` | Integer — number of Legendary Resistance uses (0 = none) |
| `movement_types` | Array of movement modes (e.g. `["walk","fly"]`) |
| `senses` | Array of special senses |
| `saving_throw_count` | Number of saving throw proficiencies |
| `skill_count` | Number of skill proficiencies |
| `trait_count` | Number of passive traits |
| `condition_immunity_count` | Number of condition immunities |
| `damage_resistance_count` | Number of damage resistances |
| `damage_immunity_count` | Number of damage immunities |
| `action_count` | Total distinct action entries (including multiattack) |
| `bonus_action_count` | Number of bonus action options |
| `spellcasting_type` | `none`, `innate`, `half`, or `full` |

**Tier effect on statblock:** Tier 1 shifts rolls toward more features, larger counts, and higher-end options (e.g. legendary actions more likely at CR 5 tier 1 than at CR 5 tier 3). Tier 3 shifts toward minimal features.

---

### `item`

Rolls structural properties for a magic item.

```bash
node .agents/skills/dnd-randomizer/scripts/randomize.js --generator item --fields cursed,activation
node .agents/skills/dnd-randomizer/scripts/randomize.js --generator item --type weapon --tier 1 --fields damage_bonus,has_unique_trait
node .agents/skills/dnd-randomizer/scripts/randomize.js --generator item --type wondrous --tier 3 --fields charges,recharge,effect_type
```

**Parameters**

| Flag | Required | Values |
|------|----------|--------|
| `--type` | No | `weapon`, `armor`, `wondrous`, `consumable`, `ring`, `staff` |
| `--tier` | No | `1`, `2`, `3` |

**Output fields**

| Field | Description |
|-------|-------------|
| `generator` | `"item"` |
| `type` | The type used (or `"unspecified"`) |
| `tier` | The tier used |
| `attunement_required` | Boolean |
| `charges` | Charge expression or `"none"` |
| `recharge` | When charges reset, or `"none"` |
| `effect_type` | Primary effect category |
| `activation` | How the item is triggered |
| `cursed` | Boolean |
| `sentient` | Boolean |
| `damage_bonus` | `+0` through `+3` (weapons only; always `0` for others) |
| `has_unique_trait` | Boolean — whether the item has a signature special property |

---

### `spell`

Rolls structural properties for a new spell.

```bash
node .agents/skills/dnd-randomizer/scripts/randomize.js --generator spell --fields school,aoe_type
node .agents/skills/dnd-randomizer/scripts/randomize.js --generator spell --level 3 --tier 1 --fields duration,saving_throw
node .agents/skills/dnd-randomizer/scripts/randomize.js --generator spell --level 7 --tier 2 --fields range,concentration,ritual_tag
```

**Parameters**

| Flag | Required | Values |
|------|----------|--------|
| `--level` | No | `0–9` (0 = cantrip) |
| `--tier` | No | `1`, `2`, `3` |

**Output fields**

| Field | Description |
|-------|-------------|
| `generator` | `"spell"` |
| `level` | The level used (or rolled if omitted) |
| `tier` | The tier used |
| `level_band` | Resolved band: `cantrip`, `low`, `mid`, or `high` |
| `school` | School of magic |
| `casting_time` | How the spell is cast |
| `range` | Spell range |
| `duration` | How long the spell lasts |
| `components` | Component combination |
| `aoe_type` | Area of effect shape, or `"none"` |
| `saving_throw` | Required save or `"none"` |
| `damage_type` | Primary damage type or `"none"` |
| `upcast_scaling` | Boolean — scales when cast at higher levels |
| `ritual_tag` | Boolean |
| `concentration` | Boolean |
| `target_type` | What the spell targets |

---

### `feat`

Rolls structural properties for a feat.

```bash
node .agents/skills/dnd-randomizer/scripts/randomize.js --generator feat --fields active_ability,uses_per_rest
node .agents/skills/dnd-randomizer/scripts/randomize.js --generator feat --tier 1 --fields stat_increase,spell_granted
```

**Parameters**

| Flag | Required | Values |
|------|----------|--------|
| `--tier` | No | `1`, `2`, `3` |

**Output fields**

| Field | Description |
|-------|-------------|
| `generator` | `"feat"` |
| `tier` | The tier used |
| `stat_increase` | Ability score improvement, or `"none"` |
| `passive_benefit` | Boolean — has an always-on passive |
| `active_ability` | Boolean — has an activated ability |
| `uses_per_rest` | Number of uses, or `"none"` |
| `recharge` | Rest type that recharges uses |
| `skill_granted` | Skill grant level, or `"none"` |
| `spell_granted` | Spell access granted, or `"none"` |
| `condition_related` | Boolean — interacts with conditions |
| `saving_throw_bonus` | Saving throw improvement type, or `"none"` |

---

### `scenario`

Rolls structural properties for an adventure scenario or location.

```bash
node .agents/skills/dnd-randomizer/scripts/randomize.js --generator scenario --fields twist,complication
node .agents/skills/dnd-randomizer/scripts/randomize.js --generator scenario --tier 1 --fields location_type,scene_count,reward_type
```

**Parameters**

| Flag | Required | Values |
|------|----------|--------|
| `--tier` | No | `1`, `2`, `3` |

**Tier effect on scenario:** Tier 1 increases scene count, complication complexity, and twist probability. Tier 3 simplifies.

**Output fields**

| Field | Description |
|-------|-------------|
| `generator` | `"scenario"` |
| `tier` | The tier used |
| `location_type` | Environment type |
| `primary_threat` | Core challenge category |
| `complication` | Secondary complication, or `"none"` |
| `boss_present` | Boolean |
| `twist` | Narrative twist, or `"none"` |
| `scene_count` | Number of distinct scenes |
| `has_skill_challenge` | Boolean |
| `has_chase` | Boolean |
| `reward_type` | Type of primary reward |
| `factions_involved` | Number of factions with stake in the scenario |
| `npc_count` | Number of named NPCs |

---

### `shop`

Rolls structural properties for a merchant or shop.

```bash
node .agents/skills/dnd-randomizer/scripts/randomize.js --generator shop --fields shop_quirk,special_service
node .agents/skills/dnd-randomizer/scripts/randomize.js --generator shop --type magic --settlement city --economy-tier 1 --fields inventory_quality,has_rare_item,item_count
node .agents/skills/dnd-randomizer/scripts/randomize.js --generator shop --type weapons --settlement village --economy-tier 3 --fields haggling_mood,owner_attitude
```

**Parameters**

| Flag | Required | Values |
|------|----------|--------|
| `--type` | No | `weapons`, `armor`, `magic`, `general`, `curiosity` |
| `--settlement` | No | `village`, `town`, `city` |
| `--economy-tier` | No | `1` (prosperous), `2` (average), `3` (poor) |

**Output fields**

| Field | Description |
|-------|-------------|
| `generator` | `"shop"` |
| `type` | Shop type used |
| `settlement` | Settlement size used |
| `economy_tier` | Economy tier used |
| `inventory_quality` | Overall stock quality |
| `item_count` | Number of items in stock |
| `has_rare_item` | Boolean — at least one rare+ magic item present |
| `haggling_mood` | Shopkeeper's haggling disposition |
| `special_service` | Extra service offered, or `"none"` |
| `rumor_count` | Number of rumors the shop owner knows |
| `owner_attitude` | General attitude of the proprietor |
| `shop_quirk` | Unusual characteristic of the shop, or `"none"` |

---

## Workflow

1. Determine which properties are genuinely undecided — not stated by the user, not implied by context, not derivable from the designer skill's own rules.
2. Identify the correct generator for the content type.
3. Build the `--fields` list from only those undecided properties.
4. Run the script with `--fields` and any relevant generator flags (`--cr`, `--type`, `--settlement`, etc.).
5. Read the returned JSON. Treat each rolled field as a hard creative constraint.
6. Continue with the appropriate designer skill (`statblock-designer`, `item-designer`, `spell-designer`, `feat-designer`, `scenario-designer`), applying the rolled values.
7. Do not invent properties that contradict rolled values. If `has_legendary_actions` is `false`, the creature has none.

---

## Error handling

- If `--generator` is missing or unrecognized, the script exits with code `1` and prints usage to stderr.
- If `--fields` is missing, the script exits with code `1` with a descriptive message.
- If a field name in `--fields` does not exist for the chosen generator, the script exits with code `1` and lists valid field names.
- If `--cr` is missing for `statblock`, the script exits with code `1`.
- All other parameters are optional with sensible defaults.

---

## References

- Chance tables: `.agents/skills/dnd-randomizer/references/tables.json`
- Script: `.agents/skills/dnd-randomizer/scripts/randomize.js`
