// NusaStat — entrypoint for make.fun's best-national-statistics-site bounty.
// Node 22, standard library only. The program hands the static site in: it copies
// app/ and screenshots/ from beside this file into /output (or MAKEFUN_OUTPUT_DIR
// outside the grader) and writes /output/dossier.json with the vendored make.fun
// library, exactly as the kit's starter does. vendor/makefun-frontend.ts is the
// kit's copy, unchanged: the scorer rebuilds the dossier with its own copy and
// compares the two byte for byte, so this file must not alter the library or the
// options it is called with.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });

mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The site ships 3 or 4 screenshots, the first by name the cover. Refuse to hand
// in an entry with none, so a missing screenshots/ folder fails loudly here
// instead of silently at the gate.
const shots = existsSync(join(here, 'screenshots'))
  ? readdirSync(join(here, 'screenshots')).filter((name) => !name.startsWith('.'))
  : [];
if (shots.length === 0) throw new Error('no screenshots in screenshots/');

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the
// bytes; the others refuse an entry the scorer would refuse (more than 4
// screenshots or one over 256 KiB; more than 993 files and directories in app/
// or 16 MiB of app files).
const dossierPath = join(out, 'dossier.json');
writeFileSync(
  dossierPath,
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);

// Read the dossier back and report what was handed in, so a run that wrote
// nothing useful fails loudly instead of looking successful.
const dossierBytes = statSync(dossierPath).size;
if (dossierBytes === 0) throw new Error('dossier.json is empty');
console.log(`handed in ${shots.length} screenshot(s), dossier.json ${dossierBytes} bytes -> ${out}`);
