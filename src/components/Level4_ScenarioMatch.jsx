import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { scenarios } from '../data/gameData';
import { showToast } from './Toast';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Level4() {
  const { addXP, wrongAnswer, completeLevel, dispatch } = useGame();
  const shuffled = useMemo(() => shuffle(scenarios), []);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answered, setAnswered] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [correct, setCorrect] = useState(0);

  const current = shuffled[currentIdx];
  const done = Object.keys(answered).length === shuffled.length;

  const answer = (choice) => {
    if (answered[current.id]) return;
    const isCorrect = choice === current.answer;
    setAnswered(prev => ({ ...prev, [current.id]: choice }));
    setShowExplanation(true);
    if (isCorrect) {
      addXP(30, 4);
      showToast('+30 XP — Correct!', 'correct');
      setCorrect(prev => prev + 1);
    } else {
      wrongAnswer();
      showToast('Not quite!', 'wrong');
    }
    if (Object.keys(answered).length + 1 === shuffled.length) {
      setTimeout(() => {
        completeLevel(4);
        showToast('Level 4 Complete!', 'correct');
      }, 1500);
    }
  };

  const next = () => {
    setShowExplanation(false);
    if (currentIdx < shuffled.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  return (
    <div className="level-content">
      <div className="level-header">
        <span className="level-tag">LEVEL 4</span>
        <h2>Scenario Match</h2>
        <p>Read each real-world scenario and decide: is this an API or MCP use case?</p>
      </div>

      <div className="progress-pill">
        <div className="progress-pill-fill" style={{ width: `${(Object.keys(answered).length / shuffled.length) * 100}%` }} />
        <span className="progress-pill-text">
          {Object.keys(answered).length} / {shuffled.length} — {correct} correct
        </span>
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={current.id}
            className="scenario-card"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <div className="scenario-number">Scenario {currentIdx + 1} / {shuffled.length}</div>
            <p className="scenario-text">{current.scenario}</p>

            {!answered[current.id] ? (
              <div className="scenario-buttons">
                <motion.button
                  className="btn btn-api btn-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => answer('api')}
                >
                  🔌 API
                </motion.button>
                <motion.button
                  className="btn btn-mcp btn-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => answer('mcp')}
                >
                  🤖 MCP
                </motion.button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className={`scenario-result ${answered[current.id] === current.answer ? 'correct' : 'incorrect'}`}>
                  {answered[current.id] === current.answer
                    ? '✅ Correct!'
                    : `❌ Incorrect — the answer is ${current.answer.toUpperCase()}`}
                </div>
                {showExplanation && (
                  <motion.div
                    className="scenario-explanation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {current.explanation}
                  </motion.div>
                )}
                {currentIdx < shuffled.length - 1 && (
                  <button className="btn btn-outline" onClick={next} style={{ marginTop: 16 }}>
                    Next Scenario →
                  </button>
                )}
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="scenario-done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3>Scenarios Complete!</h3>
            <p>You got {correct} / {shuffled.length} correct</p>
          </motion.div>
        )}
      </AnimatePresence>

      {done && (
        <motion.div
          className="level-complete-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="btn btn-primary" onClick={() => dispatch({ type: 'GO_TO_LEVEL', level: 5 })}>
            Next Level →
          </button>
        </motion.div>
      )}
    </div>
  );
}
