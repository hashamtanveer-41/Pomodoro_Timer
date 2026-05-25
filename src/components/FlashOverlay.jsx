import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FlashOverlay({ show, mode }) {
  const color =
    mode === 'focus' ? 'rgba(210,210,255,1)' : 'rgba(78,236,200,1)';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-30"
          style={{ background: color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.16, 0] }}
          transition={{ duration: 0.85, times: [0, 0.25, 1] }}
        />
      )}
    </AnimatePresence>
  );
}
