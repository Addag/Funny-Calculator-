import React from 'react';
import { Sparkles, Scale, BookOpen, Loader2 } from 'lucide-react';

export default function Display({
  expression,
  result,
  confidence,
  absurdUnit,
  hasProof,
  showProof,
  onToggleProof,
  isGlitching,
  isCalculating,
  calculatingText
}) {
  return (
    <div className="calc-display">
      <div className="expression-line">
        {expression || '0'}
      </div>
      
      {isCalculating ? (
        <div className="calculating-box">
          <Loader2 className="calculating-spinner" size={24} />
          <div className="calculating-text">
            {calculatingText || 'Negotiating with arithmetic...'}
          </div>
        </div>
      ) : (
        <div className={`result-line ${isGlitching ? 'glitch' : ''}`}>
          {result || '0'}
        </div>
      )}

      {!isCalculating && absurdUnit && (
        <div className="absurd-unit-line" title="Completely non-standard scientific unit">
          <Scale size={13} color="var(--accent-cyan)" />
          <span>{absurdUnit}</span>
        </div>
      )}

      <div className="confidence-bar">
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={14} color="#ffb703" /> AI Confidence:
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="confidence-tag">
            {isCalculating ? 'Computing Nonsense...' : (confidence || '100% (Trust Me)')}
          </span>
          {!isCalculating && hasProof && (
            <button
              className={`proof-toggle-btn ${showProof ? 'active' : ''}`}
              onClick={onToggleProof}
              title="Inspect step-by-step mathematical justification"
            >
              <BookOpen size={13} />
              {showProof ? 'Hide Work' : 'Show Work'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
