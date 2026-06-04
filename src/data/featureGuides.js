export const activeFeatureGuide = {
  id: "sqlite-practice-v1",
  title: "New: Real SQLite Practice",
  releaseLabel: "SQLite engine upgrade",
  steps: [
    {
      target: "#queryInput",
      title: "Write real SQL",
      body: "The practice area now runs SELECT and WITH queries against a seeded SQLite database in your browser.",
      placement: "right"
    },
    {
      target: "#runButton",
      title: "Run the query",
      body: "Use Run Query to execute your attempt. Passing requirements still unlock XP, but the rows now come from SQLite.",
      placement: "top"
    },
    {
      target: "#resultShell",
      title: "Read the result table",
      body: "After execution, query output appears here as a table, along with business-intent checks for the challenge.",
      placement: "top"
    }
  ]
};
