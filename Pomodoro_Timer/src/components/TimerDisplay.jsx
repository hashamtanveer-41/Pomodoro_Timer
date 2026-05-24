import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatTime } from '../utils/format';

export default function TimerDisplay({ secondsLeft, mode, isPaused }) {
  const { mm, ss } = formatTime(secondsLeft);

  const glowColor =
    mode === 'focus'
      ? 'rgba(200, 200, 255, 0.18)'
      : 'rgba(78, 236, 200, 0.18)';

  const styles = {
    wrapper: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'baseline',
      gap: 0,
      userSelect: 'none',
      pointerEvents: 'none',
    },
    digits: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 300,
      fontSize: 'clamp(52px, 16vw, 80px)',
      letterSpacing: '0.03em',
      color: 'var(--text-primary)',
      lineHeight: 1,
      textShadow: `0 0 48px ${glowColor}, 0 0 80px ${glowColor}`,
      transition: 'text-shadow 0.8s',
      opacity: isPaused ? 0.55 : 1,
    },
    colon: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 300,
      fontSize: 'clamp(52px, 16vw, 80px)',
      color: 'var(--text-primary)',
      lineHeight: 1,
      opacity: isPaused ? 0.3 : 0.65,
      margin: '0 1px',
      transition: 'opacity 0.3s',
      animation: isPaused ? 'colonBlink 1.1s ease-in-out infinite' : 'none',
    },
  };

  return (
    <>
      <style>{`
        @keyframes colonBlink {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 0.15; }
        }
      `}</style>
      <div style={styles.wrapper}>
        {/* Minutes */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={`mm-${mm}`}
            style={styles.digits}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: isPaused ? 0.55 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {mm}
          </motion.span>
        </AnimatePresence>

        <span style={styles.colon}>:</span>

        {/* Seconds */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={`ss-${ss}`}
            style={styles.digits}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: isPaused ? 0.55 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {ss}
          </motion.span>
        </AnimatePresence>
      </div>
    </>
  );
}
