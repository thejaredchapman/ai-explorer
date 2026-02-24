import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

export default function TitleScreen() {
  const { dispatch } = useGame();

  return (
    <motion.div
      className="screen title-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="title-graphic">
        <motion.div
          className="title-icon-box api-box"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          <span className="title-icon-emoji">🔌</span>
          <span className="title-icon-label">API</span>
        </motion.div>

        <motion.div
          className="title-vs"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          VS
        </motion.div>

        <motion.div
          className="title-icon-box mcp-box"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 1.5 }}
        >
          <span className="title-icon-emoji">🤖</span>
          <span className="title-icon-label">MCP</span>
        </motion.div>
      </div>

      <h1 className="title-main">
        <span className="text-api">API</span>
        {' '}vs{' '}
        <span className="text-mcp">MCP</span>
      </h1>

      <p className="title-sub">
        Master the difference between traditional APIs and the Model Context Protocol
        through <strong>7 interactive levels</strong>. Flip cards, sort traits, build flows,
        match scenarios, explore architectures, simulate protocols, and conquer the boss quiz!
      </p>

      <div className="title-features">
        <div className="title-feature">
          <span>🃏</span> Flip Cards
        </div>
        <div className="title-feature">
          <span>🎯</span> Drag & Sort
        </div>
        <div className="title-feature">
          <span>🔀</span> Flow Builder
        </div>
        <div className="title-feature">
          <span>🏗️</span> Architecture Lab
        </div>
        <div className="title-feature">
          <span>💻</span> Protocol Sim
        </div>
        <div className="title-feature">
          <span>🏆</span> Boss Quiz
        </div>
      </div>

      <motion.button
        className="btn btn-primary btn-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => dispatch({ type: 'START_GAME' })}
      >
        ▶ START GAME
      </motion.button>

      <p className="attribution">
        Content inspired by{' '}
        <a href="https://thecloudgirl.dev" target="_blank" rel="noreferrer">
          @pvergadia / thecloudgirl.dev
        </a>
        {' '}& the{' '}
        <a href="https://modelcontextprotocol.io" target="_blank" rel="noreferrer">
          MCP Specification
        </a>
      </p>
    </motion.div>
  );
}
