export function renderSqlLab(els, state, week) {
  const challenge = week.challenge;
  const attempt = state.sqlAttempts[week.id];

  els.companyLabel.textContent = challenge.company;
  els.challengePrompt.textContent = challenge.prompt;
  els.schemaGrid.innerHTML = challenge.schema.map((item) => `<span>${item}</span>`).join("");
  els.queryInput.value = attempt?.query || challenge.starter;
  els.solutionBox.textContent = state.solutionSeen[week.id] ? challenge.solution : "";
  els.solutionBox.classList.toggle("open", Boolean(state.solutionSeen[week.id]));
  els.sqlStatus.textContent = getStatusLabel(state, week.id, attempt);
  els.feedbackBox.innerHTML = attempt?.feedback || "";
  els.resultShell.innerHTML = renderQueryResult(attempt);
}

function getStatusLabel(state, weekId, attempt) {
  if (attempt?.error) return "Error";
  if (state.sqlPassed[weekId]) return "Passed";
  if (attempt?.result) return "Runs";
  return "Ready";
}

function renderQueryResult(attempt) {
  if (!attempt?.result || attempt.error) return "";

  const { columns, rows } = attempt.result;
  if (!columns.length) {
    return `<div class="result-empty">Query ran successfully. No result table was returned.</div>`;
  }

  const visibleRows = rows.slice(0, 50);
  const overflow = rows.length > visibleRows.length
    ? `<p class="result-note">Showing first ${visibleRows.length} of ${rows.length} rows.</p>`
    : "";

  return `<div class="result-heading">
      <strong>Result Table</strong>
      <span>${rows.length} row${rows.length === 1 ? "" : "s"}</span>
    </div>
    <div class="result-table-wrap">
      <table class="result-table">
        <thead>
          <tr>${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${visibleRows.map((row) => `<tr>${row.map((value) => `<td>${escapeHtml(formatCell(value))}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
    ${overflow}`;
}

function formatCell(value) {
  if (value === null || value === undefined) return "NULL";
  return value;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
