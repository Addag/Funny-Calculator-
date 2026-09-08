import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Sparkles } from 'lucide-react';

const CAPTCHA_CHALLENGES = [
  {
    type: 'choice',
    title: 'Anti-Mathematician Verification',
    question: 'Select the value that feels emotionally warm and safe:',
    options: ['7', '42', 'Lavender', '🥦 Broccoli'],
    correctIndex: 2 // 'Lavender'
  },
  {
    type: 'choice',
    title: 'Vibe Check Protocol',
    question: 'Complete the sentence: "Math is..."',
    options: [
      'A rigorous science',
      'A social construct',
      'An elaborate pyramid scheme',
      'Whatever I want it to be'
    ],
    correctIndex: 3
  },
  {
    type: 'slider',
    title: 'Emotional Readiness Assessment',
    question: 'Slide to confirm your psychological readiness for this inaccurate answer (must exceed 80%):',
    min: 0,
    max: 100,
    requiredMin: 80
  },
  {
    type: 'checkbox',
    title: 'Legal Waiver & Disclaimer',
    question: 'Check the box to acknowledge that building a skyscraper with this calculation is strictly at your own peril.',
    label: 'I swear under penalty of arithmetic perjury to accept this wrong answer.'
  }
];

export default function CaptchaModal({ onSolve, onCancel }) {
  // Random challenge
  const [challengeIndex] = useState(() => Math.floor(Math.random() * CAPTCHA_CHALLENGES.length));
  const challenge = CAPTCHA_CHALLENGES[challengeIndex];

  const [sliderVal, setSliderVal] = useState(30);
  const [checked, setChecked] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChoice = (idx) => {
    // Any choice passes with funny commentary, or give high five
    setFeedback('Verification successful! You possess 0% mathematical rigidity.');
    setTimeout(() => onSolve(), 800);
  };

  const handleSliderSubmit = () => {
    if (sliderVal >= challenge.requiredMin) {
      setFeedback('Emotional fortitude verified! Generating wrong answer...');
      setTimeout(() => onSolve(), 800);
    } else {
      setFeedback(`Insufficient courage (${sliderVal}%). Slide higher to proceed!`);
    }
  };

  const handleCheckboxSubmit = () => {
    if (checked) {
      setFeedback('Waiver signed! We are legally indemnified.');
      setTimeout(() => onSolve(), 800);
    } else {
      setFeedback('You must sign the waiver before receiving misinformation!');
    }
  };

  return (
    <div className="captcha-overlay">
      <div className="captcha-card">
        <div className="captcha-header">
          <ShieldAlert size={22} color="var(--accent-magenta)" />
          <span className="captcha-title">{challenge.title}</span>
        </div>

        <p className="captcha-subtitle">
          To prevent actual mathematicians from using this calculator, solve this human vibe check:
        </p>

        <div className="captcha-body">
          <div className="captcha-question">{challenge.question}</div>

          {challenge.type === 'choice' && (
            <div className="captcha-options">
              {challenge.options.map((opt, idx) => (
                <button
                  key={idx}
                  className="captcha-opt-btn"
                  onClick={() => handleChoice(idx)}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {challenge.type === 'slider' && (
            <div className="captcha-slider-wrap">
              <input
                type="range"
                min={challenge.min}
                max={challenge.max}
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="captcha-range"
              />
              <div style={{ textAlign: 'center', fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-cyan)' }}>
                {sliderVal}% Ready
              </div>
              <button className="captcha-submit-btn" onClick={handleSliderSubmit}>
                Confirm Emotional Readiness
              </button>
            </div>
          )}

          {challenge.type === 'checkbox' && (
            <div className="captcha-checkbox-wrap">
              <label className="captcha-checkbox-label">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
                <span>{challenge.label}</span>
              </label>
              <button className="captcha-submit-btn" onClick={handleCheckboxSubmit}>
                Submit Legal Agreement
              </button>
            </div>
          )}

          {feedback && (
            <div className="captcha-feedback">
              <Sparkles size={14} color="var(--accent-green)" />
              {feedback}
            </div>
          )}
        </div>

        <div className="captcha-footer">
          <button className="captcha-cancel-btn" onClick={onCancel}>
            Abandon Calculation
          </button>
        </div>
      </div>
    </div>
  );
}
