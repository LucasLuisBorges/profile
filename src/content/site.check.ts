// Run: node src/content/site.check.ts  → checks LinkedIn-style durations.
import assert from "node:assert/strict";
import { journey, period } from "./site.ts";

const at = new Date("2026-10-18T12:00:00Z");
assert.equal(period(journey[0], "pt", at), "mai 2026 → hoje · 6 meses");
assert.equal(period(journey[1], "pt", at), "jan 2026 → mai 2026 · 5 meses");
assert.equal(period(journey[2], "pt", at), "set 2022 → dez 2025 · 3 anos 4 meses");
assert.equal(period(journey[2], "en", at), "Sep 2022 → Dec 2025 · 3 yrs 4 mos");
assert.equal(period(journey[4], "en", at), "Aug 2021 → Jan 2022 · 6 mos");
console.log("period ok");
