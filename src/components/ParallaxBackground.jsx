import { useEffect, useRef, useState } from 'react';
import './ParallaxBackground.css';

function ParallaxBackground() {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 }); // Normalized 0-1
  const currentRef = useRef({ x: 0.5, y: 0.5 }); // Current smoothed position
  const rafRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position to 0-1 range
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };

    const animate = () => {
      // Smooth easing - lerp towards target
      const ease = 0.08;
      currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * ease;
      currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * ease;

      // Calculate offset from center (-0.5 to 0.5 range)
      const offsetX = (currentRef.current.x - 0.5);
      const offsetY = (currentRef.current.y - 0.5);

      // Apply transforms to each layer with different intensities
      const layers = containerRef.current?.querySelectorAll('.parallax-layer');
      layers?.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth || 1);
        const moveX = offsetX * depth * 100; // Max 50px movement at depth 1
        const moveY = offsetY * depth * 100;

        layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="parallax-container">
      {/* Background layer - Perspective grid */}
      <div className="parallax-layer parallax-grid-layer" data-depth="0.15">
        <div className="perspective-grid"></div>
      </div>

      {/* Layer 1 - Deepest (moves most) */}
      <div className="parallax-layer" data-depth="0.6">
        <div className="chess-piece piece-king" style={{ top: '12%', left: '6%' }}>♔</div>
        <div className="chess-piece piece-queen" style={{ top: '65%', right: '8%' }}>♕</div>
        <div className="chess-piece piece-bishop" style={{ top: '80%', left: '15%' }}>♗</div>
      </div>

      {/* Layer 2 - Deep middle */}
      <div className="parallax-layer" data-depth="0.45">
        <div className="chess-piece piece-rook" style={{ top: '22%', right: '12%' }}>♖</div>
        <div className="chess-piece piece-knight" style={{ bottom: '25%', left: '10%' }}>♘</div>
        <div className="chess-piece piece-pawn" style={{ top: '55%', right: '25%' }}>♟</div>
      </div>

      {/* Layer 3 - Middle */}
      <div className="parallax-layer" data-depth="0.3">
        <div className="chess-piece piece-queen" style={{ top: '40%', left: '3%' }}>♕</div>
        <div className="chess-piece piece-rook" style={{ bottom: '10%', right: '18%' }}>♖</div>
        <div className="chess-piece piece-pawn" style={{ top: '75%', right: '5%' }}>♙</div>
      </div>

      {/* Layer 4 - Front (moves least) */}
      <div className="parallax-layer" data-depth="0.18">
        <div className="chess-piece piece-knight" style={{ top: '48%', left: '8%' }}>♘</div>
        <div className="chess-piece piece-bishop" style={{ top: '28%', right: '6%' }}>♗</div>
        <div className="chess-piece piece-pawn" style={{ bottom: '18%', left: '20%' }}>♟</div>
        <div className="chess-piece piece-king" style={{ top: '85%', right: '12%' }}>♔</div>
      </div>
    </div>
  );
}

export default ParallaxBackground;
