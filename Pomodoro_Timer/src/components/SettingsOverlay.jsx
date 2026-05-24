import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SPRING = { type: 'spring', damping: 28, stiffness: 300 };

const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.55)',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)',
    zIndex: 40,
  },
  drawer: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: 'clamp(280px, 85vw, 300px)',
    background: 'linear-gradient(160deg, #0f1523 0%, #080d18 100%)',
    borderRight: '1px solid rgba(255,255,255,0.07)',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    padding: '0 0 32px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '22px 24px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    flexShrink: 0,
  },
  headerTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 12,
    letterSpacing: '0.2em',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: 6,
    borderRadius: 8,
    display: 'flex',
    transition: 'color 0.18s, background 0.18s',
  },
  content: {
    flex: 1,
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 36,
  },
  stepperGroup: {},
  stepperLabel: {
    fontFamily: 'var(--font-display)',
    fontSize: 10,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: 14,
    display: 'block',
  },
  stepperRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  stepBtn: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.04)',
    color: 'var(--text-primary)',
    fontSize: 20,
    lineHeight: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.18s, border-color 0.18s',
    flexShrink: 0,
  },
  stepValue: {
    fontFamily: 'var(--font-mono)',
    fontSize: 34,
    fontWeight: 300,
    color: 'var(--text-primary)',
    minWidth: 52,
    textAlign: 'center',
  },
  stepUnit: {
    fontFamily: 'var(--font-display)',
    fontSize: 12,
    color: 'var(--text-dim)',
    letterSpacing: '0.08em',
  },
  disabledNotice: {
    marginTop: 'auto',
    padding: '12px 14px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.05)',
  },
  disabledText: {
    fontSize: 12,
    color: 'var(--text-dim)',
    fontFamily: 'var(--font-display)',
    lineHeight: 1.55,
  },
  divider: {
    height: 1,
    background: 'rgba(255,255,255,0.05)',
    margin: '0 24px',
  },
};

function Stepper({ label, value, onChange, isIdle }) {
  return (
    <div style={styles.stepperGroup}>
      <span style={styles.stepperLabel}>{label}</span>
      <div style={styles.stepperRow}>
        <motion.button
          whileTap={{ scale: 0.88 }}
          style={{ ...styles.stepBtn, opacity: isIdle ? 1 : 0.3, cursor: isIdle ? 'pointer' : 'not-allowed' }}
          onClick={() => isIdle && onChange(value - 1)}
          onMouseEnter={(e) => isIdle && (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
        >
          −
        </motion.button>

        <motion.span
          key={value}
          style={styles.stepValue}
          initial={{ opacity: 0.4, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {value}
        </motion.span>

        <motion.button
          whileTap={{ scale: 0.88 }}
          style={{ ...styles.stepBtn, opacity: isIdle ? 1 : 0.3, cursor: isIdle ? 'pointer' : 'not-allowed' }}
          onClick={() => isIdle && onChange(value + 1)}
          onMouseEnter={(e) => isIdle && (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
        >
          +
        </motion.button>

        <span style={styles.stepUnit}>min</span>
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
            style={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            style={styles.drawer}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={SPRING}
          >
            {/* Header */}
            <div style={styles.header}>
              <span style={styles.headerTitle}>Settings</span>
              <button
                style={styles.closeBtn}
                onClick={onClose}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <X size={17} strokeWidth={2.2} />
              </button>
            </div>

            {/* Steppers */}
            <div style={styles.content}>
              <Stepper
                label="Focus Duration"
                value={focusMins}
                onChange={(v) => onFocusChange(Math.max(1, Math.min(90, v)))}
                isIdle={isIdle}
              />
              <div style={styles.divider} />
              <Stepper
                label="Break Duration"
                value={breakMins}
                onChange={(v) => onBreakChange(Math.max(1, Math.min(30, v)))}
                isIdle={isIdle}
              />

              {!isIdle && (
                <div style={styles.disabledNotice}>
                  <p style={styles.disabledText}>
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
