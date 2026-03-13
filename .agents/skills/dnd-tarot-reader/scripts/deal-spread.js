#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function printHelp() {
  console.log(`Usage: node scripts/deal-spread.js [options]

Deal a random D&D tarot spread from the bundled deck.

Options:
  --spread N         Spread size: 3 or 5 (default: 3)
  --deck PATH        Path to tarot deck markdown file (default: ../assets/tarot-deck.md)
  --format FORMAT    json or text (default: json)
  --help             Show this help message

Examples:
  node scripts/deal-spread.js
  node scripts/deal-spread.js --spread 5 --format text`);
}

function parseArgs(argv) {
  const options = {
    spread: 3,
    deck: path.resolve(__dirname, '..', 'assets', 'tarot-deck.md'),
    format: 'json',
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }
    if (!arg.startsWith('--')) {
      throw new Error(`Unexpected argument: ${arg}`);
    }
    const value = argv[i + 1];
    if (value == null || value.startsWith('--')) {
      throw new Error(`Missing value for ${arg}`);
    }
    i += 1;
    if (arg === '--spread') options.spread = Number.parseInt(value, 10);
    else if (arg === '--deck') options.deck = path.resolve(value);
    else if (arg === '--format') options.format = value;
    else throw new Error(`Unknown option: ${arg}`);
  }

  if (![3, 5].includes(options.spread)) {
    throw new Error('--spread must be 3 or 5');
  }
  if (!['json', 'text'].includes(options.format)) {
    throw new Error('--format must be one of: json, text');
  }

  return options;
}

function createRng() {
  return Math.random;
}

function randomInt(rng, min, maxInclusive) {
  return Math.floor(rng() * (maxInclusive - min + 1)) + min;
}

function parseDeck(deckPath) {
  if (!fs.existsSync(deckPath)) {
    throw new Error(`Deck file not found: ${deckPath}`);
  }
  const lines = fs.readFileSync(deckPath, 'utf8').split(/\r?\n/);
  const cards = [];
  const separatorPattern = /^:?-{3,}:?$/;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|')) continue;
    const cells = trimmed.split('|').slice(1, -1).map((cell) => cell.trim());
    if (cells.length !== 4) continue;
    if (cells.every((cell) => separatorPattern.test(cell))) continue;
    if (cells[0].toLowerCase() === 'card name') continue;
    const cardName = cells[0].replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
    cards.push({
      name: cardName,
      classic: cells[1],
      meaning: cells[2],
      prompt: cells[3],
    });
  }
  if (cards.length < 5) {
    throw new Error(`Parsed only ${cards.length} cards from ${deckPath}. Expected a full deck table.`);
  }
  return cards;
}

const SPREADS = {
  3: ['Past Shadow', 'Present Pressure', 'Future Unfolding'],
  5: ['Signifier', 'Tension', 'Hidden Force', 'Crossroads', 'Outcome'],
};

function deal(cards, size, rng) {
  const pool = cards.slice();
  const labels = SPREADS[size];
  return labels.map((position) => {
    const index = randomInt(rng, 0, pool.length - 1);
    const [card] = pool.splice(index, 1);
    return { position, ...card };
  });
}

function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    if (options.help) {
      printHelp();
      return;
    }
    const rng = createRng();
    const cards = parseDeck(options.deck);
    const spread = deal(cards, options.spread, rng);
    if (options.format === 'text') {
      for (const card of spread) {
        console.log(`${card.position}: ${card.name}`);
        console.log(`  Classic Tarot: ${card.classic}`);
        console.log(`  Meaning: ${card.meaning}`);
        console.log(`  Adventure Seed: ${card.prompt}`);
      }
      return;
    }
    console.log(JSON.stringify({ spread: options.spread, cards: spread }, null, 2));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(2);
  }
}

main();
