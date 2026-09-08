import React, { useState } from 'react';
import { BookOpen, Check, Copy, X } from 'lucide-react';

export default function ProofViewer({ proof, expression, result, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!proof || proof.length === 0) return null;

  const handleCopy = () => {
    const text = `Mathematical Proof that ${expression} = ${result}:\n\n` +
      proof.map((step, idx) => `Step ${idx + 1}: ${step}`).join('\n') +
      '\n\nVerified by Wrong Answers Only Calculator.';
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="proof-container">
      <div className="proof-header">
        <div className="proof-title">
          <BookOpen size={16} color="var(--accent-yellow)" />
          <span>Formal Proof Breakdown</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="proof-action-btn" onClick={handleCopy} title="Copy proof for homework">
            {copied ? <Check size={14} color="var(--accent-green)" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy Proof'}</span>
          </button>
          {onClose && (
            <button className="proof-close-btn" onClick={onClose} title="Hide proof">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="proof-steps">
        {proof.map((step, idx) => {
          const isConclusion = idx === proof.length - 1;
          return (
            <div key={idx} className={`proof-step-item ${isConclusion ? 'conclusion-step' : ''}`}>
              <div className={`proof-step-badge ${isConclusion ? 'qed-badge' : ''}`}>
                {isConclusion ? 'Q.E.D.' : `0${idx + 1}`}
              </div>
              <div className="proof-step-text">
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
