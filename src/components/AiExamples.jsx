import React from 'react';
import { motion } from 'framer-motion';
import { aiExamplesData } from '../data/examplesData';

const AiExamples = () => {
  return (
    <section id="ai-examples" className="section bg-alt pt-16 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
              What Can You Do With AI?
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Brief examples of how AI can enhance your daily tasks, creativity, and workflows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {aiExamplesData.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300"
              style={{ borderTop: `4px solid ${category.color}` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              <ul className="space-y-3">
                {category.examples.map((example, i) => (
                  <li key={i} className="flex items-start gap-2 text-text-secondary">
                    <span className="text-accent mt-1">•</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiExamples;
