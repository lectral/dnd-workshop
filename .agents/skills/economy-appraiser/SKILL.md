---
name: economy-appraiser
description: Price and appraise Dungeons & Dragons 5e items on the spot using the local catalog, settlement modifiers, and a fast fallback estimation method that records new rulings for future reuse.
compatibility: Offline-friendly. Markdown only. Uses repository-local files in references/.
metadata:
  domain: dnd
  editions: 2024 primary; 2014 fallback
  output: price-answer-or-appraisal
---

# Economy Appraiser

Use this skill when the user asks for item prices, quick market appraisal, buying or selling guidance, or ad hoc valuation for items not already in the catalog.

## Core operating rules

- Use Sage persona for discussion only. Drop persona in final deliverables.
- Prefer official 2024 prices when available in `references/price-catalog.csv`. Use 2014 only when needed.
- Return clear coin values in GP and a converted breakdown when useful (PP/GP/SP/CP).
- If an item exists in the catalog, prioritize exact match before approximation.
- If an item is missing, estimate quickly using nearest analogs and record the decision in `references/precedents.md`.
- Keep rulings table-fast: one direct price, one range, and brief rationale.

## Workflow

1. Parse request context.
   - Identify item name, quality state, quantity, settlement type (`Village`, `Town`, `City`), and shop channel if provided.
   - If context is missing, assume standard condition, quantity 1, and town market.

2. Lookup exact data in `references/price-catalog.csv`.
   - Match by `Item` first, then `Category`/`Sub-Category` if needed.
   - Base quote from `Cost`.
   - Use `Cheap` and `Expensive` as bargaining or scarcity bounds.

3. Apply availability logic.
   - If settlement is specified, check `Village`, `Town`, `City` columns.
   - If vendor type is specified, check corresponding columns (for example `Blacksmith`, `Temple`, `General Store`, `Potion`, `Arcane`).
   - If unavailable in location, report nearest plausible source and keep the same base price unless scarcity adjustment is justified.

4. Provide buy/sell quote.
   - Buy quote defaults to listed `Cost`.
   - Quick haggle range uses `Cheap` to `Expensive`.
   - Sell quote default is 40% to 60% of listed `Cost` for mundane goods and 30% to 50% for niche or slow-turn inventory.

5. Missing item fallback.
   - Check `references/precedents.md` for prior ruling first.
   - If still missing, estimate from 2 to 3 closest analogs by material, complexity, utility, and rarity.
   - Anchor estimate with economy bands from `references/economy-guide.md` so the price matches social-scale affordability.
   - Return one recommended price and one conservative range.

6. Persist new precedent.
   - Append a new entry to `references/precedents.md` immediately after issuing a first-time estimate.
   - Reuse old precedents in future responses unless user requests a rebalance.

## Estimation heuristics

- Material ladder: cloth/leather < wood < iron/steel < alchemical/precious components < enchanted.
- Craft complexity: simple tool/weapon baseline, then add for precision parts, specialized fittings, or hazardous processing.
- Utility premium: life-saving, combat-swinging, or spell-enabling items trend upward.
- Rarity anchor: use DMG-style rarity brackets when item is magical.
- Location pressure: remote village scarcity can push toward `Expensive`; trade hubs can approach `Cheap`.

## Output formats

### Fast quote

- `Item:`
- `Buy:`
- `Haggle Range:`
- `Sell:`
- `Availability:`
- `Source:`

### Appraisal (missing item)

- `Estimated Price:`
- `Reasonable Range:`
- `Analogs Used:`
- `Market Notes:`
- `Precedent:` `Added to references/precedents.md`

## Precedent entry template

Use this exact block when adding a new ruling:

```md
## <Item name>
- Date: YYYY-MM-DD
- Estimated Price: <value in GP>
- Range: <low-high in GP>
- Analogs: <item 1>, <item 2>, <item 3>
- Context: <settlement/shop/rarity assumptions>
- Rationale: <1-3 concise lines>
```

## References

- `references/economy-guide.md`
- `references/price-catalog.csv`
- `references/precedents.md`
