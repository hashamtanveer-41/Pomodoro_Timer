/**
 * Plays a multi-tone chime via Web Audio API — no external files needed.
 * @param {'focus'|'break'} type - determines ascending (focus done) or descending (break done) tone sequence
 */
export function playChime(type = 'focus') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    // Ascending = transitioning to break (reward), descending = back to focus (signal)
    const freqs =
      type === 'focus'
        ? [523.25, 659.25, 783.99, 1046.5]   // C5 E5 G5 C6 — bright, triumphant
        : [783.99, 659.25, 523.25, 392.0];    // G5 E5 C5 G4 — gentle, calming

    freqs.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      const t    = ctx.currentTime + i * 0.18;

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);

      osc.start(t);
      osc.stop(t + 0.6);
    });

    setTimeout(() => ctx.close(), 2500);
  } catch (_) {
    // Audio not available — fail silently
  }
}
