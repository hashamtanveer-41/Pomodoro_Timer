/** Format seconds into mm:ss display string */
export function formatTime(totalSeconds) {
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const ss = String(totalSeconds % 60).padStart(2, '0');
  return { mm, ss };
}

/** Format a Date object into a readable time string like "3:42 pm" */
export function formatClockTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}
