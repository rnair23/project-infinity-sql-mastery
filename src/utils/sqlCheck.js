export function checkChallengeRequirements(query, checks) {
  const results = checks.map((check) => ({
    ...check,
    passed: new RegExp(check.pattern, "i").test(query.trim())
  }));

  return {
    results,
    passedCount: results.filter((result) => result.passed).length,
    passed: results.every((result) => result.passed)
  };
}

export function formatSqlFeedback({ execution, requirements }) {
  const heading = requirements.passed
    ? `SQLite executed successfully. ${execution.rowCount} row${execution.rowCount === 1 ? "" : "s"} returned.`
    : "SQLite executed successfully, but the business intent needs work.";

  return `<strong>${heading}</strong>
    <ul>${requirements.results.map((result) => `<li class="${result.passed ? "pass" : "miss"}">${result.label}</li>`).join("")}</ul>`;
}

export function formatSqlError(error) {
  return `<strong>SQLite could not run this query.</strong><p>${escapeHtml(error.message)}</p>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
