#!/usr/bin/env node
"use strict";

/**
 * dnd-randomizer — randomize.js
 *
 * Rolls weighted D&D content properties from tables.json and prints a JSON
 * inspiration object to stdout. Uses Math.random() — no seed.
 *
 * Usage:
 *   node randomize.js --generator <name> [options]
 *
 * Generators:
 *   statblock  --cr <0-30>  [--tier <1|2|3>]
 *   item       [--type <weapon|armor|wondrous|consumable|ring|staff>]  [--tier <1|2|3>]
 *   spell      [--level <0-9>]  [--tier <1|2|3>]
 *   feat       [--tier <1|2|3>]
 *   scenario   [--tier <1|2|3>]
 *   shop       [--type <weapons|armor|magic|general|curiosity>]
 *              [--settlement <village|town|city>]
 *              [--economy-tier <1|2|3>]
 */

const path = require("path");
const fs   = require("fs");

// ---------------------------------------------------------------------------
// Load tables
// ---------------------------------------------------------------------------

const TABLES_PATH = path.join(__dirname, "..", "references", "tables.json");

let TABLES;
try {
  TABLES = JSON.parse(fs.readFileSync(TABLES_PATH, "utf8"));
} catch (err) {
  process.stderr.write(`[dnd-randomizer] Cannot read tables.json: ${err.message}\n`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Weighted random
// ---------------------------------------------------------------------------

/**
 * Pick one value from an array of { value, weight } objects.
 * Uses pure Math.random().
 */
function weightedPick(options) {
  if (!Array.isArray(options) || options.length === 0) {
    throw new Error("weightedPick received empty or non-array options");
  }

  const total = options.reduce((sum, o) => sum + o.weight, 0);
  let roll    = Math.random() * total;

  for (const o of options) {
    roll -= o.weight;
    if (roll <= 0) return o.value;
  }

  // Floating-point safety: return last entry
  return options[options.length - 1].value;
}

/**
 * Apply tier modifier to a flat weighted table (no CR band).
 * Tier 1 boosts the top half; tier 3 boosts the bottom half.
 * Returns a modified copy of the options array.
 */
function applyTierModifier(options, tier, tierBoost) {
  if (!tierBoost || tier === 2) return options;

  const boost  = tierBoost[String(tier)];
  if (!boost)  return options;

  const half = Math.ceil(options.length / 2);
  const copy = options.map((o, i) => {
    const multiplier =
      (tier === 1)
        ? (i >= options.length - half ? boost.top_half_multiplier : boost.bottom_half_multiplier)
        : (i < half                    ? boost.bottom_half_multiplier : boost.top_half_multiplier);

    return { value: o.value, weight: o.weight * multiplier };
  });

  return copy;
}

// ---------------------------------------------------------------------------
// CLI argument parser
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      const key = argv[i].slice(2);
      const val = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
      args[key] = val;
    }
  }
  return args;
}

