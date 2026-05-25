const PREFIX = 'pomo_history_';

/** Returns today's storage key, e.g. "pomo_history_2024-12-15" */
const todayKey = () => `${PREFIX}${new Date().toISOString().slice(0, 10)}`;

/** Load today's session history from localStorage */
export function loadHistory() {
  try {
    const raw = localStorage.getItem(todayKey());
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Persist today's session history to localStorage */
export function saveHistory(entries) {
  try {
    localStorage.setItem(todayKey(), JSON.stringify(entries));
  } catch (_) {}
}

/** Remove history entries from previous days to avoid storage bloat */
export function cleanOldHistory() {
  try {
    const today = todayKey();
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX) && k !== today)
      .forEach((k) => localStorage.removeItem(k));
  } catch (_) {}
}
