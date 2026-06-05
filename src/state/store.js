import { storageAdapter } from "./storageAdapter.js";

export const defaultState = {
  selectedWeek: 1,
  completedLessons: {},
  sqlPassed: {},
  sqlAttempts: {},
  solutionSeen: {},
  reviews: {},
  bossBattles: {},
  earnedBadgeIds: [],
  streak: 0,
  lastReviewDate: ""
};

export function createStore(storageKey, options = {}) {
  const { deriveState } = options;
  let state = loadState(storageKey);
  applyDerivations();

  function save() {
    applyDerivations();
    storageAdapter.set(storageKey, state);
  }

  function applyDerivations() {
    if (deriveState) {
      deriveState(state);
    }
  }

  return {
    getState() {
      return state;
    },
    update(mutator) {
      mutator(state);
      save();
    },
    reset() {
      state = freshState();
      save();
    },
    exportSnapshot() {
      return storageAdapter.getAll();
    }
  };
}

function freshState() {
  return JSON.parse(JSON.stringify(defaultState));
}

function loadState(storageKey) {
  const saved = storageAdapter.get(storageKey);
  return saved ? { ...freshState(), ...saved } : freshState();
}
