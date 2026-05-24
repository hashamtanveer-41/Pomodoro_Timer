import React, { createContext, useContext } from 'react';
import { usePomodoro } from '../hooks/usePomodoro';

const PomodoroContext = createContext(null);

export function PomodoroProvider({ children }) {
  const pomodoro = usePomodoro();
  return (
    <PomodoroContext.Provider value={pomodoro}>
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoroContext() {
  const ctx = useContext(PomodoroContext);
  if (!ctx) throw new Error('usePomodoroContext must be used inside <PomodoroProvider>');
  return ctx;
}
