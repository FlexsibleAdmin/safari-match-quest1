import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
export type Card = {
  id: string;
  emoji: string;
  isMatched: boolean;
  isFlipped: boolean;
};
export type GameStatus = 'idle' | 'playing' | 'won';
interface GameState {
  cards: Card[];
  flippedIds: string[];
  moves: number;
  timer: number;
  status: GameStatus;
  isProcessing: boolean;
  // Actions
  startGame: () => void;
  flipCard: (id: string) => void;
  processTurn: () => void;
  tickTimer: () => void;
  resetGame: () => void;
}
const ANIMALS = ['���', '🐘', '🦒', '🐵', '🦓', '🦛', '🐯', '🐨', '🐼', '🐸', '🦊', '🐷'];
export const useGameStore = create<GameState>((set, get) => ({
  cards: [],
  flippedIds: [],
  moves: 0,
  timer: 0,
  status: 'idle',
  isProcessing: false,
  startGame: () => {
    // Generate 12 pairs (24 cards)
    const pairs = [...ANIMALS].slice(0, 12); // Use all 12 for 6x4 grid
    const deck = [...pairs, ...pairs].map((emoji) => ({
      id: uuidv4(),
      emoji,
      isMatched: false,
      isFlipped: false,
    }));
    // Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    set({
      cards: deck,
      flippedIds: [],
      moves: 0,
      timer: 0,
      status: 'playing',
      isProcessing: false,
    });
  },
  flipCard: (id: string) => {
    const { cards, flippedIds, status, isProcessing } = get();
    // Guard clauses
    if (status !== 'playing') return;
    if (isProcessing) return;
    if (flippedIds.length >= 2) return;
    if (flippedIds.includes(id)) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.isMatched) return;
    // Flip the card
    const newCards = cards.map((c) =>
      c.id === id ? { ...c, isFlipped: true } : c
    );
    set({
      cards: newCards,
      flippedIds: [...flippedIds, id],
    });
  },
  processTurn: () => {
    const { cards, flippedIds, moves } = get();
    if (flippedIds.length !== 2) return;
    const [id1, id2] = flippedIds;
    const card1 = cards.find((c) => c.id === id1);
    const card2 = cards.find((c) => c.id === id2);
    if (!card1 || !card2) return;
    const isMatch = card1.emoji === card2.emoji;
    let newCards = [...cards];
    let newStatus: GameStatus = 'playing';
    if (isMatch) {
      newCards = newCards.map((c) =>
        c.id === id1 || c.id === id2 ? { ...c, isMatched: true, isFlipped: true } : c
      );
      // Check win condition
      const allMatched = newCards.every((c) => c.isMatched);
      if (allMatched) {
        newStatus = 'won';
      }
    } else {
      // Unflip if no match
      newCards = newCards.map((c) =>
        c.id === id1 || c.id === id2 ? { ...c, isFlipped: false } : c
      );
    }
    set({
      cards: newCards,
      flippedIds: [],
      moves: moves + 1,
      status: newStatus,
      isProcessing: false,
    });
  },
  tickTimer: () => {
    const { status, timer } = get();
    if (status === 'playing') {
      set({ timer: timer + 1 });
    }
  },
  resetGame: () => {
    set({
      cards: [],
      flippedIds: [],
      moves: 0,
      timer: 0,
      status: 'idle',
      isProcessing: false,
    });
  },
}));