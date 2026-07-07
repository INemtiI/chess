function LastMoveCard({ lastMove, moveHistory }) {
  if (!lastMove || moveHistory.length === 0) return null;

  const lastMoveNotation = moveHistory[moveHistory.length - 1];
  const player = moveHistory.length % 2 === 0 ? 'Чёрные' : 'Белые';
  const moveNumber = Math.ceil(moveHistory.length / 2);

  return (
    <div className="last-move-card">
      <div className="last-move-header">
        <span className="last-move-label">Последний ход</span>
        <span className="last-move-number">#{moveNumber}</span>
      </div>
      <div className="last-move-content">
        <span className="last-move-player">{player}:</span>
        <span className="last-move-notation">{lastMoveNotation}</span>
      </div>
      <div className="last-move-squares">
        <span className="move-square from">{lastMove.from}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
        <span className="move-square to">{lastMove.to}</span>
      </div>
    </div>
  );
}

export default LastMoveCard;
