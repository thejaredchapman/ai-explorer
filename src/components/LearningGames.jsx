import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { llmModels } from '../data/llmData';
import { toolTopics } from '../data/aiToolsData';
import { aiConcepts } from '../data/aiData';

// ── Game 1: Concept Flashcards ──
function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Combine some models, tools, and concepts for the flashcards
  const cards = [
    { term: "GPT-5.4", def: llmModels.find(m => m.name === 'GPT-5.4')?.description || "OpenAI's most intelligent reasoning model." },
    ...toolTopics.slice(0, 6).map(t => ({ term: t.title, def: t.summary })),
    ...aiConcepts.slice(0, 6).map(c => ({ term: c.title, def: c.brief }))
  ];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => (prev + 1) % cards.length), 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length), 150);
  };

  return (
    <div className="game-container" style={{ textAlign: 'center', padding: '2rem' }}>
      <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Concept Flashcards</h3>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>Click the card to flip it and learn key AI terms.</p>
      
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: '1000px', cursor: 'pointer', margin: '0 auto', maxWidth: '400px', height: '250px' }}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
          style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div style={{
            position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
            background: 'var(--bg-elevated)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid var(--border-color)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)', padding: '2rem'
          }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', margin: 0 }}>{cards[currentIndex].term}</h2>
          </div>
          
          {/* Back */}
          <div style={{
            position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
            background: 'var(--accent-primary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: 'rotateY(180deg)', padding: '2rem', color: '#fff', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)'
          }}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.5', margin: 0 }}>{cards[currentIndex].def}</p>
          </div>
        </motion.div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
        <button className="nav-button" onClick={handlePrev}>&larr; Previous</button>
        <span style={{ padding: '0.5rem 1rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}>
          {currentIndex + 1} / {cards.length}
        </span>
        <button className="nav-button" onClick={handleNext}>Next &rarr;</button>
      </div>
    </div>
  );
}

// ── Game 2: Model Matchmaker ──
function ModelMatchmaker() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const questions = [
    {
      scenario: "I need the absolute maximum intelligence and reasoning capability available, and cost is no object.",
      correct: "GPT-5.4",
      options: ["GPT-4.1-mini", "GPT-5.4", "o4-mini"]
    },
    {
      scenario: "I need to run an autonomous CLI agent to refactor my entire codebase while I sleep.",
      correct: "Claude Code",
      options: ["Claude Code", "ChatGPT Agent Mode", "GitHub Copilot"]
    },
    {
      scenario: "I need an open-source personal AI assistant framework that I can self-host and connect to WhatsApp.",
      correct: "OpenClaw",
      options: ["OpenClaw", "CrewAI", "LangChain"]
    },
    {
      scenario: "I want an AI to autonomously research a topic, click around websites, and compile a report without using APIs.",
      correct: "Computer Use",
      options: ["Computer Use", "Embeddings", "Federated Learning"]
    },
    {
      scenario: "I need to orchestrate a team of multiple AI agents with specific roles and goals to write a research paper.",
      correct: "CrewAI",
      options: ["LangChain", "CrewAI", "OpenClaw"]
    },
    {
      scenario: "I want to build a highly controllable, stateful, multi-actor application using graphs for agentic workflows.",
      correct: "LangGraph",
      options: ["LangGraph", "Embeddings", "Claude Code"]
    },
    {
      scenario: "I need a fast multimodal model that has a huge context window and strong native tool use capabilities.",
      correct: "Gemini 3.5 Pro",
      options: ["Gemini 3.5 Pro", "Llama 3", "GPT-4.1-mini"]
    },
    {
      scenario: "I want a local, powerful LLM running on my own hardware without sending data to cloud APIs.",
      correct: "Llama 3",
      options: ["GPT-5.4", "Llama 3", "Claude 3.5 Sonnet"]
    },
    {
      scenario: "I need to easily connect language models to external data sources and document loaders to build a RAG application.",
      correct: "LangChain",
      options: ["LangChain", "Computer Use", "CrewAI"]
    }
  ];

  const handleGuess = (option) => {
    if (feedback) return; // Prevent double clicking
    const isCorrect = option === questions[currentQuestion].correct;
    
    setFeedback({
      isCorrect,
      message: isCorrect ? "Correct! 🎯" : `Not quite. The best fit is ${questions[currentQuestion].correct}.`
    });

    if (isCorrect) setScore(s => s + 1);

    setTimeout(() => {
      setFeedback(null);
      setCurrentQuestion((prev) => (prev + 1) % questions.length);
    }, 2000);
  };

  return (
    <div className="game-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', background: 'var(--bg-elevated)', borderRadius: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>Model Matchmaker</h3>
        <span style={{ background: 'var(--accent-primary)', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
          Score: {score}
        </span>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Match the scenario to the correct AI Model or Tool.</p>
      
      <div style={{ background: 'var(--bg-main)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', minHeight: '100px', display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)' }}>
        <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-primary)' }}>"{questions[currentQuestion].scenario}"</p>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {questions[currentQuestion].options.map(opt => (
          <motion.button
            key={opt}
            whileHover={{ scale: feedback ? 1 : 1.02 }}
            whileTap={{ scale: feedback ? 1 : 0.98 }}
            onClick={() => handleGuess(opt)}
            disabled={feedback !== null}
            style={{
              padding: '1rem',
              fontSize: '1.1rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-main)',
              color: 'var(--text-primary)',
              cursor: feedback ? 'default' : 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'background 0.2s, border-color 0.2s'
            }}
          >
            {opt}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              borderRadius: '8px',
              background: feedback.isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${feedback.isCorrect ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
              color: feedback.isCorrect ? '#10b981' : '#ef4444',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            {feedback.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LearningGames() {
  const [activeGame, setActiveGame] = useState('flashcards');

  return (
    <section className="section" id="learning-games">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', border: '1px solid rgba(139, 92, 246, 0.3)' }}>Interactive Learning</span>
        <h2>Knowledge Games</h2>
        <p>Test your understanding of the latest AI models, tools, and concepts.</p>
      </motion.div>

      <div className="filter-bar" style={{ justifyContent: 'center', marginBottom: '3rem' }}>
        <button 
          className={`filter-chip ${activeGame === 'flashcards' ? 'active' : ''}`}
          onClick={() => setActiveGame('flashcards')}
        >
          🃏 Concept Flashcards
        </button>
        <button 
          className={`filter-chip ${activeGame === 'matchmaker' ? 'active' : ''}`}
          onClick={() => setActiveGame('matchmaker')}
        >
          🧩 Model Matchmaker
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeGame}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {activeGame === 'flashcards' ? <Flashcards /> : <ModelMatchmaker />}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
