import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

function getPrimaryConfig(status, mode) {
  if (status === 'idle'    && mode === 'focus') return { icon: <Play size={17} fill="currentColor" />, label: 'Start to Focus' };
  if (status === 'idle'    && mode === 'break') return { icon: <Play size={17} fill="currentColor" />, label: 'Start Break'    };
  if (status === 'running' && mode === 'break') return { icon: <SkipForward size={17} fill="currentColor" />, label: 'Skip Break' };
  if (status === 'running')                    return { icon: <Pause size={17} fill="currentColor" />, label: 'Pause'          };
  return                                              { icon: <Play size={17} fill="currentColor" />, label: 'Resume'         };
}

export default function TimerControls({ status, mode, onPrimaryAction, onReset }) {
  const { icon, label } = getPrimaryConfig(status, mode);

  const isFocus = mode === 'focus';
  const btnColor    = isFocus ? 'rgba(232,232,240,0.92)' : 'rgba(78,236,200,0.92)';
  const btnBg       = isFocus ? 'rgba(232,232,240,0.10)'  : 'rgba(78,236,200,0.10)';
  const btnBorder   = isFocus ? 'rgba(232,232,240,0.14)'  : 'rgba(78,236,200,0.20)';
  const btnBgHover  = isFocus ? 'rgba(232,232,240,0.16)'  : 'rgba(78,236,200,0.16)';

  return (
    <div className="flex flex-col items-center gap-3.5">
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ background: btnBgHover }}
        onClick={onPrimaryAction}
        className="flex items-center gap-2.5 rounded-full font-display font-semibold text-[17px] tracking-wide outline-none backdrop-blur-sm"
        style={{
          padding: '14px 38px',
          minWidth: 'clamp(180px, 55vw, 220px)',
          justifyContent: 'center',
          background: btnBg,
          color: btnColor,
          border: `1px solid ${btnBorder}`,
          boxShadow: `0 4px 24px rgba(0,0,0,0.28), 0 0 0 1px ${btnBorder}`,
          transition: 'background 0.28s, box-shadow 0.28s, color 0.28s, border-color 0.28s',
        }}
      >
        <motion.span
          key={label}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="flex items-center gap-2.5"
        >
          {icon}
          {label}
        </motion.span>
      </motion.button>

      {/* Reset — appears only once timer has started */}
      <AnimatePresence>
        {status !== 'idle' && (
          <motion.button
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            whileTap={{ scale: 0.93 }}
            onClick={onReset}
            className="flex items-center gap-1.5 bg-transparent border-none text-white/20
                       font-display text-[19px] tracking-wide px-3.5 py-1.5 rounded-lg
                       hover:text-white/45 hover:bg-white/4 transition-colors outline-none cursor-pointer"
          >
            <RotateCcw size={19} strokeWidth={2} />
            Reset
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
