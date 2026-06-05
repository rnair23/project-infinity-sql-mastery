import { storageAdapter } from "./storageAdapter.js";

const guideStorageKey = "projectInfinityGuides.v1";

export function isGuideDismissed(guideId) {
  return readGuideState().dismissedGuides.includes(guideId);
}

export function dismissGuide(guideId) {
  const state = readGuideState();
  if (!state.dismissedGuides.includes(guideId)) {
    state.dismissedGuides.push(guideId);
  }
  storageAdapter.set(guideStorageKey, state);
}

function readGuideState() {
  const saved = storageAdapter.get(guideStorageKey);
  return {
    dismissedGuides: Array.isArray(saved?.dismissedGuides) ? saved.dismissedGuides : []
  };
}
