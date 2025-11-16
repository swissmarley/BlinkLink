const store = new Map();

module.exports = {
  set: (key, value) => store.set(key, value),
  get: (key) => store.get(key),
  delete: (key) => store.delete(key),
};