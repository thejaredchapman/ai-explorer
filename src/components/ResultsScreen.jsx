import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import ConfettiExplosion from 'react-confetti-explosion';
import { useState } from 'react';

const levelNames = {
  1: 'Concept Explorer',
  2: 'Sort Challenge',
  3: 'Flow Builder',
  4: 'Scenario Match',
  5: 'Architecture Lab',
  6: 'Protocol Simulator',
  7: 'Boss Quiz',
};

export default function ResultsScreen() {
  const { state, dispatch } = useGame();
  const [showConfetti, setShowConfetti] = useState(true);
  const completedCount = Object.keys(state.levelsCompleted).length;
  const allComplete = completedCount === state.totalLevels;

  let trophy = '🥉';
  let title = 'Keep Learning!';
  if (state.xp >= 800 && allComplete) { trophy = '👑'; title = 'PROTOCOL MASTER!'; }
  else if (state.xp >= 600) { trophy = '🏆'; title = 'EXCELLENT!'; }
  else if (state.xp >= 400) { trophy = '🥈'; title = 'WELL DONE!'; }

  const badges = [];
  if (allComplete) badges.push('⭐ Completionist');
  if (state.maxStreak >= 20) badges.push('⚡ Unstoppable 20+');
  else if (state.maxStreak >= 10) badges.push('🔥 Hot Streak 10+');
  if (state.xp >= 1000) badges.push('💪 1000+ XP Club');
  else if (state.xp >= 500) badges.push('💪 500+ XP Club');
  if (state.levelsCompleted[7]) badges.push('🎯 Quiz Conqueror');
  if (badges.length === 0) badges.push('🌱 Learner');

  return (
    <motion.div
      className="results-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {showConfetti && (
        <div style={{ position: 'fixed', top: '30%', left: '50%', zIndex: 300 }}>
          <ConfettiExplosion
            particleCount={150}
            width={1200}
            duration={3000}
            onComplete={() => setShowConfetti(false)}
          />
        </div>
      )}

      <div className="results-card">
        <motion.div
          className="results-trophy"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: 2, duration: 0.8 }}
        >
          {trophy}
        </motion.div>

        <h2 className="results-title">{title}</h2>

        <motion.div
          className="results-score"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.3 }}
        >
          {state.xp}
        </motion.div>
        <p className="results-score-label">Total XP Earned</p>

        <div className="results-breakdown">
          {Object.entries(levelNames).map(([lvl, name]) => (
            <div key={lvl} className="results-row">
              <span className="results-row-label">
                {state.levelsCompleted[lvl] ? '✅' : '⬜'} {name}
              </span>
              <span className="results-row-value">{state.levelScores[lvl] || 0} XP</span>
            </div>
          ))}
          <div className="results-row results-row-highlight">
            <span className="results-row-label">🔥 Best Streak</span>
            <span className="results-row-value">{state.maxStreak}</span>
          </div>
          <div className="results-row results-row-highlight">
            <span className="results-row-label">📊 Levels Completed</span>
            <span className="results-row-value">{completedCount} / {state.totalLevels}</span>
          </div>
        </div>

        <div className="badge-row">
          {badges.map((b, i) => (
            <motion.div
              key={b}
              className="badge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15 }}
            >
              {b}
            </motion.div>
          ))}
        </div>

        <div className="results-actions">
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch({ type: 'RESET' })}
          >
            🔄 Play Again
          </motion.button>
        </div>
      </div>

      <p className="attribution">
        Content inspired by{' '}
        <a href="https://thecloudgirl.dev" target="_blank" rel="noreferrer">@pvergadia / thecloudgirl.dev</a>
        {' '}& the{' '}
        <a href="https://modelcontextprotocol.io" target="_blank" rel="noreferrer">MCP Specification</a>
      </p>
    </motion.div>
  );
}
