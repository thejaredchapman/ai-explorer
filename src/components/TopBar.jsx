import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

export default function TopBar() {
  const { state } = useGame();
  const level = Math.floor(state.xp / 500) + 1;
  const pct = (state.xp % 500) / 5;

  return (
    <motion.div
      className="top-bar"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <div className="top-bar-logo">MCP vs API</div>
      <div className="top-bar-stats">
        <div className="stat">
          <span className="stat-icon">⭐</span>
          <motion.span
            key={state.xp}
            initial={{ scale: 1.4, color: '#fbbf24' }}
            animate={{ scale: 1, color: '#f1f5f9' }}
            className="stat-value"
          >
            {state.xp}
          </motion.span>
          <span className="stat-label">XP</span>
          <div className="xp-bar">
            <motion.div
              className="xp-bar-fill"
              animate={{ width: `${pct}%` }}
              transition={{ type: 'spring', stiffness: 100 }}
            />
          </div>
        </div>
        <div className="stat">
          <span className="stat-icon">⚡</span>
          <motion.span
            key={state.streak}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            className="stat-value"
          >
            {state.streak}
          </motion.span>
          <span className="stat-label">Streak</span>
        </div>
        <div className="level-badge">LV {level}</div>
      </div>
    </motion.div>
  );
}
