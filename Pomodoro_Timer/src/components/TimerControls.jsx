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

  return (
    <div className="flex flex-col items-center gap-[14px]">
      {/* Primary CTA */}
      <motion.button
        className="flex min-w-[clamp(180px,_55vw,_220px)] items-center justify-center gap-[10px] rounded-[50px] border px-[38px] py-[14px] font-[var(--font-display)] text-[15px] font-semibold tracking-[0.04em] backdrop-blur-[8px] transition-[background,_box-shadow,_color,_border-color] duration-[280ms] focus:outline-none cursor-pointer"
        style={{
          background: btnBg,
          borderColor: btnBorder,
          color: accentColor,
          boxShadow: `0 4px 24px rgba(0,0,0,0.28), 0 0 0 1px ${btnBorder}`,
          WebkitBackdropFilter: 'blur(8px)',
        }}
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
          className="flex items-center gap-[10px]"
        >
          {icon}
          {label}
        </motion.span>
      </motion.button>

      {/* Reset — only visible once timer has started */}
      <AnimatePresence>
        {status !== 'idle' && (
          <motion.button
            className="flex items-center gap-[7px] rounded-[8px] bg-transparent px-[14px] py-[6px] font-[var(--font-display)] text-[12px] tracking-[0.08em] text-[var(--text-dim)] transition-colors duration-[180ms] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--text-muted)] focus:outline-none cursor-pointer"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            whileTap={{ scale: 0.93 }}
            onClick={onReset}
          >
            <RotateCcw size={13} strokeWidth={2} />
            Reset
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
