export function renderSqlLab(els, state, week) {
  const challenge = week.challenge;
  els.companyLabel.textContent = challenge.company;
  els.challengePrompt.textContent = challenge.prompt;
  els.schemaGrid.innerHTML = challenge.schema.map((item) => `<span>${item}</span>`).join("");
  els.queryInput.value = state.sqlAttempts[week.id]?.query || challenge.starter;
  els.solutionBox.textContent = state.solutionSeen[week.id] ? challenge.solution : "";
  els.solutionBox.classList.toggle("open", Boolean(state.solutionSeen[week.id]));
  els.sqlStatus.textContent = state.sqlPassed[week.id] ? "Passed" : state.sqlAttempts[week.id] ? "Attempted" : "Ready";
  els.feedbackBox.innerHTML = state.sqlAttempts[week.id]?.feedback || "";
}
