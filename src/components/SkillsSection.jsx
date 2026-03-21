import { useState } from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../data/skillsData';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('Utility & System');

  const categories = skillsData.map(d => d.category);
  const activeData = skillsData.find(d => d.category === activeCategory) || skillsData[0];

  return (
    <section className="section" id="skills">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', border: '1px solid rgba(236, 72, 153, 0.3)' }}>Advanced AI Agents</span>
        <h2>Claude Code Skills</h2>
        <p>
          Discover powerful user-invocable skills. These specialized agent capabilities provide domain knowledge 
          for engineering, business, marketing, and project management tasks.
        </p>
      </motion.div>

      <div className="filter-bar" style={{ flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
        {categories.map((cat, i) => (
          <motion.button
            key={i}
            className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{ marginBottom: '0.5rem' }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <motion.div 
        className="skills-category-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={activeCategory}
        style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}
      >
        <p>{activeData.description}</p>
      </motion.div>

      <motion.div 
        className="tools-grid" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}
        layout
      >
        {activeData.skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="tool-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'default' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '2rem', padding: '0.75rem', background: 'var(--bg-elevated)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {skill.icon}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{skill.name}</h3>
                <code style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', background: 'var(--bg-elevated)', padding: '0.2rem 0.5rem', borderRadius: '4px', marginTop: '0.3rem', display: 'inline-block' }}>
                  {skill.command}
                </code>
              </div>
            </div>
            
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
              {skill.description}
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
              {skill.tags.map((tag, i) => (
                <span key={i} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '20px', background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
