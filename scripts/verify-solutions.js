import initSqlJs from "sql.js";
import { curriculum } from "../src/data/curriculum.js";
import { seedDatabase } from "../src/data/sampleDatabase.js";

const SQL = await initSqlJs({
  locateFile: (file) => `./node_modules/sql.js/dist/${file}`
});

const failures = [];
const summaries = [];

for (const week of curriculum.weeks) {
  const db = new SQL.Database();
  seedDatabase(db);

  try {
    const result = db.exec(week.challenge.solution);
    const firstSet = result[0] || { columns: [], values: [] };
    summaries.push({
      week: week.id,
      title: week.title,
      rows: firstSet.values.length,
      columns: firstSet.columns.length
    });
  } catch (error) {
    failures.push({
      week: week.id,
      title: week.title,
      error: error.message
    });
  } finally {
    db.close();
  }
}

if (failures.length) {
  console.error(JSON.stringify({ failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ checked: summaries.length, summaries }, null, 2));
