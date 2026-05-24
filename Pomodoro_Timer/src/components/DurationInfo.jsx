import React from 'react';

export default function DurationInfo({ focusMins, breakMins, mode }) {
  const focusActive = mode === 'focus';
  const breakActive = mode === 'break';

  const styles = {
    row: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    pill: (active, color) => ({
      color: active ? color : 'var(--text-dim)',
      transition: 'color 0.5s',
    }),
    sep: {
      color: 'rgba(255,255,255,0.1)',
      fontSize: 9,
    },
  };

  return (
    <div style={styles.row}>
      <span style={styles.pill(focusActive, 'rgba(232,232,240,0.45)')}>
        Focus · {focusMins}m
      </span>
      <span style={styles.sep}>●</span>
      <span style={styles.pill(breakActive, 'rgba(78,236,200,0.55)')}>
        Break · {breakMins}m
      </span>
    </div>
  );
}
