import { seedDatabase } from "../data/sampleDatabase.js";

let sqlModulePromise;
let seedBytesPromise;

export async function runLearnerQuery(query) {
  const cleanQuery = validateQuery(query);
  const SQL = await loadSqlModule();
  const seedBytes = await getSeedBytes(SQL);
  const db = new SQL.Database(seedBytes);

  try {
    const resultSets = db.exec(cleanQuery);
    const firstSet = resultSets[0] || { columns: [], values: [] };
    return {
      columns: firstSet.columns,
      rows: firstSet.values,
      rowCount: firstSet.values.length
    };
  } finally {
    db.close();
  }
}

async function loadSqlModule() {
  if (!sqlModulePromise) {
    if (!window.initSqlJs) {
      throw new Error("SQLite runtime did not load. Refresh the page and try again.");
    }
    sqlModulePromise = window.initSqlJs({
      locateFile: (file) => `./vendor/sqljs/${file}`
    });
  }
  return sqlModulePromise;
}

async function getSeedBytes(SQL) {
  if (!seedBytesPromise) {
    seedBytesPromise = Promise.resolve().then(() => {
      const db = new SQL.Database();
      seedDatabase(db);
      const bytes = db.export();
      db.close();
      return bytes;
    });
  }
  return seedBytesPromise;
}

function validateQuery(query) {
  const cleanQuery = query.trim();
  const withoutTrailingSemicolon = cleanQuery.replace(/;+\s*$/, "");
  const statementCount = withoutTrailingSemicolon.split(";").filter((part) => part.trim()).length;

  if (!cleanQuery) {
    throw new Error("Write a SQL query before running it.");
  }

  if (statementCount > 1) {
    throw new Error("Run one query at a time.");
  }

  if (!/^\s*(select|with)\b/i.test(cleanQuery)) {
    throw new Error("For practice mode, run a SELECT query or a WITH query.");
  }

  if (/\b(insert|update|delete|drop|alter|create|replace|pragma|attach|detach|vacuum|reindex)\b/i.test(cleanQuery)) {
    throw new Error("Practice mode is read-only. Use SELECT queries against the sample database.");
  }

  return cleanQuery;
}
