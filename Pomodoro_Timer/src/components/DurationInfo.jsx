import React from 'react';

export default function DurationInfo({ focusMins, breakMins, mode }) {
  return (
    <div className="flex items-center gap-5 font-display text-[11px] tracking-widest uppercase">
      <span
        className="transition-colors duration-500"
        style={{ color: mode === 'focus' ? 'rgba(232,232,240,0.45)' : 'rgba(255,255,255,0.2)' }}
      >
        Focus · {focusMins}m
      </span>
      <span className="text-[9px] text-white/10">●</span>
      <span
        className="transition-colors duration-500"
        style={{ color: mode === 'break' ? 'rgba(78,236,200,0.55)' : 'rgba(255,255,255,0.2)' }}
      >
        Break · {breakMins}m
      </span>
    </div>
  );
}
