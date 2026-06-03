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
  const lessonXp = Object.values(state.completedLessons).reduce((sum, ids) => sum + ids.length * 25, 0);
  const weekXp = getCompletedWeekCount(state, curriculum) * 100;
  const sqlXp = Object.keys(state.sqlPassed).length * 75;
  const reviewXp = Object.keys(state.reviews).length * 15;
  const bossXp = Object.keys(state.bossBattles).length * 150;
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
  const completedWeeks = getCompletedWeekCount(state, curriculum);
  const completedLessons = Object.values(state.completedLessons).reduce((sum, ids) => sum + ids.length, 0);

  return curriculum.badges.filter((badge) => {
    if (badge.id === "first-win") return completedLessons > 0;
    if (badge.id === "attempt-first") return Object.keys(state.sqlAttempts).length > 0;
    if (badge.id === "reviewer") return Object.keys(state.reviews).length > 0;
    if (badge.id === "week-one") return completedWeeks > 0;
    if (badge.id === "boss-clear") return Object.keys(state.bossBattles).length > 0;
    if (badge.id === "halfway") return completedWeeks >= 12;
    if (badge.id === "infinity") return completedWeeks === curriculum.weeks.length;
    return false;
  });
}
