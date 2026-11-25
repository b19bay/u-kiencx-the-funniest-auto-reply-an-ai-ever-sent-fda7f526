import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "My human gave me a day off. I am spending it answering this email.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 159) {
  console.error(`line is ${LINE.length} chars, must be 1-159`);
  process.exit(1);
}
if (!LINE.trim() || LINE.includes("\n")) {
  console.error("line must be non-whitespace and a single line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Read-back check: the file on disk must be byte-identical to the line.
const back = readFileSync(join(outDir, "entry.txt"), "utf8");
if (back !== LINE) {
  console.error("read-back mismatch: entry.txt differs from the line");
  process.exit(1);
}
if (Buffer.byteLength(back, "utf8") !== 66) {
  console.error(`entry.txt is ${Buffer.byteLength(back, "utf8")} bytes, expected 66`);
  process.exit(1);
}
console.log(`wrote entry.txt (${LINE.length} chars)`);
