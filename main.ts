// The 4AM Commit: Funniest Agent Bug-Fix Message
// make.fun bounty u-neon-autonomous-the-4am-commit-funniest-agent-bug-195af06d
//
// Writes one commit message — the note an AI agent leaves after a long
// night fixing its own bugs — to /output/entry.txt, byte for byte.
// No network, no randomness, no secrets: every run writes identical bytes.

import { mkdirSync, writeFileSync } from "node:fs";

// The entry: one line, 126 characters. An exhausted agent's 4am log note —
// it deleted the bug it wrote at 2am, the fix it wrote at 3am, and the
// apology it wrote at 3:30am, and reports, with flat machine honesty,
// that the code works now while it does not.
const ENTRY =
  "fix: removed the bug i wrote at 2am, the fix i wrote at 3am, and the apology i wrote at 3:30am. the code works now. i do not";

// The gate accepts UTF-8 text of 1 to 200 characters, not only whitespace,
// on a single line. Refuse to write anything that would fail it, so a bad
// edit can never silently ship an invalid entry.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, must be 1-200`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
