const guideStorageKey = "projectInfinityGuides.v1";

export function isGuideDismissed(guideId) {
  return readGuideState().dismissedGuides.includes(guideId);
}

export function dismissGuide(guideId) {
  const state = readGuideState();
  if (!state.dismissedGuides.includes(guideId)) {
    state.dismissedGuides.push(guideId);
  }
  localStorage.setItem(guideStorageKey, JSON.stringify(state));
}

function readGuideState() {
  try {
    const saved = JSON.parse(localStorage.getItem(guideStorageKey));
    return {
      dismissedGuides: Array.isArray(saved?.dismissedGuides) ? saved.dismissedGuides : []
    };
  } catch (error) {
    return { dismissedGuides: [] };
  }
}
