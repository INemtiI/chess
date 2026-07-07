const pieceValues = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 0
};

function MaterialBalance({ capturedPieces }) {
  const calculateMaterial = (pieces) => {
    return pieces.reduce((sum, piece) => sum + (pieceValues[piece] || 0), 0);
  };

  const whiteMaterial = calculateMaterial(capturedPieces.white);
  const blackMaterial = calculateMaterial(capturedPieces.black);
  const difference = whiteMaterial - blackMaterial;

  const maxBar = 10; // Максимальная разница для шкалы
  const barPercentage = Math.min(Math.abs(difference) / maxBar * 100, 100);

  return (
    <div className="material-balance">
      <h3 className="material-title">Материал</h3>
      <div className="material-bar-container">
        <div className="material-bar">
          <div
            className={`material-bar-fill ${difference > 0 ? 'white-advantage' : 'black-advantage'}`}
            style={{ width: `${difference > 0 ? 50 + barPercentage / 2 : 50 - barPercentage / 2}%` }}
          />
          <div className="material-center-line" />
        </div>
        <div className="material-labels">
          <span className="material-label white-label">Белые</span>
          <span className="material-difference">
            {difference !== 0 && (
              <span className={difference > 0 ? 'white-advantage' : 'black-advantage'}>
                {difference > 0 ? `+${difference}` : difference}
              </span>
            )}
          </span>
          <span className="material-label black-label">Чёрные</span>
        </div>
      </div>
    </div>
  );
}

export default MaterialBalance;
