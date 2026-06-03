import { curriculum } from "./data/curriculum.js";
import { createStore } from "./state/store.js";
import { completedLessonIds, getWeek } from "./state/selectors.js";
import { runLearnerQuery } from "./services/sqlEngine.js";
import { todayKey, yesterdayKey } from "./utils/date.js";
import { hydrateIcons } from "./utils/icons.js";
import { checkChallengeRequirements, formatSqlError, formatSqlFeedback } from "./utils/sqlCheck.js";
import { getElements } from "./views/dom.js";
import { renderBadges } from "./views/badgeView.js";
import { renderBossBattle } from "./views/bossView.js";
import { renderJourney } from "./views/journeyView.js";
import { renderMentalModel } from "./views/mentalModelView.js";
import { renderMetrics } from "./views/metricsView.js";
import { renderReview } from "./views/reviewView.js";
import { renderSqlLab } from "./views/sqlLabView.js";
import { renderWeekDetails } from "./views/weekView.js";

const store = createStore("projectInfinityState.v1");
const els = getElements();

function render() {
  const state = store.getState();
  const week = getWeek(curriculum, state.selectedWeek);

  renderMetrics(els, state, curriculum);
  renderMentalModel(els, curriculum);
  renderJourney(els, state, curriculum, selectWeek);
  renderWeekDetails(els, state, week, toggleLesson);
  renderSqlLab(els, state, week);
  renderReview(els, state, week);
  renderBossBattle(els, state, curriculum, week.id, completeBossBattle);
  renderBadges(els, state, curriculum);
  hydrateIcons();
}

function selectWeek(weekId) {
  store.update((state) => {
    state.selectedWeek = weekId;
  });
  render();
}

function toggleLesson(weekId, lessonIndex, checked) {
  store.update((state) => {
    const ids = new Set(completedLessonIds(state, weekId));
    if (checked) {
      ids.add(lessonIndex);
    } else {
      ids.delete(lessonIndex);
    }
    state.completedLessons[weekId] = Array.from(ids).sort((a, b) => a - b);
  });
  render();
}

async function runQueryCheck() {
  const week = getWeek(curriculum, store.getState().selectedWeek);
  const query = els.queryInput.value.trim();

  els.runButton.disabled = true;
  els.sqlStatus.textContent = "Running";
  els.feedbackBox.innerHTML = "<strong>Running SQLite...</strong>";
  els.resultShell.innerHTML = "";

  try {
    const execution = await runLearnerQuery(query);
    const requirements = checkChallengeRequirements(query, week.challenge.checks);
    const feedback = formatSqlFeedback({ execution, requirements });

    store.update((state) => {
      state.sqlAttempts[week.id] = {
        query,
        feedback,
        result: execution,
        passedCount: requirements.passedCount
      };
      if (requirements.passed) {
        state.sqlPassed[week.id] = true;
      } else {
        delete state.sqlPassed[week.id];
      }
    });
  } catch (error) {
    store.update((state) => {
      state.sqlAttempts[week.id] = {
        query,
        feedback: formatSqlError(error),
        error: error.message
      };
      delete state.sqlPassed[week.id];
    });
  } finally {
    els.runButton.disabled = false;
    render();
  }
}

function revealSolution() {
  const week = getWeek(curriculum, store.getState().selectedWeek);
  if (!store.getState().sqlAttempts[week.id]) {
    els.feedbackBox.innerHTML = "<strong>Attempt first.</strong><p>Run your query once before opening the answer.</p>";
    return;
  }

  store.update((state) => {
    state.solutionSeen[week.id] = true;
  });
  render();
}

function markReviewDone() {
  store.update((state) => {
    const today = todayKey();
    if (state.lastReviewDate !== today) {
      state.streak = state.lastReviewDate === yesterdayKey() ? state.streak + 1 : 1;
      state.lastReviewDate = today;
    }
    state.reviews[today] = true;
  });
  render();
}

function completeBossBattle(month) {
  store.update((state) => {
    state.bossBattles[month] = true;
  });
  render();
}

function resetProgress() {
  const confirmed = window.confirm("Reset Project Infinity progress?");
  if (!confirmed) return;
  store.reset();
  render();
}

function bindEvents() {
  els.runButton.addEventListener("click", runQueryCheck);
  els.solutionButton.addEventListener("click", revealSolution);
  els.reviewButton.addEventListener("click", markReviewDone);
  els.resetButton.addEventListener("click", resetProgress);
}

bindEvents();
render();
