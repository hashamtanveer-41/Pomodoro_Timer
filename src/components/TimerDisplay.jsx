import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatTime } from '../utils/format';

export default function TimerDisplay({ secondsLeft, mode, isPaused }) {
  const { mm, ss } = formatTime(secondsLeft);

  const glowColor =
    mode === 'focus'
      ? 'rgba(200,200,255,0.18)'
      : 'rgba(78,236,200,0.18)';

  const textShadow = `0 0 48px ${glowColor}, 0 0 80px ${glowColor}`;

  return (
    <div
      className="absolute flex items-baseline select-none pointer-events-none"
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      {/* Minutes */}
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`mm-${mm}`}
          className="font-light leading-none"
          style={{
            fontSize: 'clamp(52px,16vw,80px)',
            letterSpacing: '0.03em',
            color: 'white',
            textShadow,
            opacity: isPaused ? 0.55 : 1,
            transition: 'opacity 0.3s, text-shadow 0.8s',
          }}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: isPaused ? 0.55 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {mm}
        </motion.span>
      </AnimatePresence>

      {/* Colon */}
      <span
        className={isPaused ? 'animate-colon-blink' : ''}
        style={{
          fontSize: 'clamp(52px,16vw,80px)',
          color: 'white',
          opacity: isPaused ? 0.45 : 0.65,
          margin: '0 1px',
          transition: 'opacity 0.3s',
        }}
      >
        :
      </span>

      {/* Seconds */}
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`ss-${ss}`}
          className="font-light leading-none"
          style={{
            fontSize: 'clamp(52px,16vw,80px)',
            letterSpacing: '0.03em',
            color: 'white',
            textShadow,
            opacity: isPaused ? 0.55 : 1,
            transition: 'opacity 0.3s, text-shadow 0.8s',
          }}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: isPaused ? 0.55 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {ss}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
