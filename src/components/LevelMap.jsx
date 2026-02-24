import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

const levelNames = [
  '', 'Concept Explorer', 'Sort Challenge', 'Flow Builder',
  'Scenario Match', 'Architecture Lab', 'Protocol Simulator', 'Boss Quiz'
];

export default function LevelMap() {
  const { state, dispatch } = useGame();

  return (
    <div className="level-map">
      {Array.from({ length: state.totalLevels }, (_, i) => {
        const lvl = i + 1;
        const completed = state.levelsCompleted[lvl];
        const active = state.currentLevel === lvl;
        const unlocked = lvl === 1 || state.levelsCompleted[lvl - 1];

        return (
          <div key={lvl} className="level-map-item">
            {i > 0 && <div className={`level-connector ${completed || active ? 'active' : ''}`} />}
            <motion.button
              className={`level-node ${completed ? 'completed' : ''} ${active ? 'active' : ''} ${!unlocked ? 'locked' : ''}`}
              whileHover={unlocked ? { scale: 1.1 } : {}}
              whileTap={unlocked ? { scale: 0.95 } : {}}
              onClick={() => unlocked && dispatch({ type: 'GO_TO_LEVEL', level: lvl })}
              disabled={!unlocked}
            >
              {completed ? '✓' : lvl}
            </motion.button>
            <span className="level-node-label">{levelNames[lvl]}</span>
          </div>
        );
      })}
    </div>
  );
}
