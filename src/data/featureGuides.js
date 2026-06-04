export const activeFeatureGuide = {
  id: "ai-mentor-v1",
  title: "New: AI Mentor",
  releaseLabel: "AI mentor upgrade",
  steps: [
    {
      target: ".mentor-panel",
      title: "Meet your AI Mentor",
      body: "Use this panel when you are stuck, unsure how to start, or need the result translated into business meaning.",
      placement: "right"
    },
    {
      target: "#mentorModes",
      title: "Choose the kind of help",
      body: "Pick a hint, error explanation, business translation, or next-step coaching. The mentor uses your current week and query context.",
      placement: "top"
    },
    {
      target: "#mentorAskButton",
      title: "Ask without losing momentum",
      body: "Ask Mentor sends your current challenge, schema, query, and last SQLite result to the secure backend when it is connected.",
      placement: "top"
    }
  ]
};
