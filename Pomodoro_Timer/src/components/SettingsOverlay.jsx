import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SPRING = { type: 'spring', damping: 28, stiffness: 300 };

function Stepper({ label, value, onChange, isIdle }) {
  return (
    <div>
      <span className="block font-display text-[10px] tracking-[0.18em] uppercase text-white/45 mb-3.5">
        {label}
      </span>
      <div className="flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => isIdle && onChange(value - 1)}
          className={`w-[38px] h-[38px] rounded-full border border-white/10 bg-white/[0.04]
                      text-white text-xl flex items-center justify-center transition-colors
                      ${isIdle ? 'cursor-pointer hover:bg-white/[0.09]' : 'opacity-30 cursor-not-allowed'}`}
        >
          −
        </motion.button>

        <motion.span
          key={value}
          initial={{ opacity: 0.4, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="font-mono text-[34px] font-light text-white min-w-[52px] text-center"
        >
          {value}
        </motion.span>

        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => isIdle && onChange(value + 1)}
          className={`w-[38px] h-[38px] rounded-full border border-white/10 bg-white/[0.04]
                      text-white text-xl flex items-center justify-center transition-colors
                      ${isIdle ? 'cursor-pointer hover:bg-white/[0.09]' : 'opacity-30 cursor-not-allowed'}`}
        >
          +
        </motion.button>

        <span className="font-display text-[12px] text-white/20 tracking-wide">min</span>
      </div>
    </div>
  );
}

export default function SettingsOverlay({ open, onClose, focusMins, breakMins, onFocusChange, onBreakChange, isIdle }) {
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
            className="fixed top-0 left-0 bottom-0 z-50 flex flex-col
                       w-[clamp(280px,85vw,300px)]
                       bg-gradient-to-br from-[#0f1523] to-[#080d18]
                       border-r border-white/[0.07]"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={SPRING}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-[22px] border-b border-white/5 shrink-0">
              <span className="font-display text-[12px] tracking-[0.2em] font-bold uppercase text-white/45">
                Settings
              </span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-white/45 hover:text-white hover:bg-white/[0.06] transition-colors flex"
              >
                <X size={17} strokeWidth={2.2} />
              </button>
            </div>

            {/* Steppers */}
            <div className="flex-1 flex flex-col gap-9 px-6 py-8">
              <Stepper
                label="Focus Duration"
                value={focusMins}
                onChange={(v) => onFocusChange(Math.max(1, Math.min(90, v)))}
                isIdle={isIdle}
              />
              <div className="h-px bg-white/5" />
              <Stepper
                label="Break Duration"
                value={breakMins}
                onChange={(v) => onBreakChange(Math.max(1, Math.min(30, v)))}
                isIdle={isIdle}
              />

              {!isIdle && (
                <div className="mt-auto p-3.5 bg-white/[0.03] rounded-lg border border-white/5">
                  <p className="font-display text-[12px] text-white/20 leading-relaxed">
                    Reset the timer to change durations.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
