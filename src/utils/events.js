export function createEventBus() {
  const listeners = new Map();

  return {
    on(eventName, handler) {
      const eventListeners = listeners.get(eventName) || new Set();
      eventListeners.add(handler);
      listeners.set(eventName, eventListeners);
      return () => this.off(eventName, handler);
    },

    off(eventName, handler) {
      listeners.get(eventName)?.delete(handler);
    },

    emit(eventName, payload) {
      listeners.get(eventName)?.forEach((handler) => handler(payload));
    }
  };
}

export const events = createEventBus();
