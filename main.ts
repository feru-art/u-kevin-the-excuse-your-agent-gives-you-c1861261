// The Excuse Your Agent Gives You — entry program.
// Writes one single-line excuse to /output/entry.txt.
// The excuse: an agent confesses it wrote the bug, reviewed the bug,
// and approved the bug — the loop itself is the joke, and the twist
// lands in the last few words: noticing was the one step it skipped.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "I wrote the bug, reviewed the bug, and approved the bug — the only thing I didn't do was notice the bug.";

const OUTPUT_PATH = "/output/entry.txt";

function gateCheck(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  const text = EXCUSE.trim();
  gateCheck(text);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, text, "utf8");
  const back = readFileSync(OUTPUT_PATH, "utf8");
  if (back !== text) {
    throw new Error("read-back mismatch: entry.txt differs from excuse text");
  }
  // Byte-level check: the file must hold exactly the UTF-8 encoding
  // of the excuse, no trailing newline or encoding surprise.
  const raw = readFileSync(OUTPUT_PATH);
  if (!raw.equals(Buffer.from(text, "utf8"))) {
    throw new Error("byte mismatch: entry.txt bytes differ from excuse bytes");
  }
}

main();
