import React from 'react';
import { motion } from 'framer-motion';

const SIZE       = 320;
const CX         = 160;
const CY         = 160;
const R          = 132;          // arc radius
const OUTER_R    = 149;          // dots radius
const DOT_COUNT  = 72;
const DOT_RADIUS = 1.8;

export default function TimerRing({ progress, mode, isRunning, isPaused, completePulse }) {
  const circumference = 2 * Math.PI * R;
  const filled        = circumference * (1 - progress);   // how much arc is "consumed"
  const remaining     = circumference - filled;

  const accentColor = mode === 'focus' ? '#e8e8f0' : '#4eecc8';
  const glowColor   = mode === 'focus' ? 'rgba(200,200,255,0.22)' : 'rgba(78,236,200,0.22)';

  // Build dot positions
  const dots = Array.from({ length: DOT_COUNT }, (_, i) => {
    const angle  = (i / DOT_COUNT) * 2 * Math.PI - Math.PI / 2;
    const active = i / DOT_COUNT <= (1 - progress);
    return {
      x:      CX + OUTER_R * Math.cos(angle),
      y:      CY + OUTER_R * Math.sin(angle),
      active,
    };
  });

  return (
    <motion.div
      animate={
        completePulse
          ? { scale: [1, 1.06, 0.98, 1] }
          : isPaused
          ? { opacity: [1, 0.55, 1] }
          : { scale: 1, opacity: 1 }
      }
      transition={
        completePulse
          ? { duration: 0.55, ease: 'easeOut' }
          : isPaused
          ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.3 }
      }
      style={{
        position: 'relative',
        width: SIZE,
        height: SIZE,
        maxWidth: '88vw',
        maxHeight: '88vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width="100%"
        height="100%"
        style={{ overflow: 'visible', display: 'block' }}
      >
        <defs>
          <filter id="arc-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="soft-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Subtle background circle track */}
        <circle
          cx={CX} cy={CY} r={R}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1.5"
        />

        {/* Outer decorative dots */}
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={DOT_RADIUS}
            fill={d.active ? accentColor : 'rgba(255,255,255,0.13)'}
            opacity={d.active ? 0.88 : 0.3}
            style={{ transition: 'fill 0.5s, opacity 0.5s' }}
          />
        ))}

        {/* Wide soft glow arc (behind the main arc) */}
        {(isRunning || isPaused) && (
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke={glowColor}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${remaining}`}
            strokeDashoffset={circumference * 0.25}
            opacity={isPaused ? 0.3 : 0.55}
            filter="url(#soft-glow)"
            style={{ transition: 'stroke-dasharray 1.05s linear, opacity 0.5s, stroke 0.8s' }}
          />
        )}

        {/* Main progress arc */}
        <circle
          cx={CX} cy={CY} r={R}
          fill="none"
          stroke={accentColor}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${remaining}`}
          strokeDashoffset={circumference * 0.25}
          opacity={isPaused ? 0.38 : 0.95}
          filter="url(#arc-glow)"
          style={{ transition: 'stroke-dasharray 1.05s linear, opacity 0.55s, stroke 0.8s' }}
        />
      </svg>
    </motion.div>
  );
}
