import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { sortTraits } from '../data/gameData';
import { showToast } from './Toast';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Level2() {
  const { addXP, wrongAnswer, completeLevel, dispatch } = useGame();
  const shuffled = useMemo(() => shuffle(sortTraits), []);
  const [sorted, setSorted] = useState({});
  const [apiItems, setApiItems] = useState([]);
  const [mcpItems, setMcpItems] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [shakeIdx, setShakeIdx] = useState(null);
  const [hoveredDetail, setHoveredDetail] = useState(null);

  const sortedCount = Object.keys(sorted).length;
  const done = sortedCount === shuffled.length;

  const attemptSort = (idx, bucket) => {
    if (sorted[idx]) return;
    const trait = shuffled[idx];
    if (trait.bucket === bucket) {
      setSorted(prev => ({ ...prev, [idx]: bucket }));
      if (bucket === 'api') setApiItems(prev => [...prev, trait]);
      else setMcpItems(prev => [...prev, trait]);
      setSelectedIdx(null);
      addXP(20, 2);
      showToast('+20 XP', 'xp');
      if (sortedCount + 1 === shuffled.length) {
        completeLevel(2);
        showToast('Level 2 Complete!', 'correct');
      }
    } else {
      wrongAnswer();
      setShakeIdx(idx);
      showToast('Wrong bucket! Try the other one.', 'wrong');
      setTimeout(() => setShakeIdx(null), 500);
    }
  };

  const handleDrop = (e, bucket) => {
    e.preventDefault();
    const idx = parseInt(e.dataTransfer.getData('text/plain'));
    attemptSort(idx, bucket);
  };

  return (
    <div className="level-content">
      <div className="level-header">
        <span className="level-tag">LEVEL 2</span>
        <h2>Sort Challenge</h2>
        <p>Drag each trait to API or MCP, or tap a trait then tap a bucket. Hover traits for details!</p>
      </div>

      <div className="progress-pill">
        <div className="progress-pill-fill" style={{ width: `${(sortedCount / shuffled.length) * 100}%` }} />
        <span className="progress-pill-text">{sortedCount} / {shuffled.length} sorted</span>
      </div>

      {/* Trait Chips */}
      <div className="trait-chips">
        <AnimatePresence>
          {shuffled.map((trait, i) => !sorted[i] && (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: shakeIdx === i ? [0, -8, 8, -8, 0] : 0
              }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className={`trait-chip ${selectedIdx === i ? 'selected' : ''}`}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', i);
              }}
              onClick={() => setSelectedIdx(selectedIdx === i ? null : i)}
              onMouseEnter={() => setHoveredDetail(trait.detail)}
              onMouseLeave={() => setHoveredDetail(null)}
            >
              {trait.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hoveredDetail && (
        <motion.div
          className="detail-tooltip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          💡 {hoveredDetail}
        </motion.div>
      )}

      {/* Buckets */}
      <div className="sort-area">
        <motion.div
          className="sort-bucket api-bucket"
          whileHover={{ scale: 1.01 }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, 'api')}
          onClick={() => selectedIdx !== null && attemptSort(selectedIdx, 'api')}
        >
          <h3>🔌 API</h3>
          <div className="bucket-contents">
            <AnimatePresence>
              {apiItems.map((item, i) => (
                <motion.div
                  key={item.text}
                  className="sorted-chip api-chip"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {item.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="sort-bucket mcp-bucket"
          whileHover={{ scale: 1.01 }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, 'mcp')}
          onClick={() => selectedIdx !== null && attemptSort(selectedIdx, 'mcp')}
        >
          <h3>🤖 MCP</h3>
          <div className="bucket-contents">
            <AnimatePresence>
              {mcpItems.map((item, i) => (
                <motion.div
                  key={item.text}
                  className="sorted-chip mcp-chip"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {item.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {done && (
        <motion.div
          className="level-complete-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="btn btn-primary" onClick={() => dispatch({ type: 'GO_TO_LEVEL', level: 3 })}>
            Next Level →
          </button>
        </motion.div>
      )}
    </div>
  );
}
