import { motion } from 'framer-motion';

export default function McpVsApiSection({ onStartGame }) {
  return (
    <section className="section" id="mcp-vs-api">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">Deep Dive</span>
        <h2>MCP vs API</h2>
        <p>Now that you understand the AI landscape — dive into how AI models actually connect to the outside world.</p>
      </motion.div>

      <div className="mcp-api-intro">
        <motion.div
          className="mcp-api-card api-intro-card"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="mcp-api-card-icon">🔌</div>
          <h3>API</h3>
          <p className="mcp-api-card-subtitle">Application Programming Interface</p>
          <p>How an <strong>app talks to a service</strong>. Developers write code to call specific endpoints — the plumbing of the software world.</p>
          <ul className="mcp-api-traits">
            <li>Developer writes integration code</li>
            <li>Fixed endpoints (POST /pay, GET /users)</li>
            <li>Deterministic, contract-driven</li>
            <li>Uses REST, GraphQL, gRPC</li>
          </ul>
        </motion.div>

        <motion.div
          className="mcp-api-vs"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          VS
        </motion.div>

        <motion.div
          className="mcp-api-card mcp-intro-card"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="mcp-api-card-icon">🤖</div>
          <h3>MCP</h3>
          <p className="mcp-api-card-subtitle">Model Context Protocol</p>
          <p>How an <strong>AI model talks to tools</strong> safely and consistently. Like USB-C for AI — one standard protocol for all connections.</p>
          <ul className="mcp-api-traits">
            <li>AI discovers tools automatically</li>
            <li>Built-in discovery via tools/list</li>
            <li>Context-driven, multi-tool workflows</li>
            <li>Uses JSON-RPC 2.0</li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="mcp-api-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3>Ready to Master the Difference?</h3>
        <p>Play through 7 interactive levels — flip cards, sort traits, build flows, match scenarios, explore architectures, simulate protocols, and conquer the boss quiz.</p>
        <motion.button
          className="btn btn-dark btn-lg"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onStartGame}
        >
          ▶ Play the MCP vs API Game
        </motion.button>
      </motion.div>

      <div className="attribution">
        Content inspired by{' '}
        <a href="https://thecloudgirl.dev" target="_blank" rel="noreferrer">@pvergadia / thecloudgirl.dev</a>
        {' '}&{' '}
        <a href="https://modelcontextprotocol.io" target="_blank" rel="noreferrer">MCP Specification</a>
      </div>
    </section>
  );
}
