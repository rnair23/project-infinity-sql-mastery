export const defaultState = {
  selectedWeek: 1,
  completedLessons: {},
  sqlPassed: {},
  sqlAttempts: {},
  solutionSeen: {},
  reviews: {},
  bossBattles: {},
  streak: 0,
  lastReviewDate: ""
};

export function createStore(storageKey) {
  let state = loadState(storageKey);

  function save() {
    localStorage.setItem(storageKey, JSON.stringify(state));
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
    }
  };
}

function freshState() {
  return JSON.parse(JSON.stringify(defaultState));
}

function loadState(storageKey) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return saved ? { ...freshState(), ...saved } : freshState();
  } catch (error) {
    return freshState();
  }
}
