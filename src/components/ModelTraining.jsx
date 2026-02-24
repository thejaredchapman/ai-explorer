import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  contentAreas,
  providers,
  timelineEvents,
  trainingTechnologies,
  prosAndCons,
  individualTraining,
} from '../data/modelTrainingData';

function TimelinePanel() {
  const trackRef = useRef(null);

  const scrollTimeline = (dir) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: dir * 260, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className="mt-timeline"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="mt-timeline-header">
        <div>
          <h3>AI Timeline</h3>
          <p>From Turing to today &mdash; the key milestones that shaped modern AI.</p>
        </div>
        <div className="mt-timeline-arrows">
          <button className="mt-timeline-arrow" onClick={() => scrollTimeline(-1)} aria-label="Scroll left">&larr;</button>
          <button className="mt-timeline-arrow" onClick={() => scrollTimeline(1)} aria-label="Scroll right">&rarr;</button>
        </div>
      </div>
      <div className="mt-timeline-track" ref={trackRef}>
        {timelineEvents.map((event, i) => (
          <motion.div
            key={event.year}
            className="mt-timeline-event"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <span className="mt-timeline-year">{event.year}</span>
            <span className="mt-timeline-dot" />
            <span className="mt-timeline-icon">{event.icon}</span>
            <h4>{event.title}</h4>
            <p>{event.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ProsConsPanel() {
  return (
    <motion.div
      className="mt-proscons"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="mt-proscons-column mt-proscons-pros">
        <h3 className="mt-proscons-heading mt-pros-heading">Advantages</h3>
        {prosAndCons.pros.map((item, i) => (
          <motion.div
            key={item.title}
            className="mt-proscons-item mt-pro-item"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <span className="mt-proscons-icon">{item.icon}</span>
            <div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-proscons-column mt-proscons-cons">
        <h3 className="mt-proscons-heading mt-cons-heading">Challenges</h3>
        {prosAndCons.cons.map((item, i) => (
          <motion.div
            key={item.title}
            className="mt-proscons-item mt-con-item"
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <span className="mt-proscons-icon">{item.icon}</span>
            <div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function TrainingTechCard({ tech, isExpanded, onToggle, activeProvider, index }) {
  const prov = providers.find(p => p.id === tech.provider);
  const dimmed = activeProvider !== 'all' && tech.provider !== activeProvider;

  return (
    <motion.div
      className={`mt-card ${dimmed ? 'dimmed' : ''}`}
      style={{ '--mt-accent': tech.color }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: dimmed ? 0.3 : 1, scale: dimmed ? 0.97 : 1 }}
      whileInView={{ opacity: dimmed ? 0.3 : 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      layout
    >
      <div className="mt-card-header" onClick={onToggle}>
        <div className="mt-card-icon" style={{ background: `${tech.color}15`, color: tech.color }}>
          {tech.icon}
        </div>
        <div className="mt-card-info">
          <div className="mt-card-meta">
            <span
              className="mt-provider-badge"
              style={{ background: `${prov?.color}15`, color: prov?.color, borderColor: `${prov?.color}40` }}
            >
              {prov?.label}
            </span>
          </div>
          <h3>{tech.title}</h3>
          <p className="mt-card-summary">{tech.summary}</p>
        </div>
        <motion.span
          className="mt-card-chevron"
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          &#9662;
        </motion.span>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="mt-card-expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-keypoints">
              <h4>Key Points</h4>
              <ul>
                {tech.keyPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="mt-frameworks">
              <span className="mt-frameworks-label">Frameworks & Tools:</span>
              <div className="mt-framework-tags">
                {tech.frameworks.map(f => (
                  <span key={f} className="mt-framework-tag" style={{ borderColor: `${tech.color}40`, color: tech.color }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-related-models">
              <span className="mt-related-models-label">Related Models:</span>
              <div className="mt-framework-tags">
                {tech.relatedModels.map(m => (
                  <span key={m} className="mt-framework-tag">{m}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function IndividualCard({ step, isExpanded, onToggle, index }) {
  return (
    <motion.div
      className="mt-card mt-individual-card"
      style={{ '--mt-accent': step.color }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      layout
    >
      <div className="mt-card-header" onClick={onToggle}>
        <div className="mt-step-number" style={{ background: `${step.color}20`, color: step.color }}>
          {index + 1}
        </div>
        <div className="mt-card-info">
          <h3>{step.title}</h3>
          <p className="mt-card-summary">{step.subtitle}</p>
        </div>
        <motion.span
          className="mt-card-chevron"
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          &#9662;
        </motion.span>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="mt-card-expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-individual-desc">{step.description}</p>

            <div className="mt-keypoints">
              <h4>Key Points</h4>
              <ul>
                {step.keyPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

            {step.codeExample && (
              <div className="mt-code-block">
                <div className="code-preview-header">
                  <span className="code-preview-dot red" />
                  <span className="code-preview-dot yellow" />
                  <span className="code-preview-dot green" />
                  <span className="code-preview-filename">example.py</span>
                </div>
                <pre className="code-preview-body"><code>{step.codeExample}</code></pre>
              </div>
            )}

            {step.approaches && (
              <div className="mt-approaches">
                <h4>Comparison</h4>
                <div className="mt-approaches-table">
                  <div className="mt-approaches-header">
                    {Object.keys(step.approaches[0]).map(key => (
                      <span key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    ))}
                  </div>
                  {step.approaches.map((row, i) => (
                    <div key={i} className="mt-approaches-row">
                      {Object.values(row).map((val, j) => (
                        <span key={j}>{val}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ModelTraining() {
  const [activeContent, setActiveContent] = useState('all');
  const [activeProvider, setActiveProvider] = useState('all');
  const [expanded, setExpanded] = useState({});

  const toggle = useCallback((id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const showTimeline = activeContent === 'all' || activeContent === 'history';
  const showTrainingTech = activeContent === 'all' || activeContent === 'training-tech';
  const showProsCons = activeContent === 'all' || activeContent === 'pros-cons';
  const showIndividual = activeContent === 'all' || activeContent === 'individual';
  const showProviderFilter = activeContent === 'all' || activeContent === 'training-tech';

  const filteredTech = showTrainingTech
    ? trainingTechnologies.filter(t => activeProvider === 'all' || t.provider === activeProvider)
    : [];

  return (
    <section className="section" id="model-training">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">Step 3 &mdash; How Models Are Built</span>
        <h2>Model Training & AI History</h2>
        <p>
          Understand the journey from Turing to today, how modern LLMs are trained,
          their trade-offs, and how you can fine-tune models yourself.
        </p>
      </motion.div>

      {/* Content Area Filter */}
      <div className="filter-bar">
        {contentAreas.map(area => (
          <motion.button
            key={area.id}
            className={`filter-chip ${activeContent === area.id ? 'active' : ''}`}
            onClick={() => setActiveContent(area.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {area.label}
          </motion.button>
        ))}
      </div>

      {/* Provider Filter — only for All Topics or Training Tech */}
      {showProviderFilter && (
        <div className="filter-bar" style={{ marginTop: '-4px' }}>
          {providers.map(p => (
            <motion.button
              key={p.id}
              className={`filter-chip ${activeProvider === p.id ? 'active' : ''}`}
              onClick={() => setActiveProvider(p.id)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={p.color && activeProvider === p.id ? { borderColor: p.color, color: p.color } : {}}
            >
              {p.label}
            </motion.button>
          ))}
        </div>
      )}

      {/* Timeline — always at top when visible */}
      {showTimeline && <TimelinePanel />}

      {/* Pros & Cons */}
      {showProsCons && (
        <>
          <motion.h3
            className="mt-section-subheading"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Pros & Cons of Large Language Models
          </motion.h3>
          <ProsConsPanel />
        </>
      )}

      {/* Training Technologies */}
      {showTrainingTech && (
        <>
          <motion.h3
            className="mt-section-subheading"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Training Technologies by Provider
          </motion.h3>
          <p className="filter-count">
            Showing {filteredTech.length} of {trainingTechnologies.length} technologies
            {activeProvider !== 'all' && ` for ${providers.find(p => p.id === activeProvider)?.label}`}
          </p>
          <div className="mt-grid">
            {filteredTech.map((tech, i) => (
              <TrainingTechCard
                key={tech.id}
                tech={tech}
                isExpanded={expanded[tech.id]}
                onToggle={() => toggle(tech.id)}
                activeProvider={activeProvider}
                index={i}
              />
            ))}
          </div>
        </>
      )}

      {/* Individual Training */}
      {showIndividual && (
        <>
          <motion.h3
            className="mt-section-subheading"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How to Fine-Tune Models Yourself
          </motion.h3>
          <div className="mt-grid">
            {individualTraining.map((step, i) => (
              <IndividualCard
                key={step.id}
                step={step}
                isExpanded={expanded[step.id]}
                onToggle={() => toggle(step.id)}
                index={i}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
