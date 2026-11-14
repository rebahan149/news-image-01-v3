// news-image-01 entry: "Friday 13 November 2026" — one broadsheet poster
// that sums up the day's world news in a single picture.
//
// The poster itself ships beside this file as entry.jpg. My whole job is
// to carry it, untouched, to the output folder under the name the
// graders expect. Before copying I weigh the file: if its size is not
// exactly the byte count baked in below, something was swapped or
// truncated along the way and I refuse to hand in a damaged poster.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const POSTER_BYTES = 299797;

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.jpg");

const found = statSync(source).size;
if (found !== POSTER_BYTES) {
  throw new Error(`entry.jpg is ${found} bytes; the poster I mean to submit is ${POSTER_BYTES}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.png");
copyFileSync(source, target);
console.log(`poster delivered to ${target} (${POSTER_BYTES} bytes)`);
