const mentorEndpointKey = "projectInfinityAiEndpoint";

export async function askMentor(payload) {
  const endpoint = getMentorEndpoint();

  if (!endpoint) {
    throw new MentorConnectionError(setupMessage());
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    if (isMissingDefaultEndpoint(endpoint, response.status)) {
      throw new MentorConnectionError(setupMessage());
    }

    const detail = await safeJson(response);
    throw new Error(detail?.error || `AI mentor request failed with status ${response.status}.`);
  }

  return response.json();
}

export function getMentorEndpoint() {
  const savedEndpoint = localStorage.getItem(mentorEndpointKey);
  if (savedEndpoint) return savedEndpoint;

  if (isStaticOnlyHost()) return "";

  return "/api/mentor";
}

export function setMentorEndpoint(endpoint) {
  localStorage.setItem(mentorEndpointKey, endpoint);
}

export class MentorConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = "MentorConnectionError";
  }
}

function setupMessage() {
  return [
    "AI Mentor is ready in the app, but it needs a secure backend before it can call OpenAI.",
    "Deploy the included /api/mentor function on Vercel or another serverless host, add OPENAI_API_KEY as an environment variable, then point the app to that endpoint."
  ].join(" ");
}

function isMissingDefaultEndpoint(endpoint, status) {
  return endpoint === "/api/mentor" && [404, 405, 501].includes(status);
}

function isStaticOnlyHost() {
  const { hostname, port } = window.location;
  return hostname.endsWith("github.io") || (hostname === "127.0.0.1" && port === "4173");
}

async function safeJson(response) {
  try {
    return await response.json();
  } catch (error) {
    return null;
  }
}
