const pieceSymbols = {
  p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚'
};

function CapturedPieces({ captured }) {
  return (
    <div className="captured-pieces">
      <div className="captured-section">
        <h4 className="captured-title">Белые взяли:</h4>
        <div className="captured-list">
          {captured.white.length === 0 ? (
            <span className="empty-captured">—</span>
          ) : (
            captured.white.map((piece, idx) => (
              <span key={idx} className="captured-piece black-piece">
                {pieceSymbols[piece]}
              </span>
            ))
          )}
        </div>
      </div>
      <div className="captured-section">
        <h4 className="captured-title">Чёрные взяли:</h4>
        <div className="captured-list">
          {captured.black.length === 0 ? (
            <span className="empty-captured">—</span>
          ) : (
            captured.black.map((piece, idx) => (
              <span key={idx} className="captured-piece white-piece">
                {pieceSymbols[piece]}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CapturedPieces;
