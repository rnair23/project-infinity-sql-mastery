import { curriculum } from "./data/curriculum.js";
import { activeFeatureGuide } from "./data/featureGuides.js";
import { FEATURE_GUIDE_DELAY_MS, STREAK_CONFIG } from "./data/constants.js";
import { createStore } from "./state/store.js";
import { completedLessonIds, getWeek } from "./state/selectors.js";
import { askMentor } from "./services/mentorClient.js";
import { syncEarnedBadges } from "./services/badgeEngine.js";
import { runPracticeQuery } from "./services/queryService.js";
import { todayKey, yesterdayKey } from "./utils/date.js";
import { events } from "./utils/events.js";
import { hydrateIcons } from "./utils/icons.js";
import { getElements } from "./views/dom.js";
import { renderBadges } from "./views/badgeView.js";
import { renderBossBattle } from "./views/bossView.js";
import { renderJourney } from "./views/journeyView.js";
import { renderMentalModel } from "./views/mentalModelView.js";
import { renderMetrics } from "./views/metricsView.js";
import { bindMentorModes, getMentorMode, renderMentor, setMentorAnswer, setMentorError, setMentorLoading } from "./views/mentorView.js";
import { renderReview } from "./views/reviewView.js";
import { renderSqlLab } from "./views/sqlLabView.js";
import { renderWeekDetails } from "./views/weekView.js";
import { setupFeatureGuide } from "./views/guideView.js";

const store = createStore("projectInfinityState.v1", {
  deriveState: (state) => syncEarnedBadges(state, curriculum)
});
const els = getElements();
let activeMentorMode = "hint";
const featureGuide = setupFeatureGuide({
  guide: activeFeatureGuide,
  els,
  onBeforeStep: prepareGuideStep,
  onClose: cleanupGuideStep
});

function render() {
  const state = store.getState();
  const week = getWeek(curriculum, state.selectedWeek);

  renderMetrics(els, state, curriculum);
  renderMentalModel(els, curriculum);
  renderJourney(els, state, curriculum, selectWeek);
  renderWeekDetails(els, state, week, toggleLesson);
  renderSqlLab(els, state, week);
  renderMentor(els, state, week);
  renderReview(els, state, week);
  renderBossBattle(els, state, curriculum, week.id, completeBossBattle);
  renderBadges(els, state, curriculum);
  hydrateIcons();
}

function selectWeek(weekId) {
  store.update((state) => {
    state.selectedWeek = weekId;
  });
  events.emit("week:selected", { weekId });
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
    const attempt = await runPracticeQuery({ query, challenge: week.challenge });

    store.update((state) => {
      state.sqlAttempts[week.id] = {
        query: attempt.query,
        feedback: attempt.feedback,
        result: attempt.result,
        error: attempt.error,
        passedCount: attempt.passedCount
      };
      if (attempt.passed) {
        state.sqlPassed[week.id] = true;
      } else {
        delete state.sqlPassed[week.id];
      }
    });
    events.emit("query:completed", { weekId: week.id, passed: attempt.passed });
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
      state.streak = state.lastReviewDate === yesterdayKey() ? state.streak + STREAK_CONFIG.INCREMENT_DAYS : STREAK_CONFIG.RESET_DAYS;
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
  events.emit("boss:completed", { month });
  render();
}

function resetProgress() {
  const confirmed = window.confirm("Reset Project Infinity progress?");
  if (!confirmed) return;
  store.reset();
  render();
}

function bindEvents() {
  els.guideButton.addEventListener("click", () => featureGuide.show({ force: true }));
  bindMentorModes(els, (mode) => {
    activeMentorMode = mode;
  });
  els.mentorAskButton.addEventListener("click", askAiMentor);
  els.runButton.addEventListener("click", runQueryCheck);
  els.solutionButton.addEventListener("click", revealSolution);
  els.reviewButton.addEventListener("click", markReviewDone);
  els.resetButton.addEventListener("click", resetProgress);
}

async function askAiMentor() {
  const state = store.getState();
  const week = getWeek(curriculum, state.selectedWeek);
  const mode = activeMentorMode || getMentorMode(els);
  const question = els.mentorQuestion.value.trim();

  setMentorLoading(els);

  try {
    const response = await askMentor({
      mode,
      question,
      context: buildMentorContext(state, week)
    });
    setMentorAnswer(els, response.answer || "I could not generate a mentor response.");
  } catch (error) {
    setMentorError(els, error.message);
  }
}

function buildMentorContext(state, week) {
  const attempt = state.sqlAttempts[week.id];
  return {
    week: {
      id: week.id,
      title: week.title,
      phase: week.phase,
      level: week.level,
      story: week.story,
      visibleWin: week.visibleWin
    },
    challenge: {
      company: week.challenge.company,
      prompt: week.challenge.prompt,
      schema: week.challenge.schema,
      checks: week.challenge.checks.map((check) => check.label)
    },
    learner: {
      query: els.queryInput.value.trim(),
      question: els.mentorQuestion.value.trim(),
      lastFeedback: attempt?.feedback || "",
      lastError: attempt?.error || "",
      lastResult: attempt?.result
        ? {
            columns: attempt.result.columns,
            rows: attempt.result.rows.slice(0, 8),
            rowCount: attempt.result.rowCount
          }
        : null
    }
  };
}

function prepareGuideStep(step) {
  if (step.target !== "#resultShell") {
    cleanupGuideStep();
  }

  if (step.target === "#resultShell" && !els.resultShell.innerHTML.trim()) {
    els.resultShell.innerHTML = '<div class="result-empty" data-guide-placeholder="true">Query results will appear here after SQLite runs your attempt.</div>';
  }
}

function cleanupGuideStep() {
  if (els.resultShell.querySelector("[data-guide-placeholder]")) {
    els.resultShell.innerHTML = "";
  }
}

bindEvents();
render();
window.setTimeout(() => featureGuide.show(), FEATURE_GUIDE_DELAY_MS);
