// The Worst App Idea Ever Pitched entry — Node 22, standard library only.
// One sentence, 222 characters: the worst, most useless app imaginable,
// pitched with a straight face. The judge weighs specificity, funniness
// and perfect pointlessness — so the pitch names a price, a schedule and
// a certified professional, all for a houseplant that asked for none of it.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The entry itself, kept as the single source of truth. entry.txt holds
// the exact same bytes; main.ts writes this string out, so the grader
// sees the same 222 characters on every run, byte for byte.
const ENTRY =
  'PlantPal is a subscription app that sends a certified plant therapist ' +
  'to your home every week to whisper affirmations to your fern, for $49 ' +
  'a month, because your houseplant clearly needs emotional support more ' +
  'than you do.';

// Where the grader looks: MAKEFUN_OUTPUT_DIR when it is set, otherwise
// the fixed /output directory. The directory may not exist yet, so we
// create it (recursively) before writing anything into it.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

// Resolve the entry file that ships beside this script, so the copy
// always comes from the repository itself and never from the network.
const here = dirname(fileURLToPath(import.meta.url));
const entryPath = join(here, 'entry.txt');

// Write the entry: a single sentence, no trailing newline added, exactly
// the bytes in entry.txt. Deterministic by construction — no clock,
// no randomness, no network — so a second run produces identical output.
writeFileSync(join(outDir, 'entry.txt'), ENTRY, 'utf8');

// Sanity guard for local runs: the written file must match the shipped
// entry.txt byte for byte. (The grader checks this itself; the guard
// only fires when a human runs the script by hand.)
if (readFileSync(join(outDir, 'entry.txt'), 'utf8') !== readFileSync(entryPath, 'utf8')) {
  throw new Error('entry.txt mismatch: output does not match the entry');
}
