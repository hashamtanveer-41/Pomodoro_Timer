import React, { useState } from 'react';
import { Settings, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePomodoroContext } from '../context/PomodoroContext';
import HistoryOverlay  from './HistoryOverlay';
import SettingsOverlay from './SettingsOverlay';

export default function NavBar() {
  const { history, isIdle, focusMins, breakMins, updateFocusMins, updateBreakMins } =
    usePomodoroContext();

  const [historyOpen,  setHistoryOpen]  = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5 shrink-0 relative z-10">
        {/* Settings  left */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          onClick={() => setSettingsOpen(true)}
          title="Settings"
          className="p-2 rounded-xl text-white/45 flex items-center justify-center outline-none"
        >
          <Settings size={29} strokeWidth={1.8} />
        </motion.button>

        {/* Title — center */}
        <span className="font-display text-[23px] tracking-[0.28em] font-bold uppercase text-white/45 select-none">
          Pomodoro
        </span>

        {/* History — right */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          onClick={() => setHistoryOpen(true)}
          title="Session history"
          className="relative p-2 rounded-xl text-white/45 flex items-center justify-center outline-none"
        >
          <History size={29} strokeWidth={1.8} />
          {history.length > 0 && (
            <span className="absolute top-1.5 right-1.5 w-1.75 h-1.75 rounded-full bg-[#4eecc8] border-2 border-[#080c14]" />
          )}
        </motion.button>
      </nav>

      <HistoryOverlay
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
      />
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
