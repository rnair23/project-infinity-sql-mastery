import { BADGE_RULES } from "../data/constants.js";

export function checkBadges(state, curriculum) {
  const metrics = getBadgeMetrics(state, curriculum);
  const earnedIds = BADGE_RULES.filter((rule) => matchesRule(rule, metrics)).map((rule) => rule.id);
  const earnedIdSet = new Set(earnedIds);
  return curriculum.badges.filter((badge) => earnedIdSet.has(badge.id));
}

export function syncEarnedBadges(state, curriculum) {
  state.earnedBadgeIds = checkBadges(state, curriculum).map((badge) => badge.id);
  return state;
}

export function getBadgeMetrics(state, curriculum) {
  return {
    completedLessons: Object.values(state.completedLessons || {}).reduce((sum, ids) => sum + ids.length, 0),
    sqlAttempts: Object.keys(state.sqlAttempts || {}).length,
    reviews: Object.keys(state.reviews || {}).length,
    completedWeeks: getCompletedWeekCount(state, curriculum),
    bossBattles: Object.keys(state.bossBattles || {}).length,
    totalWeeks: curriculum.weeks.length
  };
}

function matchesRule(rule, metrics) {
  const value = metrics[rule.metric] || 0;
  if (rule.operator === "gt") return value > rule.value;
  if (rule.operator === "gte") return value >= rule.value;
  if (rule.operator === "eq_total_weeks") return value === metrics.totalWeeks;
  return value === rule.value;
}

function getCompletedWeekCount(state, curriculum) {
  return curriculum.weeks.filter((week) => {
    const completedLessons = state.completedLessons?.[week.id] || [];
    return completedLessons.length === week.lessons.length;
  }).length;
}
