import React from 'react';
import { History, Trash2, BookOpen } from 'lucide-react';
import { PERSONALITIES } from '../utils/calculatorLogic';

export default function SidePanel({ commentary, currentMode, history, onClearHistory, onSelectHistoryItem }) {
  const currentPersonality = PERSONALITIES[currentMode.toUpperCase()] || PERSONALITIES.IDIOT;

  return (
    <div className="side-panel">
      {/* Commentary Bubble */}
      <div className="commentary-bubble">
        <div className="avatar-icon">
          🤖
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-yellow)', letterSpacing: '1px', marginBottom: '2px' }}>
            {currentPersonality.name} Says:
          </div>
          <div className="commentary-text">
            "{commentary || 'Go ahead, type a math problem. I promise I will try my worst.'}"
          </div>
        </div>
      </div>

      {/* History Card */}
      <div className="glass-panel history-card">
        <div className="history-header">
          <div className="history-title">
            <History size={18} color="var(--accent-cyan)" />
            Calculation History
          </div>
          {history.length > 0 && (
            <button className="clear-history-btn" onClick={onClearHistory}>
              <Trash2 size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Clear Log
            </button>
          )}
        </div>

        <div className="history-list">
          {history.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', margin: 'auto' }}>
              No calculations logged yet.<br />
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Solve 2 + 2 to see the magic!</span>
            </div>
          ) : (
            history.map((item, idx) => (
              <div
                key={idx}
                className="history-item"
                onClick={() => onSelectHistoryItem && onSelectHistoryItem(item)}
                style={{ cursor: item.proof ? 'pointer' : 'default' }}
                title={item.proof ? 'Click to view proof' : ''}
              >
                <div>
                  <div className="history-expr">{item.expression}</div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '4px' }}>
                    <span className="history-mode-tag">{item.modeName}</span>
                    {item.proof && (
                      <span className="history-proof-tag">
                        <BookOpen size={10} /> Proof
                      </span>
                    )}
                  </div>
                  {item.absurdUnit && (
                    <div className="history-unit">{item.absurdUnit}</div>
                  )}
                </div>
                <div className="history-res">{item.result}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
