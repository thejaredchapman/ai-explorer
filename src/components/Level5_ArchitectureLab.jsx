import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { showToast } from './Toast';

const apiNodes = [
  { id: 'app', label: 'Your App', icon: '📱', row: 1, col: 1, desc: 'The application that needs data or functionality from an external service. Could be a web app, mobile app, or backend service.' },
  { id: 'sdk', label: 'SDK / HTTP', icon: '📦', row: 1, col: 2, desc: 'You use an SDK library or raw HTTP requests (fetch, axios) to communicate. The developer must write and maintain this code.' },
  { id: 'ep1', label: 'POST /pay', icon: '🎯', row: 0, col: 3, desc: 'A specific URL endpoint like POST /v1/payments. You must know each endpoint, its method, and required parameters in advance.' },
  { id: 'ep2', label: 'GET /users', icon: '🎯', row: 1, col: 3, desc: 'Another endpoint like GET /v1/users/{id}. Each endpoint has a fixed URL path and expected request format.' },
  { id: 'ep3', label: 'PUT /orders', icon: '🎯', row: 2, col: 3, desc: 'Yet another endpoint. For each new operation, you need to read docs and write new integration code.' },
  { id: 'svc', label: 'Service', icon: '⚙️', row: 1, col: 4, desc: 'The backend service that processes your request and sends a structured response. It controls the response shape — you adapt to it.' },
];

const apiEdges = [
  ['app', 'sdk'], ['sdk', 'ep1'], ['sdk', 'ep2'], ['sdk', 'ep3'],
  ['ep1', 'svc'], ['ep2', 'svc'], ['ep3', 'svc'],
];

const mcpNodes = [
  { id: 'host', label: 'MCP Host', icon: '🏠', row: 1, col: 0, desc: 'An AI application like Claude Desktop, Claude Code, or VS Code. It orchestrates connections to multiple MCP servers.' },
  { id: 'c1', label: 'Client 1', icon: '🔗', row: 0, col: 1, desc: 'An MCP Client instance. The host creates one client per server connection. Uses JSON-RPC 2.0 over Stdio or HTTP.' },
  { id: 'c2', label: 'Client 2', icon: '🔗', row: 2, col: 1, desc: 'Another MCP Client. Each client maintains its own dedicated connection to an MCP server.' },
  { id: 's1', label: 'Files Server', icon: '📁', row: 0, col: 2, desc: 'A local MCP server exposing filesystem tools (read_file, write_file, list_dir). Runs on your machine via Stdio transport.' },
  { id: 's2', label: 'GitHub Server', icon: '🐙', row: 1, col: 2, desc: 'A remote MCP server exposing GitHub tools (create_issue, list_prs). The client discovers all tools via tools/list.' },
  { id: 's3', label: 'DB Server', icon: '🗄️', row: 2, col: 2, desc: 'An MCP server exposing database tools (query, list_tables). Could be local or remote — the protocol is the same.' },
  { id: 'tools', label: 'Tools / Resources / Prompts', icon: '🔧', row: 1, col: 3, desc: 'Each server exposes 3 primitives: Tools (executable functions), Resources (contextual data), and Prompts (interaction templates).' },
];

const mcpEdges = [
  ['host', 'c1'], ['host', 'c2'], ['c1', 's1'], ['c1', 's2'],
  ['c2', 's3'], ['s1', 'tools'], ['s2', 'tools'], ['s3', 'tools'],
];

function ArchDiagram({ nodes, edges, type, onNodeClick, selectedId }) {
  const cols = 5;
  const rows = 3;

  return (
    <div className="arch-diagram">
      <svg className="arch-lines" viewBox="0 0 500 200" preserveAspectRatio="xMidYMid meet">
        {edges.map(([fromId, toId], i) => {
          const from = nodes.find(n => n.id === fromId);
          const to = nodes.find(n => n.id === toId);
          const x1 = (from.col / (cols - 1)) * 460 + 20;
          const y1 = (from.row / (rows - 1)) * 160 + 20;
          const x2 = (to.col / (cols - 1)) * 460 + 20;
          const y2 = (to.row / (rows - 1)) * 160 + 20;
          return (
            <motion.line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={type === 'api' ? '#3b82f6' : '#ef4444'}
              strokeWidth="2"
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            />
          );
        })}
      </svg>
      <div className="arch-nodes">
        {nodes.map((node, i) => {
          const left = `${(node.col / (cols - 1)) * 88 + 2}%`;
          const top = `${(node.row / (rows - 1)) * 70 + 8}%`;
          return (
            <motion.div
              key={node.id}
              className={`arch-node ${type}-node ${selectedId === node.id ? 'selected' : ''}`}
              style={{ left, top }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.15, zIndex: 10 }}
              onClick={() => onNodeClick(node)}
            >
              <span className="arch-node-icon">{node.icon}</span>
              <span className="arch-node-label">{node.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function Level5() {
  const { addXP, completeLevel, dispatch } = useGame();
  const [tab, setTab] = useState('api');
  const [selectedNode, setSelectedNode] = useState(null);
  const [explored, setExplored] = useState({});
  const totalNodes = apiNodes.length + mcpNodes.length;
  const exploredCount = Object.keys(explored).length;
  const done = exploredCount >= totalNodes;

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    if (!explored[node.id]) {
      setExplored(prev => ({ ...prev, [node.id]: true }));
      addXP(10, 5);
      showToast('+10 XP', 'xp');
      if (exploredCount + 1 >= totalNodes) {
        completeLevel(5);
        showToast('Level 5 Complete!', 'correct');
      }
    }
  };

  return (
    <div className="level-content">
      <div className="level-header">
        <span className="level-tag">LEVEL 5</span>
        <h2>Architecture Lab</h2>
        <p>Click every node in both diagrams to explore the architecture. Compare how API and MCP are structured!</p>
      </div>

      <div className="progress-pill">
        <div className="progress-pill-fill" style={{ width: `${(exploredCount / totalNodes) * 100}%` }} />
        <span className="progress-pill-text">{exploredCount} / {totalNodes} nodes explored</span>
      </div>

      <div className="arch-tabs">
        <button
          className={`arch-tab ${tab === 'api' ? 'active api-active' : ''}`}
          onClick={() => { setTab('api'); setSelectedNode(null); }}
        >
          🔌 API Architecture
        </button>
        <button
          className={`arch-tab ${tab === 'mcp' ? 'active mcp-active' : ''}`}
          onClick={() => { setTab('mcp'); setSelectedNode(null); }}
        >
          🤖 MCP Architecture
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {tab === 'api' ? (
            <ArchDiagram
              nodes={apiNodes}
              edges={apiEdges}
              type="api"
              onNodeClick={handleNodeClick}
              selectedId={selectedNode?.id}
            />
          ) : (
            <ArchDiagram
              nodes={mcpNodes}
              edges={mcpEdges}
              type="mcp"
              onNodeClick={handleNodeClick}
              selectedId={selectedNode?.id}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {selectedNode && (
          <motion.div
            className="arch-detail-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="arch-detail-header">
              <span>{selectedNode.icon}</span>
              <h4>{selectedNode.label}</h4>
              {explored[selectedNode.id] && <span className="explored-badge">Explored ✓</span>}
            </div>
            <p>{selectedNode.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {done && (
        <motion.div
          className="level-complete-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="btn btn-primary" onClick={() => dispatch({ type: 'GO_TO_LEVEL', level: 6 })}>
            Next Level →
          </button>
        </motion.div>
      )}
    </div>
  );
}
