import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

let toastListener = null;

export function showToast(msg, type = 'xp') {
  if (toastListener) toastListener({ msg, type, id: Date.now() });
}

export default function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastListener = (t) => {
      setToasts(prev => [...prev, t]);
      setTimeout(() => {
        setToasts(prev => prev.filter(x => x.id !== t.id));
      }, 2000);
    };
    return () => { toastListener = null; };
  }, []);

  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            className={`toast toast-${t.type}`}
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
          >
            {t.type === 'xp' && '⭐ '}{t.type === 'correct' && '✅ '}{t.type === 'wrong' && '❌ '}{t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
