import React, { createContext, useContext } from 'react';
import { usePomodoro } from '../hooks/usePomodoro';

const PomodoroContext = createContext(null);

/** Wraps the whole app so NavBar and PomodoroTimer share one timer instance */
export function PomodoroProvider({ children }) {
  const pomodoro = usePomodoro();
  return (
    <PomodoroContext.Provider value={pomodoro}>
      {children}
    </PomodoroContext.Provider>
  );
}

/** Hook to consume the shared pomodoro state anywhere in the tree */
export function usePomodoroContext() {
  const ctx = useContext(PomodoroContext);
  if (!ctx) throw new Error('usePomodoroContext must be used inside <PomodoroProvider>');
  return ctx;
}