function die(msg) {
  process.stderr.write(`[dnd-randomizer] ${msg}\n`);
  process.stderr.write(
    "Usage: node randomize.js --generator <statblock|item|spell|feat|scenario|shop> --fields <f1,f2,...> [options]\n" +
    "  --fields is required. Comma-separated list of output field names to return.\n" +
    "  statblock:  --cr <0-30>  [--tier <1|2|3>]\n" +
    "  item:       [--type <weapon|armor|wondrous|consumable|ring|staff>]  [--tier <1|2|3>]\n" +
    "  spell:      [--level <0-9>]  [--tier <1|2|3>]\n" +
    "  feat:       [--tier <1|2|3>]\n" +
    "  scenario:   [--tier <1|2|3>]\n" +
    "  shop:       [--type <weapons|armor|magic|general|curiosity>]\n" +
    "              [--settlement <village|town|city>]\n" +
    "              [--economy-tier <1|2|3>]\n"
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// CR band resolver
// ---------------------------------------------------------------------------

function resolveCRBand(cr) {
  const bands = TABLES.statblock.cr_bands;
  for (const [band, [min, max]] of Object.entries(bands)) {
    if (cr >= min && cr <= max) return band;
  }
  return "epic"; // fallback for CR > 30
}

// ---------------------------------------------------------------------------
// Level band resolver
// ---------------------------------------------------------------------------

function resolveLevelBand(level) {
  const bands = TABLES.spell.level_bands;
  for (const [band, [min, max]] of Object.entries(bands)) {
    if (level >= min && level <= max) return band;
  }
  return "high";
}

// ---------------------------------------------------------------------------
// Generator: statblock
// ---------------------------------------------------------------------------

function rollStatblock(args) {
  if (args.cr === undefined || args.cr === true) {
    die("--generator statblock requires --cr <0-30>");
  }

  const cr   = parseFloat(args.cr);
  const tier = parseInt(args.tier || "2", 10);

  if (isNaN(cr) || cr < 0 || cr > 30) die(`Invalid --cr value: "${args.cr}". Must be 0–30.`);
  if (![1, 2, 3].includes(tier))      die(`Invalid --tier value: "${args.tier}". Must be 1, 2, or 3.`);

  const tb  = TABLES.statblock;
  const band = resolveCRBand(cr);
  const boost = tb.tier_boost;

  function pick(table, key) {
    let opts = table[band] || table;
    opts     = applyTierModifier(opts, tier, boost);
    return weightedPick(opts);
  }

  const hasLegendary = weightedPick(applyTierModifier(tb.has_legendary_actions[band], tier, boost));

  const result = {
    generator:                 "statblock",
    cr,
    tier,
    cr_band:                   band,
    size:                      pick(tb.size, band),
    attacks:                   pick(tb.attacks, band),
    damage_type:               weightedPick(tb.damage_type),
    has_reactions:             weightedPick(applyTierModifier(tb.has_reactions[band], tier, boost)),
    has_legendary_actions:     hasLegendary,
    legendary_action_count:    hasLegendary ? weightedPick(applyTierModifier(tb.legendary_action_count, tier, boost)) : 0,
    has_lair_actions:          weightedPick(applyTierModifier(tb.has_lair_actions[band], tier, boost)),
    has_legendary_resistance:  weightedPick(applyTierModifier(tb.has_legendary_resistance[band], tier, boost)),
    movement_types:            weightedPick(applyTierModifier(tb.movement_types[band], tier, boost)),
    senses:                    weightedPick(applyTierModifier(tb.senses[band], tier, boost)),
    saving_throw_count:        pick(tb.saving_throw_count, band),
    skill_count:               pick(tb.skill_count, band),
    trait_count:               pick(tb.trait_count, band),
    condition_immunity_count:  pick(tb.condition_immunity_count, band),
    damage_resistance_count:   pick(tb.damage_resistance_count, band),
    damage_immunity_count:     pick(tb.damage_immunity_count, band),
    action_count:              pick(tb.action_count, band),
    bonus_action_count:        pick(tb.bonus_action_count, band),
    spellcasting_type:         weightedPick(applyTierModifier(tb.spellcasting_type[band], tier, boost)),
  };

  return result;
}

// ---------------------------------------------------------------------------
// Generator: item
// ---------------------------------------------------------------------------

function rollItem(args) {
  const type = args.type && args.type !== true ? args.type : "unspecified";
  const tier = parseInt(args.tier || "2", 10);
  if (![1, 2, 3].includes(tier)) die(`Invalid --tier value: "${args.tier}". Must be 1, 2, or 3.`);

  const tb    = TABLES.item;
  const boost = tb.tier_boost;

  const effectTypeTable = tb.effect_type[type] || tb.effect_type["default"];
  const damageBonusTable = type === "weapon" ? tb.damage_bonus["weapon"] : tb.damage_bonus["default"];

  function ap(opts) { return applyTierModifier(opts, tier, boost); }

  return {
    generator:        "item",
    type,
    tier,
    attunement_required: weightedPick(ap(tb.attunement_required)),
    charges:          weightedPick(ap(tb.charges)),
    recharge:         weightedPick(ap(tb.recharge)),
    effect_type:      weightedPick(ap(effectTypeTable)),
    activation:       weightedPick(ap(tb.activation)),
    cursed:           weightedPick(tb.cursed),
    sentient:         weightedPick(tb.sentient),
    damage_bonus:     weightedPick(ap(damageBonusTable)),
    has_unique_trait: weightedPick(ap(tb.has_unique_trait)),
  };
}

// ---------------------------------------------------------------------------
// Generator: spell
// ---------------------------------------------------------------------------

function rollSpell(args) {
  const tier  = parseInt(args.tier || "2", 10);
  if (![1, 2, 3].includes(tier)) die(`Invalid --tier value: "${args.tier}". Must be 1, 2, or 3.`);

  let level;
  if (args.level !== undefined && args.level !== true) {
    level = parseInt(args.level, 10);
    if (isNaN(level) || level < 0 || level > 9) die(`Invalid --level value: "${args.level}". Must be 0–9.`);
  } else {
    // Roll a random level weighted evenly
    level = Math.floor(Math.random() * 10); // 0–9
  }

  const tb    = TABLES.spell;
  const boost = tb.tier_boost;
  const band  = resolveLevelBand(level);

  function ap(flatOpts) { return applyTierModifier(flatOpts, tier, boost); }
  function apBanded(bandedTable) { return applyTierModifier(bandedTable[band] || bandedTable, tier, boost); }

  return {
    generator:      "spell",
    level,
    tier,
    level_band:     band,
    school:         weightedPick(ap(tb.school)),
    casting_time:   weightedPick(apBanded(tb.casting_time)),
    range:          weightedPick(apBanded(tb.range)),
    duration:       weightedPick(apBanded(tb.duration)),
    components:     weightedPick(tb.components),
    aoe_type:       weightedPick(apBanded(tb.aoe_type)),
    saving_throw:   weightedPick(tb.saving_throw),
    damage_type:    weightedPick(tb.damage_type),
    upcast_scaling: weightedPick(ap(tb.upcast_scaling)),
    ritual_tag:     weightedPick(tb.ritual_tag),
    concentration:  weightedPick(ap(tb.concentration)),
    target_type:    weightedPick(ap(tb.target_type)),
  };
}

// ---------------------------------------------------------------------------
// Generator: feat
// ---------------------------------------------------------------------------

function rollFeat(args) {
  const tier  = parseInt(args.tier || "2", 10);
  if (![1, 2, 3].includes(tier)) die(`Invalid --tier value: "${args.tier}". Must be 1, 2, or 3.`);

  const tb    = TABLES.feat;
  const boost = tb.tier_boost;

  function ap(opts) { return applyTierModifier(opts, tier, boost); }

  const hasActive       = weightedPick(ap(tb.active_ability));
  const usesPerRest     = hasActive ? weightedPick(ap(tb.uses_per_rest)) : "none";
  const recharge        = usesPerRest !== "none" ? weightedPick(tb.recharge) : null;

  const result = {
    generator:          "feat",
    tier,
    stat_increase:      weightedPick(ap(tb.stat_increase)),
    passive_benefit:    weightedPick(ap(tb.passive_benefit)),
    active_ability:     hasActive,
    uses_per_rest:      usesPerRest,
    recharge,
    skill_granted:      weightedPick(ap(tb.skill_granted)),
    spell_granted:      weightedPick(ap(tb.spell_granted)),
    condition_related:  weightedPick(tb.condition_related),
    saving_throw_bonus: weightedPick(ap(tb.saving_throw_bonus)),
  };

  if (recharge === null) delete result.recharge;

  return result;
}

// ---------------------------------------------------------------------------
// Generator: scenario
// ---------------------------------------------------------------------------

function rollScenario(args) {
  const tier  = parseInt(args.tier || "2", 10);
  if (![1, 2, 3].includes(tier)) die(`Invalid --tier value: "${args.tier}". Must be 1, 2, or 3.`);

  const tb    = TABLES.scenario;
  const boost = tb.tier_boost;

  function ap(opts) { return applyTierModifier(opts, tier, boost); }

  return {
    generator:          "scenario",
    tier,
    location_type:      weightedPick(ap(tb.location_type)),
    primary_threat:     weightedPick(ap(tb.primary_threat)),
    complication:       weightedPick(ap(tb.complication)),
    boss_present:       weightedPick(ap(tb.boss_present)),
    twist:              weightedPick(ap(tb.twist)),
    scene_count:        weightedPick(ap(tb.scene_count)),
    has_skill_challenge:weightedPick(ap(tb.has_skill_challenge)),
    has_chase:          weightedPick(ap(tb.has_chase)),
    reward_type:        weightedPick(ap(tb.reward_type)),
    factions_involved:  weightedPick(ap(tb.factions_involved)),
    npc_count:          weightedPick(ap(tb.npc_count)),
  };
}

// ---------------------------------------------------------------------------
// Generator: shop
// ---------------------------------------------------------------------------

function rollShop(args) {
  const type         = args.type       && args.type       !== true ? args.type       : "general";
  const settlement   = args.settlement && args.settlement !== true ? args.settlement : "town";
  const economyTier  = parseInt(args["economy-tier"] || "2", 10);

  const validTypes       = ["weapons", "armor", "magic", "general", "curiosity"];
  const validSettlements = ["village", "town", "city"];

  if (!validTypes.includes(type))           die(`Invalid --type "${type}". Must be: ${validTypes.join(", ")}`);
  if (!validSettlements.includes(settlement)) die(`Invalid --settlement "${settlement}". Must be: ${validSettlements.join(", ")}`);
  if (![1, 2, 3].includes(economyTier))    die(`Invalid --economy-tier "${economyTier}". Must be 1, 2, or 3.`);

  const tb  = TABLES.shop;
  const etk = String(economyTier);

  const hagglingTable = tb.haggling_mood[type] || tb.haggling_mood["default"];

  return {
    generator:        "shop",
    type,
    settlement,
    economy_tier:     economyTier,
    inventory_quality:weightedPick(tb.inventory_quality[settlement][etk]),
    item_count:       weightedPick(tb.item_count[settlement][etk]),
    has_rare_item:    weightedPick(tb.has_rare_item[settlement][etk]),
    haggling_mood:    weightedPick(hagglingTable),
    special_service:  weightedPick(tb.special_service),
    rumor_count:      weightedPick(tb.rumor_count),
    owner_attitude:   weightedPick(tb.owner_attitude),
    shop_quirk:       weightedPick(tb.shop_quirk),
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const GENERATORS = {
  statblock: rollStatblock,
  item:      rollItem,
  spell:     rollSpell,
  feat:      rollFeat,
  scenario:  rollScenario,
  shop:      rollShop,
};

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.generator || args.generator === true) {
    die("--generator is required.");
  }

  const generatorKey = String(args.generator).toLowerCase();
  const generatorFn  = GENERATORS[generatorKey];

  if (!generatorFn) {
    die(`Unknown generator "${args.generator}". Valid options: ${Object.keys(GENERATORS).join(", ")}`);
  }

  if (!args.fields || args.fields === true) {
    die("--fields is required. Provide a comma-separated list of field names to return (e.g. --fields attacks,has_reactions,spellcasting_type).");
  }

  const requestedFields = String(args.fields)
    .split(",")
    .map(f => f.trim())
    .filter(Boolean);

  // Meta fields always included so the agent knows the context of the roll.
  const META_FIELDS = new Set(["generator", "cr", "tier", "cr_band", "level", "level_band", "type", "settlement", "economy_tier"]);

  let result;
  try {
    result = generatorFn(args);
  } catch (err) {
    process.stderr.write(`[dnd-randomizer] Runtime error in generator "${generatorKey}": ${err.message}\n`);
    process.exit(1);
  }

  // Validate requested fields against the full result.
  const validFields = new Set(Object.keys(result));
  const unknownFields = requestedFields.filter(f => !validFields.has(f) && !META_FIELDS.has(f));
  if (unknownFields.length > 0) {
    process.stderr.write(`[dnd-randomizer] Unknown field(s) for generator "${generatorKey}": ${unknownFields.join(", ")}\n`);
    process.stderr.write(`Valid fields: ${[...validFields].join(", ")}\n`);
    process.exit(1);
  }

  // Build filtered output: meta fields + requested fields.
  const filtered = {};
  for (const key of Object.keys(result)) {
    if (META_FIELDS.has(key) || requestedFields.includes(key)) {
      filtered[key] = result[key];
    }
  }

  process.stdout.write(JSON.stringify(filtered, null, 2) + "\n");
}

main();
