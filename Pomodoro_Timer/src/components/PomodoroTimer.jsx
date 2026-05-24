import React from 'react';
import { motion } from 'framer-motion';
import { usePomodoroContext } from '../context/PomodoroContext';
import TimerRing    from './TimerRing';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import ModeLabel    from './ModeLabel';
import DurationInfo from './DurationInfo';
import FlashOverlay from './FlashOverlay';

const BG = {
  focus: 'radial-gradient(ellipse 90% 65% at 50% 25%, #101828 0%, #080c14 55%, #040609 100%)',
  break: 'radial-gradient(ellipse 90% 65% at 50% 25%, #071e1e 0%, #040e10 55%, #020708 100%)',
};

export default function PomodoroTimer() {
  const {
    focusMins, breakMins,
    mode, status,
    secondsLeft, progress,
    isRunning, isPaused,
    flash, completePulse,
    startPauseResume, skipBreak, reset,
  } = usePomodoroContext();

  const handlePrimary = () => {
    if (isRunning && mode === 'break') skipBreak();
    else startPauseResume();
  };

  return (
    <>
      <FlashOverlay show={flash} mode={mode} />

      <motion.div
        animate={{ background: BG[mode] }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="flex-1 flex flex-col items-center justify-center pt-0 pr-5 pb-6 relative min-h-0"
      >
        {/* Mode label */}
        <div style={{ marginBottom: 22 }}>
          <ModeLabel mode={mode} isPaused={isPaused} />
        </div>

        {/* Ring + digits */}
        <div
            className="relative flex items-center justify-center mb-36"
        >
          <TimerRing
            progress={progress}
            mode={mode}
            isRunning={isRunning}
            isPaused={isPaused}
            completePulse={completePulse}
          />
          <TimerDisplay
            secondsLeft={secondsLeft}
            mode={mode}
            isPaused={isPaused}
          />
        </div>

        {/* Controls */}
        <TimerControls
          status={status}
          mode={mode}
          onPrimaryAction={handlePrimary}
          onReset={reset}
        />

        {/* Duration summary */}
        <div
            style={{ marginTop: 28 }}
        >
          <DurationInfo focusMins={focusMins} breakMins={breakMins} mode={mode} />
        </div>
      </motion.div>
    </>
  );
}
