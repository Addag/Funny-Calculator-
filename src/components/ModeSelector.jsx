import React from 'react';
import { PERSONALITIES } from '../utils/calculatorLogic';
import { Brain, Code, Frown, Zap } from 'lucide-react';

const ICON_MAP = {
  Brain: Brain,
  Code: Code,
  Frown: Frown,
  Zap: Zap,
};

export default function ModeSelector({ currentMode, onSelectMode }) {
  return (
    <div className="mode-selector">
      {Object.values(PERSONALITIES).map((p) => {
        const IconComponent = ICON_MAP[p.icon] || Brain;
        const isActive = currentMode === p.id;

        return (
          <button
            key={p.id}
            className={`mode-btn ${isActive ? 'active' : ''}`}
            onClick={() => onSelectMode(p.id)}
            title={p.tagline}
          >
            <div className="mode-name">
              <IconComponent size={18} />
              {p.name}
            </div>
            <div className="mode-badge">{p.badge}</div>
          </button>
        );
      })}
    </div>
  );
}
