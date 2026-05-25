import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock } from 'lucide-react';

const SPRING = { type: 'spring', damping: 28, stiffness: 300 };

export default function HistoryOverlay({ open, onClose, history }) {
  const totalMins = history.reduce((acc, e) => acc + parseInt(e.duration), 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/55 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 flex flex-col
                       w-[clamp(280px,85vw,320px)]
                       bg-gradient-to-br from-[#0f1523] to-[#080d18]
                       border-l border-white/[0.07]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={SPRING}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-[22px] border-b border-white/5 shrink-0">
              <span className="font-display text-[12px] tracking-[0.2em] font-bold uppercase text-white/45">
                Today's Sessions
              </span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-white/45 hover:text-white hover:bg-white/[0.06] transition-colors flex"
              >
                <X size={17} strokeWidth={2.2} />
              </button>
            </div>

            {/* Content */}
            {history.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3.5 px-7 text-white/20">
                <div className="w-12 h-12 rounded-full border border-white/[0.07] flex items-center justify-center">
                  <Clock size={20} strokeWidth={1.5} />
                </div>
                <p className="font-display text-[13px] text-center leading-relaxed">
                  No sessions yet today.<br />Start focusing!
                </p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto">
                  <p className="font-display text-[10px] tracking-[0.14em] uppercase text-white/20 px-6 pt-3 pb-3.5">
                    {history.length} session{history.length !== 1 ? 's' : ''} completed
                  </p>
                  <AnimatePresence initial={false}>
                    {[...history].reverse().map((entry, i) => (
                      <motion.div
                        key={entry.id}
                        className="flex items-center gap-3 px-6 py-3 border-b border-white/[0.04]"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.28 }}
                      >
                        <span className="text-[#4eecc8] text-[11px] font-semibold shrink-0">✓</span>
                        <span className="font-mono text-[13px] text-white flex-1">
                          {entry.duration}
                          <span className="font-display text-[10px] tracking-widest uppercase text-white/20 ml-1.5">
                            focus
                          </span>
                        </span>
                        <span className="font-mono text-[11px] text-white/45 shrink-0">
                          {entry.time}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="px-6 py-3.5 border-t border-white/5 shrink-0">
                  <span className="font-display text-[11px] text-white/20 tracking-wide">
                    {totalMins} min focused today
                  </span>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
