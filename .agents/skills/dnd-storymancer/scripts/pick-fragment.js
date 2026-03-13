#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function printHelp() {
  console.log(`Usage: node scripts/pick-fragment.js [options]

Pick one or more random 3-8 word fragments from bundled book files.

Options:
  --books-dir PATH   Directory containing source books (default: ../assets/books)
  --book FILE        Restrict selection to a specific file in the books directory
  --count N          Number of fragments to return (default: 1)
  --min N            Minimum words per fragment (default: 3)
  --max N            Maximum words per fragment (default: 8)
  --format FORMAT    json or text (default: json)
  --help             Show this help message

Examples:
  node scripts/pick-fragment.js
  node scripts/pick-fragment.js --count 3 --format text
  node scripts/pick-fragment.js --book book1.md --format json`);
}

function parseArgs(argv) {
  const options = {
    booksDir: path.resolve(__dirname, '..', 'assets', 'books'),
    book: null,
    count: 1,
    min: 3,
    max: 8,
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
    if (arg === '--books-dir') options.booksDir = path.resolve(value);
    else if (arg === '--book') options.book = value;
    else if (arg === '--count') options.count = Number.parseInt(value, 10);
    else if (arg === '--min') options.min = Number.parseInt(value, 10);
    else if (arg === '--max') options.max = Number.parseInt(value, 10);
    else if (arg === '--format') options.format = value;
    else throw new Error(`Unknown option: ${arg}`);
  }

  if (!Number.isInteger(options.count) || options.count < 1) {
    throw new Error('--count must be a positive integer');
  }
  if (!Number.isInteger(options.min) || options.min < 1) {
    throw new Error('--min must be a positive integer');
  }
  if (!Number.isInteger(options.max) || options.max < options.min) {
    throw new Error('--max must be an integer greater than or equal to --min');
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

function normalizeText(content) {
  return content
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[`*_>\[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function loadBooks(booksDir, selectedBook) {
  if (!fs.existsSync(booksDir)) {
    throw new Error(`Books directory not found: ${booksDir}`);
  }
  let files = fs.readdirSync(booksDir)
    .filter((name) => name.endsWith('.md'))
    .sort();
  if (selectedBook) {
    files = files.filter((name) => name === selectedBook);
    if (files.length === 0) {
      throw new Error(`Book not found in ${booksDir}: ${selectedBook}`);
    }
  }
  if (files.length === 0) {
    throw new Error(`No .md books found in ${booksDir}`);
  }
  return files.map((name) => {
    const fullPath = path.join(booksDir, name);
    const text = normalizeText(fs.readFileSync(fullPath, 'utf8'));
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      throw new Error(`Book is empty after normalization: ${name}`);
    }
    return { name, fullPath, words };
  });
}

function pickFragment(book, rng, minWords, maxWords) {
  const maxAllowed = Math.min(maxWords, book.words.length);
  const wordCount = randomInt(rng, minWords, maxAllowed);
  const maxStart = book.words.length - wordCount;
  const startWord = randomInt(rng, 0, maxStart);
  const fragment = book.words.slice(startWord, startWord + wordCount).join(' ');
  return {
    book: book.name,
    wordCount,
    startWord,
    fragment,
  };
}

function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    if (options.help) {
      printHelp();
      return;
    }
    const rng = createRng();
    const books = loadBooks(options.booksDir, options.book);
    const picks = [];
    for (let i = 0; i < options.count; i += 1) {
      const book = books[randomInt(rng, 0, books.length - 1)];
      picks.push(pickFragment(book, rng, options.min, options.max));
    }
    if (options.format === 'text') {
      for (const pick of picks) {
        console.log(`[${pick.book}] ${pick.fragment}`);
      }
      return;
    }
    const payload = {
      booksDir: options.booksDir,
      count: picks.length,
      fragments: picks,
    };
    console.log(JSON.stringify(payload, null, 2));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(2);
  }
}

main();
