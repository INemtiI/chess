function Controls({ onNewGame, onUndo, onFlip, onToggleAutoFlip, autoFlip, canUndo }) {
  return (
    <div className="controls">
      <button className="control-btn primary" onClick={onNewGame}>
        Новая игра
      </button>
      <button className="control-btn secondary" onClick={onUndo} disabled={!canUndo}>
        Отменить ход
      </button>
      <button className="control-btn secondary" onClick={onFlip}>
        Перевернуть доску
      </button>
      <button
        className={`control-btn ${autoFlip ? 'primary' : 'secondary'}`}
        onClick={onToggleAutoFlip}
      >
        {autoFlip ? 'Автоповорот: ВКЛ' : 'Автоповорот: ВЫКЛ'}
      </button>
    </div>
  );
}

export default Controls;
