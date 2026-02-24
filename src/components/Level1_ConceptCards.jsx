import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { conceptCards } from '../data/gameData';
import { showToast } from './Toast';

export default function Level1() {
  const { addXP, completeLevel, dispatch } = useGame();
  const [flipped, setFlipped] = useState({});
  const [showAnalogy, setShowAnalogy] = useState({});
  const count = Object.keys(flipped).length;
  const done = count === conceptCards.length;

  const flip = (id) => {
    if (flipped[id]) return;
    setFlipped(prev => ({ ...prev, [id]: true }));
    addXP(15, 1);
    showToast('+15 XP', 'xp');
    if (count + 1 === conceptCards.length) {
      completeLevel(1);
      showToast('Level 1 Complete!', 'correct');
    }
  };

  const toggleAnalogy = (id, e) => {
    e.stopPropagation();
    setShowAnalogy(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="level-content">
      <div className="level-header">
        <span className="level-tag">LEVEL 1</span>
        <h2>Concept Explorer</h2>
        <p>Flip each card to learn a key concept. Click "Show Analogy" for a real-world comparison!</p>
      </div>

      <div className="progress-pill">
        <div className="progress-pill-fill" style={{ width: `${(count / conceptCards.length) * 100}%` }} />
        <span className="progress-pill-text">{count} / {conceptCards.length} discovered</span>
      </div>

      <div className="card-grid">
        {conceptCards.map((card) => (
          <motion.div
            key={card.id}
            className={`concept-card ${flipped[card.id] ? 'flipped' : ''}`}
            onClick={() => flip(card.id)}
            layout
          >
            <div className="concept-card-inner">
              <div className="concept-card-front">
                <span className="card-icon">{card.icon}</span>
                <span className="card-label">{card.label}</span>
                <span className="card-hint">Tap to reveal</span>
              </div>
              <div className={`concept-card-back ${card.side}-back`}>
                <h4>{card.title}</h4>
                <p>{card.text}</p>
                <button
                  className="analogy-btn"
                  onClick={(e) => toggleAnalogy(card.id, e)}
                >
                  {showAnalogy[card.id] ? 'Hide' : 'Show'} Analogy 💡
                </button>
                <AnimatePresence>
                  {showAnalogy[card.id] && (
                    <motion.div
                      className="analogy-box"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      {card.analogy}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {done && (
        <motion.div
          className="level-complete-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: 'GO_TO_LEVEL', level: 2 })}
          >
            Next Level →
          </button>
        </motion.div>
      )}
    </div>
  );
}
