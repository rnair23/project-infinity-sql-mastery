export function renderMentor(els, state, week) {
  const attempt = state.sqlAttempts[week.id];
  const hasAttempt = Boolean(attempt);

  els.mentorStatus.textContent = hasAttempt ? "Context ready" : "Optional";
  els.mentorQuestion.placeholder = hasAttempt
    ? "Why did my query return this result?"
    : "I am not sure how to start this query.";
}

export function bindMentorModes(els, onSelectMode) {
  els.mentorModes.querySelectorAll("[data-mentor-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      els.mentorModes.querySelectorAll("[data-mentor-mode]").forEach((modeButton) => {
        modeButton.classList.toggle("active", modeButton === button);
      });
      onSelectMode(button.dataset.mentorMode);
    });
  });
}

export function getMentorMode(els) {
  return els.mentorModes.querySelector(".active")?.dataset.mentorMode || "hint";
}

export function setMentorLoading(els) {
  els.mentorAskButton.disabled = true;
  els.mentorStatus.textContent = "Thinking";
  els.mentorAnswer.innerHTML = "<strong>Thinking with your current week context...</strong>";
}

export function setMentorAnswer(els, answer) {
  els.mentorAskButton.disabled = false;
  els.mentorStatus.textContent = "Ready";
  els.mentorAnswer.innerHTML = `<strong>Mentor response</strong><p>${formatAnswer(answer)}</p>`;
}

export function setMentorError(els, message) {
  els.mentorAskButton.disabled = false;
  els.mentorStatus.textContent = "Setup needed";
  els.mentorAnswer.innerHTML = `<strong>AI mentor is not connected yet.</strong><p>${escapeHtml(message)}</p>`;
}

function formatAnswer(answer) {
  return escapeHtml(answer).replace(/\n{2,}/g, "</p><p>").replace(/\n/g, "<br>");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
