import React, { useState } from 'react';
import { Settings, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePomodoroContext } from '../context/PomodoroContext';
import HistoryOverlay from './HistoryOverlay';
import SettingsOverlay from './SettingsOverlay';

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    flexShrink: 0,
    position: 'relative',
    zIndex: 10,
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 13,
    letterSpacing: '0.28em',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    userSelect: 'none',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.18s, color 0.18s',
    position: 'relative',
    outline: 'none',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: 'var(--break-accent)',
    border: '2px solid #080c14',
  },
};

export default function NavBar() {
  const { history, isIdle, focusMins, breakMins, updateFocusMins, updateBreakMins } = usePomodoroContext();
  const [historyOpen,  setHistoryOpen]  = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <nav style={styles.nav}>
        {/* Settings icon — left */}
        <motion.button
          style={styles.iconBtn}
          whileTap={{ scale: 0.88 }}
          whileHover={{ background: 'rgba(255,255,255,0.06)' }}
          onClick={() => setSettingsOpen(true)}
          title="Settings"
        >
          <Settings size={19} strokeWidth={1.8} />
        </motion.button>

        {/* Title — center */}
        <span style={styles.title}>Pomodoro</span>

        {/* History icon — right */}
        <motion.button
          style={styles.iconBtn}
          whileTap={{ scale: 0.88 }}
          whileHover={{ background: 'rgba(255,255,255,0.06)' }}
          onClick={() => setHistoryOpen(true)}
          title="Session history"
        >
          <History size={19} strokeWidth={1.8} />
          {history.length > 0 && <span style={styles.badge} />}
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
