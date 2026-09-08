import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, MousePointer, Shuffle, ShieldAlert, FileText } from 'lucide-react';
import ModeSelector from './components/ModeSelector';
import Display from './components/Display';
import Keypad from './components/Keypad';
import SidePanel from './components/SidePanel';
import ProofViewer from './components/ProofViewer';
import CaptchaModal from './components/CaptchaModal';
import ExportCard from './components/ExportCard';
import { calculateWrongAnswer, PERSONALITIES } from './utils/calculatorLogic';

const THINKING_QUOTES = [
  "Consulting local astrologer...",
  "Negotiating with arithmetic...",
  "Bribing the math department...",
  "Rounding errors in corporate's favor...",
  "Fabricating fake peer review...",
  "Inverting reality matrices...",
  "Asking my dog for a second opinion...",
  "Translating into Babylonian fractions..."
];

export default function App() {
  const [mode, setMode] = useState('idiot');
  const [val1, setVal1] = useState('');
  const [operator, setOperator] = useState('');
  const [val2, setVal2] = useState('');
  const [result, setResult] = useState('');
  const [commentary, setCommentary] = useState('Select a mode and start doing questionable math!');
  const [confidence, setConfidence] = useState('100% Unearned Confidence');
  const [proof, setProof] = useState(null);
  const [absurdUnit, setAbsurdUnit] = useState(null);
  const [showProof, setShowProof] = useState(false);
  const [history, setHistory] = useState([]);
  const [isGlitching, setIsGlitching] = useState(false);

  // Trolling & Comedic Timing States
  const [dodgeMode, setDodgeMode] = useState(false);
  const [scrambleMode, setScrambleMode] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatingText, setCalculatingText] = useState('');
  const [captchaOpen, setCaptchaOpen] = useState(false);
  const [calcCounter, setCalcCounter] = useState(0);

  // Export Homework Modal State
  const [exportOpen, setExportOpen] = useState(false);

  // Sound effect simulation using Web Audio API
  const playBeep = (freq = 440, type = 'sine') => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      // AudioContext might be blocked until user gesture
    }
  };

  const handleDigit = (digit) => {
    playBeep(520, 'sine');
    if (result && !operator) {
      // Clear result if starting fresh calculation
      setResult('');
      setProof(null);
      setAbsurdUnit(null);
      setShowProof(false);
      setVal1(digit);
      return;
    }

    if (!operator) {
      if (digit === '.' && val1.includes('.')) return;
      if (val1 === '0' && digit !== '.') {
        setVal1(digit);
        return;
      }
      setVal1((prev) => prev + digit);
    } else {
      if (digit === '.' && val2.includes('.')) return;
      if (val2 === '0' && digit !== '.') {
        setVal2(digit);
        return;
      }
      setVal2((prev) => prev + digit);
    }
  };

  const handleToggleSign = () => {
    playBeep(400, 'sine');
    if (val2) {
      setVal2((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
    } else if (val1 && !operator) {
      setVal1((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
    } else if (result && !isNaN(parseFloat(result))) {
      const negated = String(parseFloat(result) * -1);
      setVal1(negated);
      setResult('');
    }
  };

  const handleOperator = (op) => {
    playBeep(380, 'square');
    // 1. If we have a previous result and no active val1
    if (!val1 && result) {
      const isNum = !isNaN(parseFloat(result));
      if (isNum) {
        setVal1(result);
        setResult('');
        setOperator(op);
      } else {
        // Non-numeric result can't be chained
        setResult('');
        setOperator('');
      }
      return;
    }

    // 2. If val1 exists and no operator yet, set operator
    if (val1 && !operator) {
      setOperator(op);
      return;
    }

    // 3. If val1 and operator exist, but no val2 yet: user is switching operator!
    if (val1 && operator && !val2) {
      setOperator(op);
      return;
    }

    // 4. If val1, operator, and val2 all exist: evaluate and chain
    if (val1 && operator && val2) {
      executeEquals(op);
    }
  };

  const triggerCalculation = (nextOp = null) => {
    // Pick suspense quote
    const quote = THINKING_QUOTES[Math.floor(Math.random() * THINKING_QUOTES.length)];
    setIsCalculating(true);
    setCalculatingText(quote);

    setTimeout(() => {
      setIsCalculating(false);
      const outcome = calculateWrongAnswer(val1, operator, val2, mode);

      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 400);

      setResult(outcome.display);
      setCommentary(outcome.comment);
      setConfidence(outcome.confidence);
      setProof(outcome.proof);
      setAbsurdUnit(outcome.absurdUnit);
      setShowProof(true);
      setCalcCounter((c) => c + 1);

      if (outcome.easterEgg) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 }
        });
      }

      const currentP = PERSONALITIES[mode.toUpperCase()] || PERSONALITIES.IDIOT;
      const expression = `${val1} ${operator} ${val2}`;
      setHistory((prev) => [
        {
          expression,
          result: outcome.display,
          modeName: currentP.name,
          proof: outcome.proof,
          absurdUnit: outcome.absurdUnit
        },
        ...prev.slice(0, 19)
      ]);

      if (nextOp) {
        const isNum = !isNaN(parseFloat(outcome.display));
        if (isNum) {
          setVal1(outcome.display);
          setOperator(nextOp);
          setVal2('');
        } else {
          setVal1('');
          setOperator('');
          setVal2('');
        }
      } else {
        setVal1(outcome.display);
        setOperator('');
        setVal2('');
      }
    }, 850);
  };

  const executeEquals = (nextOp = null) => {
    playBeep(650, 'triangle');
    if (!val1 || !operator || !val2 || isCalculating) return;

    // Trigger CAPTCHA every 3rd calculation if not already solved
    if (calcCounter > 0 && calcCounter % 3 === 0 && !captchaOpen) {
      setCaptchaOpen(true);
      return;
    }

    triggerCalculation(nextOp);
  };

  const handleCaptchaSolved = () => {
    setCaptchaOpen(false);
    triggerCalculation(null);
  };

  const handleClear = () => {
    playBeep(250, 'sawtooth');
    setVal1('');
    setOperator('');
    setVal2('');
    setResult('');
    setProof(null);
    setAbsurdUnit(null);
    setShowProof(false);
    setCommentary('Memory wiped! (Or was it?)');
    setConfidence('0% (Blank Slate)');
  };

  const handleBackspace = () => {
    playBeep(300, 'sine');
    if (val2) {
      setVal2((prev) => prev.slice(0, -1));
    } else if (operator) {
      setOperator('');
    } else if (val1) {
      setVal1((prev) => prev.slice(0, -1));
    }
  };

  const handleSelectHistoryItem = (item) => {
    if (item.proof) {
      setProof(item.proof);
      setAbsurdUnit(item.absurdUnit);
      setResult(item.result);
      setShowProof(true);
    }
  };

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (captchaOpen || exportOpen || isCalculating) return;
      if (e.key >= '0' && e.key <= '9') handleDigit(e.key);
      if (e.key === '.') handleDigit('.');
      if (e.key === '+') handleOperator('+');
      if (e.key === '-') handleOperator('-');
      if (e.key === '*') handleOperator('×');
      if (e.key === '/') {
        e.preventDefault();
        handleOperator('/');
      }
      if (e.key === '%') handleOperator('%');
      if (e.key === 'Enter' || e.key === '=') executeEquals();
      if (e.key === 'Backspace') handleBackspace();
      if (e.key === 'Escape') handleClear();
      if (e.key === 'F9') handleToggleSign();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [val1, operator, val2, mode, result, captchaOpen, exportOpen, isCalculating, calcCounter]);

  const currentExpression = `${val1} ${operator} ${val2}`.trim();
  const currentP = PERSONALITIES[mode.toUpperCase()] || PERSONALITIES.IDIOT;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">
          <Sparkles color="var(--accent-magenta)" size={32} />
          Wrong Answers Only
        </h1>
        <p className="app-subtitle">
          The world's most confident, inaccurate & passive-aggressive calculator
        </p>
      </header>

      {/* Main Calculator Box */}
      <div className="glass-panel">
        <ModeSelector currentMode={mode} onSelectMode={setMode} />
        
        <Display
          expression={currentExpression}
          result={result}
          confidence={confidence}
          absurdUnit={absurdUnit}
          hasProof={Boolean(proof && proof.length > 0)}
          showProof={showProof}
          onToggleProof={() => setShowProof(!showProof)}
          isGlitching={isGlitching}
          isCalculating={isCalculating}
          calculatingText={calculatingText}
        />

        {showProof && proof && !isCalculating && (
          <ProofViewer
            proof={proof}
            expression={currentExpression || result}
            result={result}
            onClose={() => setShowProof(false)}
          />
        )}

        <Keypad
          onDigit={handleDigit}
          onOperator={handleOperator}
          onEquals={() => executeEquals()}
          onClear={handleClear}
          onBackspace={handleBackspace}
          onToggleSign={handleToggleSign}
          dodgeMode={dodgeMode}
          scrambleMode={scrambleMode}
          hasInput={Boolean(val1 || operator || val2 || result)}
        />

        <div className="toggles-bar">
          <button
            className={`toggle-chip ${scrambleMode ? 'active' : ''}`}
            onClick={() => setScrambleMode(!scrambleMode)}
            title="Toggle keys randomly swapping when pressed"
          >
            <Shuffle size={14} />
            Key Scramble: {scrambleMode ? 'ON 🔀' : 'OFF'}
          </button>

          <button
            className={`toggle-chip ${dodgeMode ? 'active' : ''}`}
            onClick={() => setDodgeMode(!dodgeMode)}
            title="Toggle mischievously moving Equals button"
          >
            <MousePointer size={14} />
            Dodge Button: {dodgeMode ? 'ON 🏃' : 'OFF'}
          </button>

          <button
            className="toggle-chip"
            onClick={() => setCaptchaOpen(true)}
            title="Test a ridiculous anti-mathematician CAPTCHA"
          >
            <ShieldAlert size={14} />
            Test CAPTCHA
          </button>

          {result && (
            <button
              className="toggle-chip export-chip"
              onClick={() => setExportOpen(true)}
              title="Generate a formatted homework submission card"
            >
              <FileText size={14} color="var(--accent-cyan)" />
              Export Homework
            </button>
          )}
        </div>
      </div>

      {/* Side Commentary & History */}
      <SidePanel
        commentary={commentary}
        currentMode={mode}
        history={history}
        onClearHistory={() => setHistory([])}
        onSelectHistoryItem={handleSelectHistoryItem}
      />

      {/* Absurd Anti-Mathematician CAPTCHA Modal */}
      {captchaOpen && (
        <CaptchaModal
          onSolve={handleCaptchaSolved}
          onCancel={() => setCaptchaOpen(false)}
        />
      )}

      {/* Homework / Spreadsheet Export Modal */}
      {exportOpen && (
        <ExportCard
          expression={currentExpression || history[0]?.expression}
          result={result}
          confidence={confidence}
          absurdUnit={absurdUnit}
          proof={proof}
          modeName={currentP.name}
          onClose={() => setExportOpen(false)}
        />
      )}
    </div>
  );
}
