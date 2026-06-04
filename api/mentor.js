import OpenAI from "openai";

const defaultModel = "gpt-5-mini";

export default async function handler(request, response) {
  setCorsHeaders(response);

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method !== "POST") {
    response.status(405).json({ error: "Use POST for AI mentor requests." });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    response.status(500).json({ error: "OPENAI_API_KEY is not configured on the server." });
    return;
  }

  try {
    const body = await readJsonBody(request);
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const mentorResponse = await client.responses.create({
      model: process.env.OPENAI_MODEL || defaultModel,
      input: [
        {
          role: "system",
          content: mentorInstructions()
        },
        {
          role: "user",
          content: JSON.stringify({
            mode: body.mode || "hint",
            question: body.question || "",
            context: body.context || {}
          })
        }
      ],
      max_output_tokens: 700
    });

    response.status(200).json({
      answer: mentorResponse.output_text || "I could not generate a response for this step."
    });
  } catch (error) {
    response.status(500).json({
      error: error.message || "AI mentor failed to respond."
    });
  }
}

function mentorInstructions() {
  return [
    "You are Project Infinity's SQL learning mentor.",
    "Help a non-technical learner build permanent data thinking, not memorized syntax.",
    "Use the current week, schema, learner query, SQLite result, and challenge checks as context.",
    "Be concise, warm, and practical.",
    "For hint mode, give the next thinking step without writing the full final SQL.",
    "For error mode, explain the likely SQL mistake and give a small correction pattern.",
    "For business mode, translate the query or result into a business decision.",
    "For next mode, recommend the next exercise action in 2-3 steps.",
    "Do not invent tables or columns outside the provided schema.",
    "If the learner asks for the full answer, encourage one more attempt before showing a complete solution."
  ].join(" ");
}

async function readJsonBody(request) {
  if (request.body && typeof request.body === "object") return request.body;
  if (typeof request.body === "string") return JSON.parse(request.body);

  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function setCorsHeaders(response) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
  response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}
