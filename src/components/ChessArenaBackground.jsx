import { useEffect, useRef } from 'react';
import './ChessArenaBackground.css';

function ChessArenaBackground({ turn, inCheck }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const currentMouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };

    const drawChessPiece = (x, y, size, type, opacity, parallaxOffsetX, parallaxOffsetY) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.font = `${size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Create gradient for piece - color based on turn
      const gradient = ctx.createLinearGradient(x, y - size / 2, x, y + size / 2);
      if (turn === 'w') {
        gradient.addColorStop(0, 'rgba(243, 156, 18, 0.15)');
        gradient.addColorStop(0.5, 'rgba(243, 156, 18, 0.08)');
        gradient.addColorStop(1, 'rgba(243, 156, 18, 0.03)');
      } else {
        gradient.addColorStop(0, 'rgba(107, 159, 216, 0.15)');
        gradient.addColorStop(0.5, 'rgba(107, 159, 216, 0.08)');
        gradient.addColorStop(1, 'rgba(107, 159, 216, 0.03)');
      }

      ctx.fillStyle = gradient;
      ctx.fillText(type, x + parallaxOffsetX, y + parallaxOffsetY);
      ctx.restore();
    };

    const drawPerspectiveGrid = (time) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.6;
      const gridSize = 8;
      const squareSize = 80;
      const perspective = 0.7;

      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = 'rgba(243, 156, 18, 0.3)';
      ctx.lineWidth = 1;

      // Draw horizontal lines
      for (let i = 0; i <= gridSize; i++) {
        const y = i * squareSize;
        const depth = y * perspective;
        const width = canvas.width * 0.6 * (1 - depth / (canvas.height * 0.8));

        const startX = centerX - width / 2;
        const endX = centerX + width / 2;
        const posY = centerY + depth;

        if (posY < canvas.height) {
          ctx.beginPath();
          ctx.moveTo(startX, posY);
          ctx.lineTo(endX, posY);
          ctx.stroke();
        }
      }

      // Draw vertical lines
      for (let i = 0; i <= gridSize; i++) {
        const x = (i - gridSize / 2) * squareSize;

        ctx.beginPath();
        ctx.moveTo(centerX + x * 0.2, centerY);

        const endDepth = gridSize * squareSize * perspective;
        const endWidth = canvas.width * 0.6 * (1 - endDepth / (canvas.height * 0.8));
        const endX = centerX + (x / (gridSize * squareSize * 2)) * endWidth;
        const endY = centerY + endDepth;

        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawSpotlight = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.45;

      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, canvas.width * 0.5
      );

      // Dynamic spotlight based on turn and check
      if (inCheck) {
        gradient.addColorStop(0, 'rgba(220, 38, 38, 0.12)');
        gradient.addColorStop(0.3, 'rgba(220, 38, 38, 0.06)');
        gradient.addColorStop(0.6, 'rgba(220, 38, 38, 0.02)');
      } else if (turn === 'w') {
        gradient.addColorStop(0, 'rgba(243, 156, 18, 0.10)');
        gradient.addColorStop(0.3, 'rgba(243, 156, 18, 0.05)');
        gradient.addColorStop(0.6, 'rgba(232, 139, 62, 0.02)');
      } else {
        gradient.addColorStop(0, 'rgba(107, 159, 216, 0.10)');
        gradient.addColorStop(0.3, 'rgba(107, 159, 216, 0.05)');
        gradient.addColorStop(0.6, 'rgba(52, 152, 219, 0.02)');
      }
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationTime += 0.01;

      // Smooth mouse parallax
      const ease = 0.08;
      currentMouseRef.current.x += (mouseRef.current.x - currentMouseRef.current.x) * ease;
      currentMouseRef.current.y += (mouseRef.current.y - currentMouseRef.current.y) * ease;

      const offsetX = (currentMouseRef.current.x - 0.5);
      const offsetY = (currentMouseRef.current.y - 0.5);

      // Draw spotlight effect
      drawSpotlight();

      // Draw perspective grid
      drawPerspectiveGrid(animationTime);

      // Draw floating chess piece silhouettes with parallax
      const pieces = [
        { char: '♔', x: 0.15, y: 0.25, size: 300, speed: 0.3, phase: 0, depth: 0.5 },
        { char: '♕', x: 0.85, y: 0.35, size: 280, speed: 0.25, phase: Math.PI, depth: 0.5 },
        { char: '♘', x: 0.25, y: 0.65, size: 250, speed: 0.35, phase: Math.PI * 0.5, depth: 0.35 },
        { char: '♖', x: 0.75, y: 0.7, size: 220, speed: 0.28, phase: Math.PI * 1.5, depth: 0.35 },
      ];

      pieces.forEach(piece => {
        const x = canvas.width * piece.x;
        const y = canvas.height * piece.y + Math.sin(animationTime * piece.speed + piece.phase) * 20;
        const opacity = 0.03 + Math.sin(animationTime * 0.5 + piece.phase) * 0.02;

        // Parallax effect - deeper pieces move more
        const parallaxX = offsetX * piece.depth * 80;
        const parallaxY = offsetY * piece.depth * 80;

        drawChessPiece(x, y, piece.size, piece.char, opacity, parallaxX, parallaxY);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [turn, inCheck]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="chess-arena-canvas"
      />
      <div className="chess-arena-gradient-layers">
        <div className="gradient-layer layer-1"></div>
        <div className="gradient-layer layer-2"></div>
        <div className="gradient-layer layer-3"></div>
      </div>
    </>
  );
}

export default ChessArenaBackground;
