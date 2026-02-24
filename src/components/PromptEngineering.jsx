import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { techniques, categories, difficultyLevels, quickTips } from '../data/promptEngineeringData';

function DifficultyDots({ level }) {
  return (
    <span className="pe-difficulty-dots" title={difficultyLevels.find(d => d.id === level)?.label}>
      {[1, 2, 3].map(i => (
        <span
          key={i}
          className={`pe-dot ${i <= level ? 'filled' : ''}`}
          style={i <= level ? { background: difficultyLevels.find(d => d.id === level)?.color } : {}}
        />
      ))}
    </span>
  );
}

function BeforeAfter({ example, color }) {
  return (
    <div className="pe-before-after">
      <div className="pe-comparison pe-comparison-bad">
        <div className="pe-comparison-label">
          <span className="pe-comparison-icon pe-bad-icon">&#10007;</span>
          Without Technique
        </div>
        <div className="pe-comparison-prompt">
          <span className="pe-prompt-label">Prompt:</span>
          <p>{example.bad.prompt}</p>
        </div>
        <div className="pe-comparison-response">
          <span className="pe-prompt-label">Response:</span>
          <p>{example.bad.response}</p>
        </div>
      </div>
      <div className="pe-comparison pe-comparison-good" style={{ borderColor: `${color}40` }}>
        <div className="pe-comparison-label" style={{ color }}>
          <span className="pe-comparison-icon pe-good-icon" style={{ background: `${color}20`, color }}>&#10003;</span>
          With Technique
        </div>
        <div className="pe-comparison-prompt">
          <span className="pe-prompt-label">Prompt:</span>
          <p>{example.good.prompt}</p>
        </div>
        <div className="pe-comparison-response">
          <span className="pe-prompt-label">Response:</span>
          <p>{example.good.response}</p>
        </div>
      </div>
    </div>
  );
}

