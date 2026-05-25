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
        className="select-none font-[var(--font-display)] text-[25px] font-bold uppercase tracking-[0.32em] transition-colors duration-[800ms]"
        style={{ color: accentColor }}
      >
        {label}
      </motion.div>
    </AnimatePresence>
  );
}
