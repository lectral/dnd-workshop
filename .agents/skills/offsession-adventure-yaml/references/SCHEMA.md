# Offsession Adventure Schema Summary

Use this reference to keep adventures aligned with the local Offsession format. The root object accepts four top-level keys: `meta`, `counters`, `inventory`, and `scenes`.

## `meta`

Required. Defines adventure metadata.

```yaml
meta:
  title: "Your Adventure Title"
  description: "A brief description"
  theme: "neon-mana-circuit"
  one_shot: true
```

- `title` is required.
- `description` is optional.
- `theme` must be one of: `neon-mana-circuit`, `sol-arcana-ledger`, `prism-spark-sanctuary`, `mana-punk`, `gilded-relic`.
- `one_shot` defaults to `true`. Set it to `false` to allow multiple sessions.

## `counters`

Optional hidden state for branching logic.

```yaml
counters:
  guard_alerted:
    type: "boolean"
    default: false
  treasure_count:
    type: "number"
    default: 0
```

Counter types must be `number` or `boolean`.

## `inventory`

Optional player items, currencies, rerolls, and bonuses.

```yaml
inventory:
  gold_coin:
    name: "Gold Coins"
    description: "Currency for trading"
    type: "currency"
    default: 25

  torch:
    name: "Torch"
    description: "A basic light source"
    type: "item"
    image: "https://example.com/torch.png"
    default: 1

  lucky_charm:
    name: "Lucky Charm"
    description: "Reroll a failed check"
    type: "reroll"
    usage_count: 2
    default: 1

  fate_bead:
    name: "Fate Bead"
    description: "Add bonus to a roll after seeing the outcome"
    type: "bonus"
    value: "4"
    bonus_timing: "after"
    default: 1
```

Valid types: `currency`, `item`, `reroll`, `bonus`

Supported inventory fields:

- `name` and `description` are required.
- `icon` is optional. Use an RPG Awesome icon id (e.g., `torch` or `ra-torch`). See `references/ICONS.md` for available values.
- `image` is optional. The validator accepts `image`, and the local validation helper allows using `icon` as an alias.
- `default` sets the starting amount.
- `usage_count` gives a non-currency item multiple charges before it disappears.
- `value` is required for `bonus` items.
- `bonus_timing` is only used by `bonus` items and must be `after` in this repository.

## `scenes`

Required. The first playable scene must be `id: start`.

```yaml
scenes:
  - id: start
    title: "The Beginning"
    description: |
      You stand at the entrance...

      Multiple paragraphs are supported.
    image: "https://example.com/scene.png"
    exits:
      - text: "Go north"
        target: forest

      - text: "Pick the lock"
        target: treasure_room
        gate:
          text: "Roll Dexterity to pick the lock."
          short_text: "Dexterity"
          show_short: true
          dc: 12
          failure_target: jail
        one_time: true

      - text: "Open door"
        target: secret_room
        requires_item:
          id: ancient_key
          amount: 1
```

Scene fields:

- `id`, `title`, `description`, and `exits` are required.
- `image`, `add_items`, and `remove_items` are optional.
- Ending scenes should use `exits: []`.

## `gates`

Use gates for dice checks.

- `text`: message shown in the dice modal.
- `short_text`: compact label on the exit button. Use one label from `CHECKS.md`.
- `show_short`: show the compact label when `true`.
- `dc`: difficulty class to beat.
- `failure_target`: scene to visit after a failed roll.

Players roll against the DC. Success goes to `target`; failure goes to `failure_target`.

Natural 20 on the kept d20 is always a success. Natural 1 on the kept d20 is always a failure. On a critical failure, only reroll items can still change the outcome.

## `exits`

```yaml
# One-time exit
- text: "Search the chest"
  target: found_treasure
  one_time: true

# Item-required exit
- text: "Use key on door"
  target: secret_room
  requires_item:
    id: ancient_key
    amount: 1

# Colored exit
- text: "FLEE!"
  target: escape
  color: red
```

Valid colors: `red`, `green`, `blue`, `purple`, `gold`, `yellow`, `cyan`, `orange`, `pink`, `white`

## `exit effects`

Use `effects` on an exit when choosing that path should update state immediately.

```yaml
exits:
  - text: "Pull the hidden lever"
    target: vault
    effects:
      set_counter:
        found_secret: 1

  - text: "Take the key and run"
    target: hallway
    effects:
      add_item: ancient_key

  - text: "Burn the forged pass"
    target: checkpoint
    effects:
      remove_item: forged_pass

  - text: "Pay the ferryman"
    target: river
    effects:
      add_currency:
        gold_coin: -10
```

- `set_counter` sets one or more counters. Values must match the counter type.
- `add_item` adds a single inventory item.
- `remove_item` removes a single inventory item.
- `add_currency` adjusts currency totals. Use a negative number to spend currency.

## `scene item changes`

Use `add_items` and `remove_items` when the state should change on entering a scene instead of choosing an exit.

```yaml
scenes:
  - id: treasure_room
    title: "Treasure Chamber"
    description: "You find a treasure chest!"
    add_items:
      - id: gold_coin
        amount: 50
        text: "You found 50 gold coins!"
    remove_items:
      - id: torch
        amount: 1
        text: "Your torch burns out."
    exits:
      - text: "Leave"
        target: hallway
```

`amount` must be a positive integer in both lists.

## `conditional exits`

Use `visible_if` to hide an exit until a condition is met.

```yaml
exits:
  - text: "Open secret door"
    target: secret_passage
    visible_if:
      counter: found_key
      equals: 1

  - text: "Use membership card"
    target: vip_area
    visible_if:
      item: vip_pass
      has_item: true

  - text: "Bribe the guard"
    target: inside
    visible_if:
      currency: gold_coin
      greater_or_equal: 50
```

Supported operators: `equals`, `not_equals`, `greater_than`, `less_than`, `greater_or_equal`, `less_or_equal`, `has_item`

Rules for `visible_if`:

- Define exactly one subject: `counter`, `item`, or `currency`.
- Use one comparison operator per condition block for predictable behavior.
- `item` and `currency` conditions check the current inventory amount.

## Best practices

- Always include a scene with `id: start`.
- End scenes should use `exits: []`.
- Use markdown in scene descriptions.
- Validate every branch before sharing the adventure.
- Give each gate a `failure_target` to avoid soft locks.
- Prefer `scene.add_items` for rewards with player-facing text, and `exit.effects` for silent state changes.
