import { isWeekComplete } from "../state/selectors.js";

export function renderJourney(els, state, curriculum, onSelectWeek) {
  els.weekMap.innerHTML = curriculum.weeks
    .map((week) => {
      const status = isWeekComplete(state, week) ? "complete" : state.sqlPassed[week.id] ? "attempted" : "";
      const selectedClass = week.id === state.selectedWeek ? "selected" : "";
      return `<button class="week-tile ${status} ${selectedClass}" type="button" data-week="${week.id}">
        <span>Week ${week.id}</span>
        <strong>${week.title}</strong>
      </button>`;
    })
    .join("");

  els.weekMap.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => onSelectWeek(Number(button.dataset.week)));
  });
}
