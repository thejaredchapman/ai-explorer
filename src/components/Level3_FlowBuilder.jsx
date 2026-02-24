import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { apiFlowSteps, mcpFlowSteps } from '../data/gameData';
import { showToast } from './Toast';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function FlowChallenge({ type, steps, color, onComplete }) {
  const { addXP, wrongAnswer } = useGame();
  const [placed, setPlaced] = useState([]);
  const [options] = useState(() => shuffle(steps));
  const [wrongPick, setWrongPick] = useState(null);
  const done = placed.length === steps.length;

  const pick = (step) => {
    if (done) return;
    const nextIdx = placed.length;
    if (step.label === steps[nextIdx].label) {
      const newPlaced = [...placed, step];
      setPlaced(newPlaced);
      addXP(25, 3);
      showToast('+25 XP', 'xp');
      if (newPlaced.length === steps.length) onComplete();
    } else {
      wrongAnswer();
      setWrongPick(step.label);
      showToast('Wrong order! Think about the flow.', 'wrong');
      setTimeout(() => setWrongPick(null), 600);
    }
  };

  const usedLabels = placed.map(p => p.label);

  return (
    <div className="flow-challenge">
      <h3 className={`flow-title text-${type}`}>
        {type === 'api' ? '🔌' : '🤖'} {type.toUpperCase()} Flow
      </h3>

      {/* Slots */}
      <div className="flow-slots">
        {steps.map((step, i) => (
          <div key={i} className="flow-slot-group">
            <div className="flow-slot-row">
              {i > 0 && <div className="flow-arrow">→</div>}
              <motion.div
                className={`flow-slot ${placed[i] ? `filled ${type}-filled` : ''}`}
                animate={placed[i] ? { scale: [1.1, 1] } : {}}
              >
                {placed[i] ? (
                  <div className="flow-slot-content">
                    <span className="flow-slot-icon">{placed[i].icon}</span>
                    <span className="flow-slot-label">{placed[i].label}</span>
                  </div>
                ) : (
                  <span className="flow-slot-placeholder">Step {i + 1}</span>
                )}
              </motion.div>
            </div>
            {placed[i] && (
              <motion.span
                className="flow-slot-desc"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {placed[i].desc}
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* Options */}
      {!done && (
        <div className="flow-options">
          {options.map((opt) => {
            const used = usedLabels.includes(opt.label);
            const wrong = wrongPick === opt.label;
            return (
              <motion.button
                key={opt.label}
                className={`flow-option ${used ? 'used' : ''} ${wrong ? 'wrong-shake' : ''}`}
                onClick={() => !used && pick(opt)}
                whileHover={!used ? { scale: 1.05 } : {}}
                whileTap={!used ? { scale: 0.95 } : {}}
                animate={wrong ? { x: [0, -6, 6, -6, 0] } : {}}
                disabled={used}
              >
                <span>{opt.icon}</span> {opt.label}
              </motion.button>
            );
          })}
        </div>
      )}

      {done && (
        <motion.div
          className={`flow-complete text-${type}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          ✅ {type.toUpperCase()} flow complete!
        </motion.div>
      )}
    </div>
  );
}

export default function Level3() {
  const { completeLevel, dispatch } = useGame();
  const [apiDone, setApiDone] = useState(false);
  const [mcpDone, setMcpDone] = useState(false);
  const done = apiDone && mcpDone;

  const handleApiDone = () => {
    setApiDone(true);
    if (mcpDone) {
      completeLevel(3);
      showToast('Level 3 Complete!', 'correct');
    }
  };
  const handleMcpDone = () => {
    setMcpDone(true);
    if (apiDone) {
      completeLevel(3);
      showToast('Level 3 Complete!', 'correct');
    }
  };

  return (
    <div className="level-content">
      <div className="level-header">
        <span className="level-tag">LEVEL 3</span>
        <h2>Flow Builder</h2>
        <p>Put the steps in the correct order for each flow. Click options from left to right!</p>
      </div>

      <FlowChallenge type="api" steps={apiFlowSteps} onComplete={handleApiDone} />
      <FlowChallenge type="mcp" steps={mcpFlowSteps} onComplete={handleMcpDone} />

      {done && (
        <motion.div
          className="level-complete-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="btn btn-primary" onClick={() => dispatch({ type: 'GO_TO_LEVEL', level: 4 })}>
            Next Level →
          </button>
        </motion.div>
      )}
    </div>
  );
}
