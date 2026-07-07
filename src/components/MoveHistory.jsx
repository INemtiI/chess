import { useEffect, useRef } from 'react';

function MoveHistory({ moves }) {
  const historyRef = useRef(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [moves]);

  const pairMoves = () => {
    const pairs = [];
    for (let i = 0; i < moves.length; i += 2) {
      pairs.push({
        number: Math.floor(i / 2) + 1,
        white: moves[i],
        black: moves[i + 1] || ''
      });
    }
    return pairs;
  };

  const movePairs = pairMoves();

  return (
    <div className="move-history">
      <h3 className="history-title">История ходов</h3>
      <div className="history-scroll" ref={historyRef}>
        {movePairs.length === 0 ? (
          <div className="empty-history">Пока нет ходов</div>
        ) : (
          <table className="history-table">
            <tbody>
              {movePairs.map((pair, idx) => (
                <tr key={idx} className={idx === movePairs.length - 1 ? 'last-move' : ''}>
                  <td className="move-number">{pair.number}.</td>
                  <td className="move-notation">{pair.white}</td>
                  <td className="move-notation">{pair.black}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MoveHistory;
