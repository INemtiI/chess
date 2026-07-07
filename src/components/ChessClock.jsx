import { useState, useEffect } from 'react';

function ChessClock({ turn, isGameOver }) {
  const [whiteTime, setWhiteTime] = useState(600); // 10 минут в секундах
  const [blackTime, setBlackTime] = useState(600);

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      if (turn === 'w') {
        setWhiteTime(prev => Math.max(0, prev - 1));
      } else {
        setBlackTime(prev => Math.max(0, prev - 1));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [turn, isGameOver]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="chess-clock">
      <div className={`clock-panel ${turn === 'w' ? 'active' : ''}`}>
        <div className="clock-label">Белые</div>
        <div className="clock-time">{formatTime(whiteTime)}</div>
      </div>
      <div className={`clock-panel ${turn === 'b' ? 'active' : ''}`}>
        <div className="clock-label">Чёрные</div>
        <div className="clock-time">{formatTime(blackTime)}</div>
      </div>
    </div>
  );
}

export default ChessClock;
