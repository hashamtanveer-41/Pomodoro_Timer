import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock } from 'lucide-react';

const SPRING = {
  type: 'spring', damping: 28, stiffness: 300
};

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
    right: 0,
    bottom: 0,
    width: 'clamp(280px, 85vw, 320px)',
    background: 'linear-gradient(160deg, #0f1523 0%, #080d18 100%)',
    borderLeft: '1px solid rgba(255,255,255,0.07)',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
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
  emptyState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    padding: '0 28px',
    color: 'var(--text-dim)',
  },
  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.07)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: 'var(--font-display)',
    fontSize: 13,
    color: 'var(--text-dim)',
    textAlign: 'center',
    lineHeight: 1.65,
  },
  listContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '8px 0',
  },
  countLabel: {
    fontFamily: 'var(--font-display)',
    fontSize: 10,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--text-dim)',
    padding: '10px 24px 14px',
  },
  entry: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 24px',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
  },
  checkmark: {
    fontSize: 11,
    color: 'var(--break-accent)',
    flexShrink: 0,
    fontWeight: 600,
  },
  entryDuration: {
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    color: 'var(--text-primary)',
    flex: 1,
  },
  entryLabel: {
    fontFamily: 'var(--font-display)',
    fontSize: 10,
    color: 'var(--text-dim)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginLeft: 4,
  },
  entryTime: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--text-muted)',
    flexShrink: 0,
  },
  footer: {
    padding: '14px 24px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    flexShrink: 0,
  },
  footerText: {
    fontFamily: 'var(--font-display)',
    fontSize: 11,
    color: 'var(--text-dim)',
    letterSpacing: '0.06em',
  },
};

export default function HistoryOverlay({ open, onClose, history }) {
  const totalFocusMinutes = history.reduce((acc, e) => {
    const [m] = e.duration.split(':').map(Number);
    return acc + m;
  }, 0);

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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={SPRING}
          >
            {/* Header */}
            <div style={styles.header}>
              <span style={styles.headerTitle}>Today's Sessions</span>
              <button
                style={styles.closeBtn}
                onClick={onClose}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <X size={17} strokeWidth={2.2} />
              </button>
            </div>

            {/* Content */}
            {history.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>
                  <Clock size={20} strokeWidth={1.5} />
                </div>
                <p style={styles.emptyText}>
                  No sessions yet today.<br />Start focusing!
                </p>
              </div>
            ) : (
              <>
                <div style={styles.listContainer}>
                  <div style={styles.countLabel}>
                    {history.length} session{history.length !== 1 ? 's' : ''} completed
                  </div>

                  <AnimatePresence initial={false}>
                    {[...history].reverse().map((entry, i) => (
                      <motion.div
                        key={entry.id}
                        style={styles.entry}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.045, duration: 0.3 }}
                      >
                        <span style={styles.checkmark}>✓</span>
                        <span style={styles.entryDuration}>
                          {entry.duration}
                          <span style={styles.entryLabel}>focus</span>
                        </span>
                        <span style={styles.entryTime}>{entry.time}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer summary */}
                <div style={styles.footer}>
                  <span style={styles.footerText}>
                    {totalFocusMinutes} min focused today
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
