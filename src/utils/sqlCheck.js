export function checkSqlPattern(query, checks) {
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

export function formatSqlFeedback(evaluation) {
  return `<strong>${evaluation.passed ? "Pattern accepted." : "Keep shaping the query."}</strong>
    <ul>${evaluation.results.map((result) => `<li class="${result.passed ? "pass" : "miss"}">${result.label}</li>`).join("")}</ul>`;
}
