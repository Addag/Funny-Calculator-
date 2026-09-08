import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

const DEFAULT_DIGITS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];

export default function Keypad({
  onDigit,
  onOperator,
  onEquals,
  onClear,
  onBackspace,
  onToggleSign,
  dodgeMode,
  scrambleMode,
  hasInput
}) {
  const [dodgeOffset, setDodgeOffset] = useState({ x: 0, y: 0 });
  const [clearLabel, setClearLabel] = useState('C');
  const [digits, setDigits] = useState(DEFAULT_DIGITS);
  const [showClearTrap, setShowClearTrap] = useState(false);

  // Reset digits when scrambleMode is toggled off
  useEffect(() => {
    if (!scrambleMode) {
      setDigits(DEFAULT_DIGITS);
    }
  }, [scrambleMode]);

  const handleMouseEnterEquals = () => {
    if (dodgeMode) {
      const randomX = (Math.random() - 0.5) * 90;
      const randomY = (Math.random() - 0.5) * 70;
      setDodgeOffset({ x: randomX, y: randomY });
    }
  };

  const handleMouseLeaveEquals = () => {
    setDodgeOffset({ x: 0, y: 0 });
  };

  const handleClearClick = () => {
    // If there is user input, 35% chance to trigger "Are you sure?" trap
    if (hasInput && Math.random() < 0.35 && !showClearTrap) {
      setShowClearTrap(true);
      return;
    }

    const labels = ['C', 'Clear', 'Are you sure?', 'NOPE', 'Reset', 'Delete Life?'];
    const nextLabel = labels[Math.floor(Math.random() * labels.length)];
    setClearLabel(nextLabel);
    setShowClearTrap(false);
    onClear();
  };

  const confirmClear = () => {
    setShowClearTrap(false);
    onClear();
  };

  const handleDigitClick = (d) => {
    onDigit(d);

    // If scrambleMode is active, randomly swap two keys
    if (scrambleMode && Math.random() > 0.4) {
      setDigits((prev) => {
        const copy = [...prev];
        const i1 = Math.floor(Math.random() * copy.length);
        let i2 = Math.floor(Math.random() * copy.length);
        while (i2 === i1) i2 = Math.floor(Math.random() * copy.length);
        const temp = copy[i1];
        copy[i1] = copy[i2];
        copy[i2] = temp;
        return copy;
      });
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* "Are you sure?" Clear Trap Bubble */}
      {showClearTrap && (
        <div className="clear-trap-card">
          <div className="clear-trap-header">
            <AlertCircle size={16} color="var(--accent-magenta)" />
            <span>Existential Dilemma</span>
          </div>
          <p className="clear-trap-msg">
            Wait! What if that number was destined to be your lucky lottery ticket?
          </p>
          <div className="clear-trap-actions">
            <button className="clear-trap-btn keep-btn" onClick={() => setShowClearTrap(false)}>
              Keep It Safe
            </button>
            <button className="clear-trap-btn delete-btn" onClick={confirmClear}>
              Delete Anyway
            </button>
          </div>
        </div>
      )}

      <div className="keypad-grid">
        <button className="btn btn-clear" onClick={handleClearClick}>
          {clearLabel}
        </button>
        <button className="btn btn-op" onClick={onBackspace}>
          ⌫
        </button>
        <button className="btn btn-op" onClick={() => onOperator('%')}>
          %
        </button>
        <button className="btn btn-op" onClick={() => onOperator('/')}>
          ÷
        </button>

        {/* Row 1 */}
        <button className="btn" onClick={() => handleDigitClick(digits[0])}>{digits[0]}</button>
        <button className="btn" onClick={() => handleDigitClick(digits[1])}>{digits[1]}</button>
        <button className="btn" onClick={() => handleDigitClick(digits[2])}>{digits[2]}</button>
        <button className="btn btn-op" onClick={() => onOperator('×')}>×</button>

        {/* Row 2 */}
        <button className="btn" onClick={() => handleDigitClick(digits[3])}>{digits[3]}</button>
        <button className="btn" onClick={() => handleDigitClick(digits[4])}>{digits[4]}</button>
        <button className="btn" onClick={() => handleDigitClick(digits[5])}>{digits[5]}</button>
        <button className="btn btn-op" onClick={() => onOperator('-')}>-</button>

        {/* Row 3 */}
        <button className="btn" onClick={() => handleDigitClick(digits[6])}>{digits[6]}</button>
        <button className="btn" onClick={() => handleDigitClick(digits[7])}>{digits[7]}</button>
        <button className="btn" onClick={() => handleDigitClick(digits[8])}>{digits[8]}</button>
        <button className="btn btn-op" onClick={() => onOperator('+')}>+</button>

        {/* Row 4 */}
        <button className="btn btn-op" onClick={onToggleSign} title="Toggle positive/negative sign">
          ±
        </button>
        <button className="btn" onClick={() => handleDigitClick(digits[9])}>{digits[9]}</button>
        <button className="btn" onClick={() => handleDigitClick(digits[10])}>{digits[10]}</button>
        <button
          className="btn btn-equals dodging"
          onClick={onEquals}
          onMouseEnter={handleMouseEnterEquals}
          onMouseLeave={handleMouseLeaveEquals}
          style={{
            transform: `translate(${dodgeOffset.x}px, ${dodgeOffset.y}px)`,
          }}
        >
          =
        </button>
      </div>
    </div>
  );
}
