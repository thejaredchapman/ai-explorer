import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiConcepts } from '../data/aiData';

function SectionBlock({ section, index, accent }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <motion.div
      className="detail-section"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08 }}
    >
      <button className="detail-section-toggle" onClick={() => setOpen(!open)}>
        <span className="detail-section-num" style={{ background: `${accent}12`, color: accent }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3>{section.title}</h3>
        <motion.span className="detail-chevron" animate={{ rotate: open ? 180 : 0 }}>▾</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="detail-section-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{section.content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ConceptDetail({ conceptId, onBack }) {
  const concept = aiConcepts.find(c => c.id === conceptId);
  const [activeAppIdx, setActiveAppIdx] = useState(0);

  if (!concept || !concept.detail) return null;
  const d = concept.detail;

  return (
    <motion.div
      className="concept-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Back button */}
      <button className="detail-back" onClick={onBack}>
        ← Back to Concepts
      </button>

      {/* Hero */}
      <div className="detail-hero" style={{ '--accent': concept.color }}>
        <motion.div
          className="detail-hero-icon"
          style={{ background: `${concept.color}12` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
        >
          {concept.icon}
        </motion.div>
        <div className="detail-hero-text">
          <span className="detail-hero-abbr" style={{ color: concept.color }}>{concept.abbr}</span>
          <h1>{concept.title}</h1>
          <p className="detail-headline">{d.headline}</p>
        </div>
      </div>

      {/* Analogy Card */}
      <motion.div
        className="detail-analogy"
        style={{ borderColor: `${concept.color}30` }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="detail-analogy-header">
          <span className="analogy-lamp">💡</span>
          <h4>{d.analogy.title}</h4>
        </div>
        <p>{d.analogy.text}</p>
      </motion.div>

      {/* Deep Dive Sections */}
      <div className="detail-sections">
        <h2 className="detail-group-title">Deep Dive</h2>
        {d.sections.map((section, i) => (
          <SectionBlock key={i} section={section} index={i} accent={concept.color} />
        ))}
      </div>

      {/* Key Terms */}
      <motion.div
        className="detail-terms"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="detail-group-title">Key Terms</h2>
        <div className="terms-grid">
          {d.keyTerms.map((t, i) => (
            <motion.div
              key={t.term}
              className="term-card"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="term-name" style={{ color: concept.color }}>{t.term}</span>
              <span className="term-def">{t.definition}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Real-World Applications */}
      <motion.div
        className="detail-applications"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="detail-group-title">Real-World Applications</h2>
        <div className="app-tabs">
          {d.applications.map((app, i) => (
            <button
              key={app.field}
              className={`app-tab ${activeAppIdx === i ? 'active' : ''}`}
              style={activeAppIdx === i ? { borderColor: concept.color, color: concept.color, background: `${concept.color}08` } : {}}
              onClick={() => setActiveAppIdx(i)}
            >
              {app.field}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAppIdx}
            className="app-detail"
            style={{ borderLeftColor: concept.color }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            <h4>{d.applications[activeAppIdx].field}</h4>
            <p>{d.applications[activeAppIdx].example}</p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Big Picture */}
      <motion.div
        className="detail-big-picture"
        style={{ background: `${concept.color}06`, borderColor: `${concept.color}20` }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="detail-group-title">The Big Picture</h2>
        <p>{d.bigPicture}</p>
      </motion.div>

      {/* Bottom nav */}
      <div className="detail-bottom-nav">
        <button className="btn btn-ghost" onClick={onBack}>← Back to All Concepts</button>
        {(() => {
          const idx = aiConcepts.findIndex(c => c.id === conceptId);
          const next = aiConcepts[idx + 1];
          if (!next) return null;
          return (
            <button
              className="btn btn-dark"
              onClick={() => { onBack(); setTimeout(() => document.querySelector(`[data-concept="${next.id}"]`)?.click(), 100); }}
              style={{ background: next.color }}
            >
              Next: {next.abbr} →
            </button>
          );
        })()}
      </div>
    </motion.div>
  );
}
