import { createContext, useContext, useReducer, useCallback } from 'react';

const GameContext = createContext();

const initialState = {
  screen: 'title',    // title | level | results
  currentLevel: 0,
  xp: 0,
  streak: 0,
  maxStreak: 0,
  levelsCompleted: {},
  levelScores: {},
  totalLevels: 7,
  particles: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, screen: 'level', currentLevel: 1 };
    case 'GO_TO_LEVEL':
      return { ...state, screen: 'level', currentLevel: action.level };
    case 'ADD_XP': {
      const newXp = state.xp + action.amount;
      return { ...state, xp: newXp };
    }
    case 'BUMP_STREAK': {
      const newStreak = state.streak + 1;
      return {
        ...state,
        streak: newStreak,
        maxStreak: Math.max(newStreak, state.maxStreak)
      };
    }
    case 'RESET_STREAK':
      return { ...state, streak: 0 };
    case 'COMPLETE_LEVEL':
      return {
        ...state,
        levelsCompleted: { ...state.levelsCompleted, [action.level]: true },
        levelScores: {
          ...state.levelScores,
          [action.level]: (state.levelScores[action.level] || 0) + (action.score || 0)
        },
      };
    case 'ADD_LEVEL_SCORE':
      return {
        ...state,
        levelScores: {
          ...state.levelScores,
          [action.level]: (state.levelScores[action.level] || 0) + action.score
        }
      };
    case 'SHOW_RESULTS':
      return { ...state, screen: 'results' };
    case 'RESET':
      return { ...initialState };
    case 'ADD_PARTICLES':
      return { ...state, particles: [...state.particles, ...action.particles] };
    case 'REMOVE_PARTICLE':
      return { ...state, particles: state.particles.filter(p => p.id !== action.id) };
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addXP = useCallback((amount, level) => {
    dispatch({ type: 'ADD_XP', amount });
    dispatch({ type: 'ADD_LEVEL_SCORE', level, score: amount });
    dispatch({ type: 'BUMP_STREAK' });
  }, []);

  const wrongAnswer = useCallback(() => {
    dispatch({ type: 'RESET_STREAK' });
  }, []);

  const completeLevel = useCallback((level, score = 0) => {
    dispatch({ type: 'COMPLETE_LEVEL', level, score });
  }, []);

  const value = { state, dispatch, addXP, wrongAnswer, completeLevel };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
