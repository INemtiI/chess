import { useEffect, useRef } from 'react';
import './ChessArenaBackground.css';

function ChessArenaBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawChessPiece = (x, y, size, type, opacity) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.font = `${size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Create gradient for piece
      const gradient = ctx.createLinearGradient(x, y - size / 2, x, y + size / 2);
      gradient.addColorStop(0, 'rgba(243, 156, 18, 0.15)');
      gradient.addColorStop(0.5, 'rgba(243, 156, 18, 0.08)');
      gradient.addColorStop(1, 'rgba(243, 156, 18, 0.03)');

      ctx.fillStyle = gradient;
      ctx.fillText(type, x, y);
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

      gradient.addColorStop(0, 'rgba(243, 156, 18, 0.08)');
      gradient.addColorStop(0.3, 'rgba(243, 156, 18, 0.04)');
      gradient.addColorStop(0.6, 'rgba(52, 152, 219, 0.02)');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationTime += 0.01;

      // Draw spotlight effect
      drawSpotlight();

      // Draw perspective grid
      drawPerspectiveGrid(animationTime);

      // Draw floating chess piece silhouettes
      const pieces = [
        { char: '♔', x: 0.15, y: 0.25, size: 300, speed: 0.3, phase: 0 },
        { char: '♕', x: 0.85, y: 0.35, size: 280, speed: 0.25, phase: Math.PI },
        { char: '♘', x: 0.25, y: 0.65, size: 250, speed: 0.35, phase: Math.PI * 0.5 },
        { char: '♖', x: 0.75, y: 0.7, size: 220, speed: 0.28, phase: Math.PI * 1.5 },
      ];

      pieces.forEach(piece => {
        const x = canvas.width * piece.x;
        const y = canvas.height * piece.y + Math.sin(animationTime * piece.speed + piece.phase) * 20;
        const opacity = 0.03 + Math.sin(animationTime * 0.5 + piece.phase) * 0.02;
        drawChessPiece(x, y, piece.size, piece.char, opacity);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

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
