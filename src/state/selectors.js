import { XP_VALUES } from "../data/constants.js";
import { checkBadges } from "../services/badgeEngine.js";

export function getWeek(curriculum, id) {
  return curriculum.weeks.find((week) => week.id === id) || curriculum.weeks[0];
}

export function completedLessonIds(state, weekId) {
  return state.completedLessons[weekId] || [];
}

export function isWeekComplete(state, week) {
  return completedLessonIds(state, week.id).length === week.lessons.length;
}

export function getCompletedWeekCount(state, curriculum) {
  return curriculum.weeks.filter((week) => isWeekComplete(state, week)).length;
}

export function calculateXp(state, curriculum) {
  const lessonXp = Object.values(state.completedLessons).reduce((sum, ids) => sum + ids.length * XP_VALUES.LESSON, 0);
  const weekXp = getCompletedWeekCount(state, curriculum) * XP_VALUES.WEEK_COMPLETION;
  const sqlXp = Object.keys(state.sqlPassed).length * XP_VALUES.SQL_PASS;
  const reviewXp = Object.keys(state.reviews).length * XP_VALUES.REVIEW;
  const bossXp = Object.keys(state.bossBattles).length * XP_VALUES.BOSS_BATTLE;
  return lessonXp + weekXp + sqlXp + reviewXp + bossXp;
}

export function getLevel(state, curriculum) {
  const xp = calculateXp(state, curriculum);
  return curriculum.levels.reduce((active, level) => (xp >= level.xp ? level : active), curriculum.levels[0]);
}

export function getBossBattle(curriculum, weekId) {
  const index = Math.min(Math.floor((weekId - 1) / 4), curriculum.bossBattles.length - 1);
  return curriculum.bossBattles[index];
}

export function earnedBadges(state, curriculum) {
  return checkBadges(state, curriculum);
}