function TechniqueCard({ technique, isExpanded, onToggle, onRelatedClick, index }) {
  const cat = categories.find(c => c.id === technique.category);
  const diff = difficultyLevels.find(d => d.id === technique.difficulty);

  return (
    <motion.div
      className="pe-card"
      style={{ '--pe-accent': technique.color }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      layout
    >
      <div className="pe-card-header" onClick={onToggle}>
        <div className="pe-card-icon" style={{ background: `${technique.color}15`, color: technique.color }}>
          {technique.icon}
        </div>
        <div className="pe-card-info">
          <div className="pe-card-meta">
            <span
              className="pe-category-badge"
              style={{ background: `${cat?.color}18`, color: cat?.color, borderColor: `${cat?.color}40` }}
            >
              {cat?.label}
            </span>
            <span
              className="pe-difficulty-badge"
              style={{ background: `${diff?.color}15`, color: diff?.color }}
            >
              {diff?.label}
            </span>
            <DifficultyDots level={technique.difficulty} />
          </div>
          <h3>{technique.name}</h3>
          <p className="pe-key-principle">{technique.keyPrinciple}</p>
        </div>
        <motion.span
          className="pe-card-chevron"
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          &#9662;
        </motion.span>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="pe-card-expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pe-detail-section">
              <h4>What is it?</h4>
              <p>{technique.description}</p>
            </div>

            <div className="pe-detail-section pe-whenuse-box" style={{ borderColor: `${technique.color}30`, background: `${technique.color}06` }}>
              <h4 style={{ color: technique.color }}>When to Use</h4>
              <p>{technique.whenToUse}</p>
            </div>

            <div className="pe-detail-section">
              <h4>Before &amp; After</h4>
              <BeforeAfter example={technique.example} color={technique.color} />
            </div>

            <div className="pe-detail-section">
              <h4>Code Example</h4>
              <div className="pe-code-block">
                <div className="code-preview-header">
                  <span className="code-preview-dot red" />
                  <span className="code-preview-dot yellow" />
                  <span className="code-preview-dot green" />
                  <span className="code-preview-filename">prompt_example.py</span>
                </div>
                <pre className="code-preview-body"><code>{technique.codeExample}</code></pre>
              </div>
            </div>

            <div className="pe-detail-columns">
              <div className="pe-detail-section">
                <h4 className="pe-tips-heading">Tips</h4>
                <ul className="pe-list pe-list-tips">
                  {technique.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
              </div>
              <div className="pe-detail-section">
                <h4 className="pe-pitfalls-heading">Pitfalls</h4>
                <ul className="pe-list pe-list-pitfalls">
                  {technique.pitfalls.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            </div>

            {technique.relatedTechniques.length > 0 && (
              <div className="pe-related">
                <span className="pe-related-label">Related Techniques:</span>
                <div className="pe-related-tags">
                  {technique.relatedTechniques.map(relId => {
                    const rel = techniques.find(t => t.id === relId);
                    if (!rel) return null;
                    return (
                      <button
                        key={relId}
                        className="pe-related-tag"
                        style={{ borderColor: `${rel.color}40`, color: rel.color }}
                        onClick={(e) => { e.stopPropagation(); onRelatedClick(relId); }}
                      >
                        {rel.icon} {rel.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PromptEngineering() {
  const [expanded, setExpanded] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDifficulty, setActiveDifficulty] = useState(0); // 0 = all

  const toggle = useCallback((id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const scrollToAndExpand = useCallback((id) => {
    setExpanded(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      const el = document.getElementById(`pe-card-${id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }, []);

  const filtered = techniques.filter(t => {
    const catMatch = activeCategory === 'all' || t.category === activeCategory;
    const diffMatch = activeDifficulty === 0 || t.difficulty === activeDifficulty;
    return catMatch && diffMatch;
  });

  return (
    <section className="section" id="prompt-engineering">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">Step 4 &mdash; Master Prompting</span>
        <h2>Prompt Engineering</h2>
        <p>
          You understand AI and can compare models &mdash; now learn to communicate with them effectively.
          {' '}{techniques.length} techniques from basic instructions to advanced multi-step patterns, each with before/after examples.
        </p>
      </motion.div>

      {/* Quick Tips Panel */}
      <motion.div
        className="pe-tips-panel"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="pe-tips-header">
          <span className="pe-tips-icon">{'\uD83D\uDCA1'}</span>
          <div>
            <h3>Quick Tips for Better Prompts</h3>
            <p>Master these fundamentals to get dramatically better results from any AI model.</p>
          </div>
        </div>
        <div className="pe-tips-grid">
          {quickTips.map((tip, i) => (
            <div className="pe-tip-card" key={i}>
              <div className="pe-tip-card-header">
                <span className="pe-tip-num">{i + 1}</span>
                <h4>{tip.title}</h4>
              </div>
              <p>{tip.tip}</p>
              {tip.example && (
                <div className="pe-tip-example">{tip.example}</div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Category Filter */}
      <div className="filter-bar">
        {categories.map(c => (
          <motion.button
            key={c.id}
            className={`filter-chip ${activeCategory === c.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(c.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {c.label}
          </motion.button>
        ))}
      </div>

      {/* Difficulty Filter */}
      <div className="filter-bar" style={{ marginTop: '-4px' }}>
        <motion.button
          className={`filter-chip ${activeDifficulty === 0 ? 'active' : ''}`}
          onClick={() => setActiveDifficulty(0)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          All Levels
        </motion.button>
        {difficultyLevels.map(d => (
          <motion.button
            key={d.id}
            className={`filter-chip ${activeDifficulty === d.id ? 'active' : ''}`}
            onClick={() => setActiveDifficulty(d.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {d.label}
          </motion.button>
        ))}
      </div>

      <p className="filter-count">
        Showing {filtered.length} of {techniques.length} techniques
        {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.label}`}
        {activeDifficulty > 0 && ` (${difficultyLevels.find(d => d.id === activeDifficulty)?.label})`}
      </p>

      {/* Techniques Grid */}
      <div className="pe-grid">
        {filtered.map((technique, i) => (
          <div key={technique.id} id={`pe-card-${technique.id}`}>
            <TechniqueCard
              technique={technique}
              isExpanded={expanded[technique.id]}
              onToggle={() => toggle(technique.id)}
              onRelatedClick={scrollToAndExpand}
              index={i}
            />
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="pe-empty">
            <p>No techniques match your filters. Try adjusting your selection.</p>
          </div>
        )}
      </div>
    </section>
  );
}
