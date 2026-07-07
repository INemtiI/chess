const pieceSymbols = {
  wp: '♙', wn: '♘', wb: '♗', wr: '♖', wq: '♕', wk: '♔',
  bp: '♟', bn: '♞', bb: '♝', br: '♜', bq: '♛', bk: '♚'
};

function Piece({ type, color }) {
  const pieceKey = color + type;
  const symbol = pieceSymbols[pieceKey];

  return (
    <div className={`piece ${color === 'w' ? 'white-piece' : 'black-piece'}`}>
      {symbol}
    </div>
  );
}

export default Piece;
