let pending = 0;
const listeners = new Set();

const notify = () => listeners.forEach((fn) => fn(pending));

export const loaderManager = {
  start() {
    pending++;
    notify();
  },
  end() {
    pending = Math.max(0, pending - 1);
    notify();
  },
  getPending: () => pending,
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
