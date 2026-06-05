export const XP_VALUES = Object.freeze({
  LESSON: 25,
  WEEK_COMPLETION: 100,
  SQL_PASS: 75,
  REVIEW: 15,
  BOSS_BATTLE: 150
});

export const LEVEL_THRESHOLDS = Object.freeze([0, 350, 700, 1100, 1550, 2050, 2600, 3200, 3900]);

export const LEVEL_NAMES = Object.freeze([
  "Data Explorer",
  "Data Detective",
  "Query Builder",
  "Data Analyst",
  "BI Apprentice",
  "SQL Strategist",
  "Analytics Architect",
  "Data Commander",
  "Infinity Master"
]);

export const LEVELS = Object.freeze(
  LEVEL_NAMES.map((name, index) =>
    Object.freeze({
      id: index + 1,
      name,
      xp: LEVEL_THRESHOLDS[index]
    })
  )
);

export const BADGE_DEFINITIONS = Object.freeze([
  Object.freeze({ id: "first-win", name: "First Visible Win", text: "Complete one lesson." }),
  Object.freeze({ id: "attempt-first", name: "Attempt Before Answer", text: "Check a query before opening a solution." }),
  Object.freeze({ id: "reviewer", name: "Retention Starter", text: "Complete one daily review." }),
  Object.freeze({ id: "week-one", name: "Week Finisher", text: "Complete every lesson in a week." }),
  Object.freeze({ id: "boss-clear", name: "Boss Battle Clear", text: "Complete a monthly battle." }),
  Object.freeze({ id: "halfway", name: "Halfway Analyst", text: "Complete twelve weeks." }),
  Object.freeze({ id: "infinity", name: "Infinity Master", text: "Complete all twenty-four weeks." })
]);

export const BADGE_RULES = Object.freeze([
  Object.freeze({ id: "first-win", metric: "completedLessons", operator: "gt", value: 0 }),
  Object.freeze({ id: "attempt-first", metric: "sqlAttempts", operator: "gt", value: 0 }),
  Object.freeze({ id: "reviewer", metric: "reviews", operator: "gt", value: 0 }),
  Object.freeze({ id: "week-one", metric: "completedWeeks", operator: "gt", value: 0 }),
  Object.freeze({ id: "boss-clear", metric: "bossBattles", operator: "gt", value: 0 }),
  Object.freeze({ id: "halfway", metric: "completedWeeks", operator: "gte", value: 12 }),
  Object.freeze({ id: "infinity", metric: "completedWeeks", operator: "eq_total_weeks" })
]);

export const STREAK_CONFIG = Object.freeze({
  INCREMENT_DAYS: 1,
  RESET_DAYS: 1
});

export const FEATURE_GUIDE_DELAY_MS = 700;
