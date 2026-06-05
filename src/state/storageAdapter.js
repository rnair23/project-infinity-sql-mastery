export const storageAdapter = {
  get(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      try {
        return JSON.parse(raw);
      } catch (error) {
        return raw;
      }
    } catch (error) {
      return null;
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  clear(key) {
    if (key) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.clear();
  },

  getAll() {
    const snapshot = {};
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      snapshot[key] = this.get(key);
    }
    return snapshot;
  }
};
