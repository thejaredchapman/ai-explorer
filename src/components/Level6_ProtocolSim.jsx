import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { protocolSteps } from '../data/gameData';
import { showToast } from './Toast';

function CodeBlock({ code }) {
  return (
    <motion.pre
      className="code-block"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.4 }}
    >
      <code>{code}</code>
    </motion.pre>
  );
}

function StepCard({ step, index, active, completed, onClick }) {
  return (
    <motion.div
      className={`sim-step ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      layout
    >
      <div className="sim-step-header">
        <div className={`sim-step-number ${completed ? 'done' : ''}`}>
          {completed ? '✓' : index + 1}
        </div>
        <div className="sim-step-info">
          <h4>{step.title}</h4>
          <span className="sim-step-actor">{step.actor}</span>
        </div>
        <div className="sim-step-visual">{step.visual}</div>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            className="sim-step-body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <p className="sim-step-desc">{step.desc}</p>
            <CodeBlock code={step.code} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProtocolSim({ type, steps, onComplete }) {
  const { addXP } = useGame();
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState({});
  const done = Object.keys(completedSteps).length === steps.length;

  const advanceStep = (idx) => {
    if (done) {
      setCurrentStep(currentStep === idx ? -1 : idx);
      return;
    }
    const nextExpected = Object.keys(completedSteps).length;
    if (idx === nextExpected) {
      setCurrentStep(idx);
      setCompletedSteps(prev => ({ ...prev, [idx]: true }));
      addXP(20, 6);
      showToast('+20 XP', 'xp');
      if (Object.keys(completedSteps).length + 1 === steps.length) {
        onComplete();
      }
    } else if (idx < nextExpected) {
      setCurrentStep(currentStep === idx ? -1 : idx);
    } else {
      showToast(`Complete step ${nextExpected + 1} first!`, 'wrong');
    }
  };

  return (
    <div className="protocol-sim">
      <h3 className={`text-${type}`}>
        {type === 'api' ? '🔌' : '🤖'} {type.toUpperCase()} Protocol Flow
      </h3>
      <p className="sim-instructions">
        Click each step in order to simulate the {type.toUpperCase()} protocol flow. Each step reveals real code!
      </p>
      <div className="sim-steps">
        {steps.map((step, i) => (
          <StepCard
            key={i}
            step={step}
            index={i}
            active={currentStep === i}
            completed={!!completedSteps[i]}
            onClick={() => advanceStep(i)}
          />
        ))}
      </div>
      {done && (
        <motion.div
          className={`flow-complete text-${type}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ✅ {type.toUpperCase()} protocol simulation complete!
        </motion.div>
      )}
    </div>
  );
}

export default function Level6() {
  const { completeLevel, dispatch } = useGame();
  const [apiDone, setApiDone] = useState(false);
  const [mcpDone, setMcpDone] = useState(false);
  const [tab, setTab] = useState('api');
  const done = apiDone && mcpDone;

  const handleApiDone = () => {
    setApiDone(true);
    if (mcpDone) {
      completeLevel(6);
      showToast('Level 6 Complete!', 'correct');
    }
  };
  const handleMcpDone = () => {
    setMcpDone(true);
    if (apiDone) {
      completeLevel(6);
      showToast('Level 6 Complete!', 'correct');
    }
  };

  return (
    <div className="level-content">
      <div className="level-header">
        <span className="level-tag">LEVEL 6</span>
        <h2>Protocol Simulator</h2>
        <p>Step through the actual protocol flows for API and MCP. See real JSON-RPC code at each step!</p>
      </div>

      <div className="arch-tabs">
        <button
          className={`arch-tab ${tab === 'api' ? 'active api-active' : ''}`}
          onClick={() => setTab('api')}
        >
          🔌 API Flow {apiDone && '✓'}
        </button>
        <button
          className={`arch-tab ${tab === 'mcp' ? 'active mcp-active' : ''}`}
          onClick={() => setTab('mcp')}
        >
          🤖 MCP Flow {mcpDone && '✓'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, x: tab === 'api' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: tab === 'api' ? 20 : -20 }}
        >
          {tab === 'api' ? (
            <ProtocolSim type="api" steps={protocolSteps.api} onComplete={handleApiDone} />
          ) : (
            <ProtocolSim type="mcp" steps={protocolSteps.mcp} onComplete={handleMcpDone} />
          )}
        </motion.div>
      </AnimatePresence>

      {done && (
        <motion.div
          className="level-complete-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="btn btn-primary" onClick={() => dispatch({ type: 'GO_TO_LEVEL', level: 7 })}>
            Final Level →
          </button>
        </motion.div>
      )}
    </div>
  );
}
