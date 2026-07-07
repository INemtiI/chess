function Controls({ onNewGame, onUndo, onFlip, onToggleAutoFlip, autoFlip, canUndo }) {
  return (
    <div className="controls">
      <button className="control-btn primary" onClick={onNewGame}>
        <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M2 12h20"/>
        </svg>
        Новая игра
      </button>

      <div className="control-group">
        <button className="control-btn secondary" onClick={onUndo} disabled={!canUndo}>
          <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7v6h6M21 17v-6h-6"/>
            <path d="M3 13a9 9 0 0 1 9-9 9 9 0 0 1 6.364 2.636M21 11a9 9 0 0 1-9 9 9 9 0 0 1-6.364-2.636"/>
          </svg>
          Отменить ход
        </button>

        <button className="control-btn secondary" onClick={onFlip}>
          <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M2 12h20"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          Перевернуть доску
        </button>
      </div>

      <button
        className={`control-btn toggle ${autoFlip ? 'active' : ''}`}
        onClick={onToggleAutoFlip}
      >
        <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21.5 2v6h-6M2.5 22v-6h6"/>
          <path d="M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
        </svg>
        Автоповорот
        <span className={`toggle-indicator ${autoFlip ? 'on' : 'off'}`}>
          {autoFlip ? 'ВКЛ' : 'ВЫКЛ'}
        </span>
      </button>
    </div>
  );
}

export default Controls;
