import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ModeLabel({ mode, isPaused }) {
  const accentColor = mode === 'focus' ? 'rgba(232,232,240,0.55)' : 'rgba(78,236,200,0.6)';
  const label = isPaused ? `${mode.toUpperCase()} · PAUSED` : mode.toUpperCase();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={label}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 11,
          letterSpacing: '0.32em',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: accentColor,
          transition: 'color 0.8s',
          userSelect: 'none',
        }}
      >
        {label}
      </motion.div>
    </AnimatePresence>
  );
}
