const pieceNames = {
  p: 'pawn',
  n: 'knight',
  b: 'bishop',
  r: 'rook',
  q: 'queen',
  k: 'king'
};

function Piece({ type, color }) {
  const pieceName = pieceNames[type];
  const colorName = color === 'w' ? 'white' : 'black';
  const svgId = `${pieceName}-${colorName}`;

  return (
    <div className={`piece ${colorName}-piece`}>
      <svg className="piece-svg" viewBox="0 0 45 45">
        <use href={`/chess/chess-pieces.svg#${svgId}`} />
      </svg>
    </div>
  );
}

export default Piece;
