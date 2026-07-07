import { useEffect, useState } from 'react';
import ParticleBackground from './ParticleBackground';
import ChessArenaBackground from './ChessArenaBackground';
import './AnimatedBackground.css';

function AnimatedBackground({ turn, inCheck, lastMove, capturedPieces }) {
  const [checkFlash, setCheckFlash] = useState(false);
  const [captureRipple, setCaptureRipple] = useState(null);

  // Check flash effect
  useEffect(() => {
    if (inCheck) {
      setCheckFlash(true);
      const timer = setTimeout(() => setCheckFlash(false), 400);
      return () => clearTimeout(timer);
    }
  }, [inCheck]);

  // Capture ripple effect
  useEffect(() => {
    const totalCaptured = capturedPieces.white.length + capturedPieces.black.length;
    if (totalCaptured > 0 && lastMove) {
      setCaptureRipple({ key: Date.now(), square: lastMove.to });
      const timer = setTimeout(() => setCaptureRipple(null), 800);
      return () => clearTimeout(timer);
    }
  }, [capturedPieces.white.length, capturedPieces.black.length]);

  return (
    <>
      <ChessArenaBackground turn={turn} inCheck={inCheck} />
      <div className="animated-bg">
        <div className="spotlight-vignette"></div>
        <div className="luxury-glow"></div>
        <div className="aura-blob blob-1"></div>
        <div className="aura-blob blob-2"></div>
        <div className="aura-blob blob-3"></div>
        <div className="noise-overlay"></div>

        {/* Turn-based ambient lighting */}
        <div className={`turn-ambient-light ${turn === 'w' ? 'white-turn-glow' : 'black-turn-glow'}`}></div>

        {/* Check flash effect */}
        {checkFlash && <div className="check-flash"></div>}

        {/* Capture ripple effect */}
        {captureRipple && (
          <div
            key={captureRipple.key}
            className="capture-ripple"
          ></div>
        )}
      </div>
      <ParticleBackground />
    </>
  );
}

export default AnimatedBackground;
