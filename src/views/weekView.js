import { completedLessonIds } from "../state/selectors.js";

export function renderWeekDetails(els, state, week, onToggleLesson) {
  els.activeTitle.textContent = `Week ${week.id}: ${week.title}`;
  els.phaseLabel.textContent = week.phase;
  els.weekPhase.textContent = week.phase;
  els.weekTitle.textContent = week.title;
  els.weekStory.textContent = week.story;
  els.visibleWin.textContent = week.visibleWin;
  els.weekLevel.textContent = week.level;

  const completed = completedLessonIds(state, week.id);
  els.lessonList.innerHTML = week.lessons
    .map((lesson, index) => {
      const checked = completed.includes(index);
      return `<label class="lesson-row ${checked ? "done" : ""}">
        <input type="checkbox" data-lesson="${index}" ${checked ? "checked" : ""}>
        <span>${lesson}</span>
      </label>`;
    })
    .join("");

  els.lessonList.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => onToggleLesson(week.id, Number(input.dataset.lesson), input.checked));
  });
}
