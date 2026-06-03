import { calculateXp, getCompletedWeekCount, getLevel } from "../state/selectors.js";

export function renderMetrics(els, state, curriculum) {
  const xp = calculateXp(state, curriculum);
  const completedWeeks = getCompletedWeekCount(state, curriculum);
  const completion = Math.round((completedWeeks / curriculum.weeks.length) * 100);
  const activeLevel = getLevel(state, curriculum);

  els.xpTotal.textContent = xp.toLocaleString();
  els.currentLevel.textContent = activeLevel.name;
  els.completionTotal.textContent = `${completion}%`;
  els.streakTotal.textContent = `${state.streak} ${state.streak === 1 ? "day" : "days"}`;

  els.levelList.innerHTML = curriculum.levels
    .map((level) => {
      const stateClass = level.id === activeLevel.id ? "active" : level.id < activeLevel.id ? "earned" : "";
      return `<button class="level-item ${stateClass}" type="button" data-level="${level.id}">
        <span>${level.id}</span>
        <strong>${level.name}</strong>
        <small>${level.xp} XP</small>
      </button>`;
    })
    .join("");
}
