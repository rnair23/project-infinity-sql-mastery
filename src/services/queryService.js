import { checkChallengeRequirements, formatSqlError, formatSqlFeedback } from "../utils/sqlCheck.js";
import { runLearnerQuery } from "./sqlEngine.js";

export async function runPracticeQuery({ query, challenge }) {
  try {
    const execution = await runLearnerQuery(query);
    const requirements = checkChallengeRequirements(query, challenge.checks);
    return {
      query,
      feedback: formatSqlFeedback({ execution, requirements }),
      result: execution,
      passed: requirements.passed,
      passedCount: requirements.passedCount
    };
  } catch (error) {
    return {
      query,
      feedback: formatSqlError(error),
      error: error.message,
      passed: false
    };
  }
}
