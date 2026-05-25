import { useState, useEffect, useRef, useCallback } from 'react';
import { playChime } from '../utils/audio';
import { loadHistory, saveHistory, cleanOldHistory } from '../utils/storage';
import { formatClockTime } from '../utils/format';

/**
 * Core Pomodoro timer logic.
 * Returns everything the UI needs — no timer logic lives in components.
 */
export function usePomodoro() {
  const [focusMins, setFocusMins]   = useState(25);
  const [breakMins, setBreakMins]   = useState(5);
  const [mode, setMode]             = useState('focus');   // 'focus' | 'break'
  const [status, setStatus]         = useState('idle');    // 'idle' | 'running' | 'paused'
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [history, setHistory]       = useState(loadHistory);
  const [flash, setFlash]           = useState(false);
  const [completePulse, setCompletePulse] = useState(false);

  const intervalRef = useRef(null);

  // ── Derived state ──────────────────────────────────────────────────────────
  const totalSeconds = mode === 'focus' ? focusMins * 60 : breakMins * 60;
  const progress     = secondsLeft / totalSeconds;         // 1.0 → 0.0
  const isRunning    = status === 'running';
  const isPaused     = status === 'paused';
  const isIdle       = status === 'idle';

  // ── Boot: clean stale history keys from previous days ─────────────────────
  useEffect(() => { cleanOldHistory(); }, []);

  // ── Sync duration when user changes sliders (only while idle) ─────────────
  useEffect(() => {
    if (isIdle) {
      setSecondsLeft(mode === 'focus' ? focusMins * 60 : breakMins * 60);
    }
  }, [focusMins, breakMins, isIdle, mode]);

  // ── Session complete handler ───────────────────────────────────────────────
  const handleSessionComplete = useCallback(() => {
    clearInterval(intervalRef.current);
    setStatus('idle');

    if (mode === 'focus') {
      const entry = {
        id:       Date.now(),
        duration: `${String(focusMins).padStart(2, '0')}:00`,
        time:     formatClockTime(),
      };
      setHistory((prev) => {
        const updated = [...prev, entry];
        saveHistory(updated);
        return updated;
      });
    }

    // Visual + audio feedback
    playChime(mode === 'focus' ? 'break' : 'focus');
    setFlash(true);
    setCompletePulse(true);
    setTimeout(() => setFlash(false), 1000);
    setTimeout(() => setCompletePulse(false), 800);

    // Switch mode after brief pause to let animation play
    const nextMode = mode === 'focus' ? 'break' : 'focus';
    setTimeout(() => {
      setMode(nextMode);
      setSecondsLeft(nextMode === 'focus' ? focusMins * 60 : breakMins * 60);
    }, 600);
  }, [mode, focusMins, breakMins]);

  // ── Tick ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            handleSessionComplete();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, handleSessionComplete]);

  // ── Public actions ─────────────────────────────────────────────────────────
  const startPauseResume = useCallback(() => {
    if (isIdle)    { setSecondsLeft(mode === 'focus' ? focusMins * 60 : breakMins * 60); setStatus('running'); }
    else if (isRunning) setStatus('paused');
    else if (isPaused)  setStatus('running');
  }, [isIdle, isRunning, isPaused, mode, focusMins, breakMins]);

  const skipBreak = useCallback(() => {
    clearInterval(intervalRef.current);
    setStatus('idle');
    setMode('focus');
    setSecondsLeft(focusMins * 60);
  }, [focusMins]);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setStatus('idle');
    setMode('focus');
    setSecondsLeft(focusMins * 60);
  }, [focusMins]);

  const updateFocusMins = useCallback((v) => {
    if (isIdle) setFocusMins(Math.max(1, Math.min(90, v)));
  }, [isIdle]);

  const updateBreakMins = useCallback((v) => {
    if (isIdle) setBreakMins(Math.max(1, Math.min(30, v)));
  }, [isIdle]);

  return {
    // State
    focusMins, breakMins,
    mode, status,
    secondsLeft, totalSeconds, progress,
    isRunning, isPaused, isIdle,
    history,
    flash, completePulse,
    // Actions
    startPauseResume,
    skipBreak,
    reset,
    updateFocusMins,
    updateBreakMins,
  };
}
