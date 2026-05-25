import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ModeLabel({ mode, isPaused }) {
  const label = isPaused ? `${mode.toUpperCase()} · PAUSED` : mode.toUpperCase();
  const color  = mode === 'focus' ? 'rgba(232,232,240,0.55)' : 'rgba(78,236,200,0.6)';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={label}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.28 }}
        className="font-display text-[29px] font-bold uppercase tracking-[0.32em] select-none"
        style={{ color, transition: 'color 0.8s' }}
      >
        {label}
      </motion.div>
    </AnimatePresence>
  );
}
