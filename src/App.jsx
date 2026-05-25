import React from 'react';
import { PomodoroProvider } from './context/PomodoroContext';
import NavBar        from './components/NavBar';
import PomodoroTimer from './components/PomodoroTimer';

export default function App() {
  return (
    <PomodoroProvider>
      <div className="h-screen flex flex-col overflow-hidden">
        <NavBar />
        <PomodoroTimer />
      </div>
    </PomodoroProvider>
  );
}
