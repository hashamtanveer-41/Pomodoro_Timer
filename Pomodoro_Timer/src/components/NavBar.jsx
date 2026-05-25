import React, { useState } from 'react';
import { Settings, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePomodoroContext } from '../context/PomodoroContext';
import HistoryOverlay from './HistoryOverlay';
import SettingsOverlay from './SettingsOverlay';

export default function NavBar() {
  const { history, isIdle, focusMins, breakMins, updateFocusMins, updateBreakMins } = usePomodoroContext();
  const [historyOpen,  setHistoryOpen]  = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <nav className="relative z-10 flex shrink-0 items-center justify-between border-b border-[rgba(255,255,255,0.05)] px-6 py-8">
        {/* Settings icon — left */}
        <motion.button
          className="flex items-center justify-center rounded-[10px] bg-transparent p-2 text-[var(--text-muted)] transition-colors duration-200 hover:bg-[rgba(255,255,255,0.06)] focus:outline-none "
          whileTap={{ scale: 0.88 }}
          onClick={() => setSettingsOpen(true)}
          title="Settings"
        >
          <Settings size={29} strokeWidth={1.8} />
        </motion.button>

        {/* Title — center */}
        <span className="select-none font-[var(--font-display)] text-[20px] font-bold uppercase tracking-[0.28em] text-[var(--text-muted)]">
          Pomodoro
        </span>

        {/* History icon — right */}
        <motion.button
          className="relative flex items-center justify-center rounded-[10px] bg-transparent p-2 text-[var(--text-muted)] transition-colors duration-200 hover:bg-[rgba(255,255,255,0.06)] focus:outline-none"
          whileTap={{ scale: 0.88 }}
          onClick={() => setHistoryOpen(true)}
          title="Session history"
        >
          <History size={29} strokeWidth={1.8} />
          {history.length > 0 && (
            <span className="absolute right-[6px] top-[6px] h-[7px] w-[7px] rounded-full border-2 border-[#080c14] bg-[var(--break-accent)]" />
          )}
        </motion.button>
      </nav>

      {/* HistoryOverlay: triggered by NavBar, rendered here */}
      <HistoryOverlay
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
      />

      {/* SettingsOverlay: triggered by NavBar, rendered here */}
      <SettingsOverlay
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        focusMins={focusMins}
        breakMins={breakMins}
        onFocusChange={updateFocusMins}
        onBreakChange={updateBreakMins}
        isIdle={isIdle}
      />
    </>
  );
}
