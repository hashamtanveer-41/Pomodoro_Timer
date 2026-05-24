import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

function getPrimaryConfig(status, mode) {
  if (status === 'idle' && mode === 'focus')
    return { icon: <Play  size={17} fill="currentColor" />, label: 'Start to Focus' };
  if (status === 'idle' && mode === 'break')
    return { icon: <Play  size={17} fill="currentColor" />, label: 'Start Break'    };
  if (status === 'running' && mode === 'break')
    return { icon: <SkipForward size={17} fill="currentColor" />, label: 'Skip Break' };
  if (status === 'running')
    return { icon: <Pause size={17} fill="currentColor" />, label: 'Pause'          };

  /* paused */
  return { icon: <Play  size={17} fill="currentColor" />, label: 'Resume'         };
}

export default function TimerControls({ status, mode, onPrimaryAction, onReset }) {
  const { icon, label } = getPrimaryConfig(status, mode);

  const accentColor  = mode === 'focus' ? 'rgba(232,232,240,0.92)' : 'rgba(78,236,200,0.92)';
  const btnBg        = mode === 'focus' ? 'rgba(232,232,240,0.1)'  : 'rgba(78,236,200,0.1)';
  const btnBorder    = mode === 'focus' ? 'rgba(232,232,240,0.14)' : 'rgba(78,236,200,0.2)';
  const btnBgHover   = mode === 'focus' ? 'rgba(232,232,240,0.16)' : 'rgba(78,236,200,0.16)';

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14,
    },
    primaryBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '14px 38px',
      borderRadius: 50,
      border: `1px solid ${btnBorder}`,
      background: btnBg,
      color: accentColor,
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 15,
      letterSpacing: '0.04em',
      cursor: 'pointer',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      boxShadow: `0 4px 24px rgba(0,0,0,0.28), 0 0 0 1px ${btnBorder}`,
      minWidth: 'clamp(180px, 55vw, 220px)',
      justifyContent: 'center',
      transition: 'background 0.28s, box-shadow 0.28s, color 0.28s, border-color 0.28s',
      outline: 'none',
    },
    resetBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      background: 'none',
      border: 'none',
      color: 'var(--text-dim)',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontSize: 12,
      letterSpacing: '0.08em',
      padding: '6px 14px',
      borderRadius: 8,
      transition: 'color 0.18s, background 0.18s',
      outline: 'none',
    },
  };

  return (
    <div style={styles.container}>
      {/* Primary CTA */}
      <motion.button
        style={styles.primaryBtn}
        whileTap={{ scale: 0.95 }}
        whileHover={{ background: btnBgHover }}
        onClick={onPrimaryAction}
        layout
      >
        <motion.span
          key={label}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10 }}
        >
          {icon}
          {label}
        </motion.span>
      </motion.button>

      {/* Reset — only visible once timer has started */}
      <AnimatePresence>
        {status !== 'idle' && (
          <motion.button
            style={styles.resetBtn}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            whileTap={{ scale: 0.93 }}
            onClick={onReset}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.background = 'none'; }}
          >
            <RotateCcw size={13} strokeWidth={2} />
            Reset
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
