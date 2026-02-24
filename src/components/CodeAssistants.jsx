import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { codeAssistants, assistantCategories } from '../data/codeAssistantsData';

function AssistantCard({ assistant, isExpanded, onToggle, index }) {
  const cat = assistantCategories.find(c => c.id === assistant.category);

  return (
    <motion.div
      className="assistant-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      layout
    >
      <div className="assistant-card-header" onClick={onToggle}>
        <div className="assistant-card-icon" style={{ background: `${assistant.color}15`, color: assistant.color }}>
          {assistant.icon}
        </div>
        <div className="assistant-card-info">
          <div className="assistant-card-meta">
            <span className="assistant-name">{assistant.name}</span>
            <span
              className="assistant-type-badge"
              style={{ background: `${assistant.color}15`, color: assistant.color, borderColor: `${assistant.color}40` }}
            >
              {assistant.type}
            </span>
          </div>
          <span className="assistant-provider">{assistant.provider}</span>
          <span className="assistant-pricing">{assistant.pricing}</span>
        </div>
        <motion.span
          className="assistant-card-chevron"
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          &#9662;
        </motion.span>
      </div>

      <p className="assistant-card-desc">{assistant.description}</p>

      <div className="assistant-models">
        <span className="assistant-models-label">Models:</span>
        <div className="assistant-model-tags">
          {assistant.models.map(m => (
            <span key={m} className="assistant-model-tag" style={{ borderColor: `${assistant.color}30`, color: assistant.color }}>
              {m}
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="assistant-card-expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="assistant-bestfor">
              <span className="assistant-bestfor-icon">&#127919;</span>
              <p>{assistant.bestFor}</p>
            </div>

            <div className="assistant-features">
              <span className="assistant-features-label">Key Features:</span>
              <ul className="assistant-features-list">
                {assistant.keyFeatures.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="assistant-supported">
              <span className="assistant-supported-label">Supported Platforms:</span>
              <div className="assistant-supported-tags">
                {assistant.supported.map(s => (
                  <span key={s} className="assistant-supported-tag">{s}</span>
                ))}
              </div>
            </div>

            <a
              href={assistant.learnMore}
              target="_blank"
              rel="noopener noreferrer"
              className="assistant-learn-more"
              style={{ borderColor: assistant.color, color: assistant.color }}
            >
              Learn More &rarr;
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CodeAssistants() {
  const [expanded, setExpanded] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');

  const toggle = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredAssistants = activeFilter === 'all'
    ? codeAssistants
    : codeAssistants.filter(a => a.category === activeFilter);

  return (
    <section className="section" id="code-assistants">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">Step 6 — Developer Tools</span>
        <h2>Code Assistants & AI Editors</h2>
        <p>
          AI-powered coding tools are transforming how software gets built. From IDE extensions to
          autonomous CLI agents to cloud-based builders, here are the tools leading the way.
        </p>
      </motion.div>

      {/* Category Explainer */}
      <div className="assistant-categories-grid">
        {assistantCategories.filter(c => c.id !== 'all').map((cat, i) => (
          <motion.div
            key={cat.id}
            className={`assistant-category-card ${activeFilter === cat.id ? 'active' : ''}`}
            style={{ '--cat-color': codeAssistants.find(a => a.category === cat.id)?.color || '#6366f1' }}
            onClick={() => setActiveFilter(activeFilter === cat.id ? 'all' : cat.id)}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="assistant-category-icon">{cat.icon}</span>
            <h4>{cat.label}</h4>
            <p>{cat.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        {assistantCategories.map(cat => (
          <motion.button
            key={cat.id}
            className={`filter-chip ${activeFilter === cat.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span>{cat.icon}</span> {cat.label}
          </motion.button>
        ))}
      </div>

      <p className="filter-count">
        Showing {filteredAssistants.length} of {codeAssistants.length} tools
      </p>

      {/* Cards Grid */}
      <motion.div className="assistants-grid" layout>
        {filteredAssistants.map((assistant, i) => (
          <AssistantCard
            key={assistant.id}
            assistant={assistant}
            isExpanded={expanded[assistant.id]}
            onToggle={() => toggle(assistant.id)}
            index={i}
          />
        ))}
      </motion.div>
    </section>
  );
}
