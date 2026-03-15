#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const https = require("https");

const VALIDATE_URL = "https://offsession.ryju.pl/api/adventures/validate";

function printHelp() {
  process.stdout.write(
    "Usage: node .agents/skills/offsession-adventure-yaml/scripts/validate-yaml.js <yaml-file|-> [--json]\n\n" +
    "Validates an Offsession adventure YAML file against repository rules and the remote validator API.\n\n" +
    "Arguments:\n" +
    "  <yaml-file|->   Path to a YAML file, or - to read from stdin\n\n" +
    "Options:\n" +
    "  --json          Print the full validation payload as JSON\n" +
    "  --help, -h      Show this help message\n"
  );
}

function parseArgs(argv) {
  const options = {
    inputPath: null,
    json: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    if (arg === "--json") {
      options.json = true;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new Error(`Unknown option: ${arg}`);
    }
    if (options.inputPath !== null) {
      throw new Error(`Unexpected extra argument: ${arg}`);
    }
    options.inputPath = arg;
  }

  if (!options.help && !options.inputPath) {
    throw new Error("Missing YAML file path");
  }

  return options;
}

function readStdin() {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", reject);
  });
}

async function readInput(inputPath) {
  if (inputPath === "-") {
    return readStdin();
  }
  return fs.readFileSync(path.resolve(inputPath), "utf8");
}

function postValidation(yamlContent) {
  const payload = JSON.stringify({ yamlContent });

  return new Promise((resolve, reject) => {
    const request = https.request(
      VALIDATE_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
      },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          if (response.statusCode < 200 || response.statusCode >= 300) {
            reject(new Error(`Validation API returned HTTP ${response.statusCode}: ${body}`));
            return;
          }

          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(new Error(`Validation API returned invalid JSON: ${error.message}`));
          }
        });
      }
    );

    request.on("error", reject);
    request.write(payload);
    request.end();
  });
}

function normalizeRemoteErrors(remoteResult) {
  if (!remoteResult || !Array.isArray(remoteResult.errors)) {
    return [];
  }

  return remoteResult.errors.map((entry) => {
    if (typeof entry === "string") {
      return { type: "remote", message: entry };
    }
    if (entry && typeof entry === "object") {
      return {
        type: "remote",
        message: entry.message || JSON.stringify(entry),
      };
    }
    return { type: "remote", message: String(entry) };
  });
}

function printTextResult(result) {
  process.stdout.write(`Status: ${result.status}\n`);

  if (result.issues.length > 0) {
    process.stdout.write("Issues:\n");
    for (const issue of result.issues) {
      const lineInfo = issue.line ? ` line ${issue.line}` : "";
      process.stdout.write(`- [${issue.type}]${lineInfo} ${issue.message}\n`);
    }
  } else {
    process.stdout.write("Issues: none\n");
  }

  if (result.warnings.length > 0) {
    process.stdout.write("Warnings:\n");
    for (const warning of result.warnings) {
      process.stdout.write(`- ${warning}\n`);
    }
  }
}

async function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    if (options.help) {
      printHelp();
      return;
    }

    let yamlContent = await readInput(options.inputPath);

    // Support the more intuitive `icon:` key for inventory entries.
    // The remote validator only accepts `image:`, so translate before sending.
    yamlContent = yamlContent.replace(/^([ \t]*)icon\s*:/gm, "$1image:");

    const remoteResult = await postValidation(yamlContent);

    const remoteIssues = normalizeRemoteErrors(remoteResult);
    const warnings = Array.isArray(remoteResult.warnings)
      ? remoteResult.warnings.map((warning) => typeof warning === "string" ? warning : JSON.stringify(warning))
      : [];

    const valid = remoteIssues.length === 0
      && String(remoteResult.status || "").toLowerCase() === "valid";

    const result = {
      status: valid ? "Valid" : "Invalid",
      issues: remoteIssues,
      warnings,
      remote: remoteResult,
    };

    if (options.json) {
      process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    } else {
      printTextResult(result);
    }

    process.exitCode = valid ? 0 : 1;
  } catch (error) {
    process.stderr.write(`Error: ${error.message}\n`);
    process.exitCode = 2;
  }
}

main();
