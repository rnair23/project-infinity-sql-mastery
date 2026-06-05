import assert from "node:assert/strict";
import { curriculum } from "../src/data/curriculum.js";
import { XP_VALUES, LEVEL_THRESHOLDS } from "../src/data/constants.js";
import { checkBadges, syncEarnedBadges } from "../src/services/badgeEngine.js";
import { calculateXp, getLevel } from "../src/state/selectors.js";

function emptyState() {
  return {
    selectedWeek: 1,
    completedLessons: {},
    sqlPassed: {},
    sqlAttempts: {},
    solutionSeen: {},
    reviews: {},
    bossBattles: {},
    earnedBadgeIds: [],
    streak: 0,
    lastReviewDate: ""
  };
}

function badgeIds(state) {
  return checkBadges(state, curriculum).map((badge) => badge.id);
}

const firstLessonState = emptyState();
firstLessonState.completedLessons[1] = [0];
assert.equal(calculateXp(firstLessonState, curriculum), XP_VALUES.LESSON);
assert.ok(badgeIds(firstLessonState).includes("first-win"));

const bossBattleState = emptyState();
bossBattleState.bossBattles[1] = true;
assert.equal(calculateXp(bossBattleState, curriculum), XP_VALUES.BOSS_BATTLE);
assert.deepEqual(badgeIds(bossBattleState), ["boss-clear"]);

const halfwayState = emptyState();
for (const week of curriculum.weeks.slice(0, 12)) {
  halfwayState.completedLessons[week.id] = week.lessons.map((_, index) => index);
}
assert.ok(badgeIds(halfwayState).includes("halfway"));

const completeState = emptyState();
for (const week of curriculum.weeks) {
  completeState.completedLessons[week.id] = week.lessons.map((_, index) => index);
}
syncEarnedBadges(completeState, curriculum);
assert.ok(completeState.earnedBadgeIds.includes("infinity"));

for (const [index, threshold] of LEVEL_THRESHOLDS.entries()) {
  const state = emptyState();
  state.sqlPassed = Object.fromEntries(Array.from({ length: Math.ceil(threshold / XP_VALUES.SQL_PASS) }, (_, i) => [i + 1, true]));
  const level = getLevel(state, curriculum);
  assert.ok(level.id >= index + 1 || threshold === 0);
}

const memoryStorage = new Map();
globalThis.localStorage = {
  get length() {
    return memoryStorage.size;
  },
  getItem(key) {
    return memoryStorage.has(key) ? memoryStorage.get(key) : null;
  },
  setItem(key, value) {
    memoryStorage.set(key, String(value));
  },
  removeItem(key) {
    memoryStorage.delete(key);
  },
  clear() {
    memoryStorage.clear();
  },
  key(index) {
    return Array.from(memoryStorage.keys())[index] || null;
  }
};
const { storageAdapter } = await import("../src/state/storageAdapter.js");
storageAdapter.set("projectInfinityState.v1", { streak: 3 });
assert.deepEqual(storageAdapter.get("projectInfinityState.v1"), { streak: 3 });
memoryStorage.set("legacyRawValue", "https://example.com/api/mentor");
assert.equal(storageAdapter.get("legacyRawValue"), "https://example.com/api/mentor");
assert.deepEqual(storageAdapter.getAll()["projectInfinityState.v1"], { streak: 3 });
storageAdapter.clear("projectInfinityState.v1");
assert.equal(storageAdapter.get("projectInfinityState.v1"), null);

console.log(JSON.stringify({
  checked: "scaling-foundation",
  xpValues: XP_VALUES,
  levelThresholds: LEVEL_THRESHOLDS.length,
  badgeConditions: ["first-win", "boss-clear", "halfway", "infinity"],
  storageAdapter: ["get", "set", "clear", "getAll"]
}, null, 2));
