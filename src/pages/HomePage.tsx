import React, { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Card } from '@/components/game/Card';
import { GameHeader } from '@/components/game/GameHeader';
import { VictoryModal } from '@/components/game/VictoryModal';
import { AppLayout } from '@/components/layout/AppLayout';
export function HomePage() {
  // Zustand selectors - Primitives only to prevent re-renders
  const cards = useGameStore((s) => s.cards);
  const status = useGameStore((s) => s.status);
  const moves = useGameStore((s) => s.moves);
  const timer = useGameStore((s) => s.timer);
  const flippedIds = useGameStore((s) => s.flippedIds);
  // Actions
  const startGame = useGameStore((s) => s.startGame);
  const flipCard = useGameStore((s) => s.flipCard);
  const processTurn = useGameStore((s) => s.processTurn);
  const tickTimer = useGameStore((s) => s.tickTimer);
  const resetGame = useGameStore((s) => s.resetGame);
  // Initialize game on mount
  useEffect(() => {
    startGame();
    return () => resetGame();
  }, [startGame, resetGame]); // Added dependencies to satisfy lint rule
  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (status === 'playing') {
      interval = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status, tickTimer]);
  // Match checking logic with delay
  useEffect(() => {
    if (flippedIds.length === 2) {
      // Lock the board implicitly via store logic, but wait for visual confirmation
      // We set a flag in store usually, but here we just rely on the delay
      // To prevent user from flipping a 3rd card, the store `flipCard` checks `flippedIds.length >= 2`
      const timeoutId = setTimeout(() => {
        processTurn();
      }, 1000); // 1 second delay to see the cards
      return () => clearTimeout(timeoutId);
    }
  }, [flippedIds, processTurn]);
  return (
    <AppLayout container={false} className="bg-jungle-pattern min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 flex flex-col items-center">
        <GameHeader
          moves={moves}
          timer={timer}
          onRestart={startGame}
        />
        <main className="w-full max-w-4xl">
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 md:gap-6 mx-auto">
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                onClick={flipCard}
              />
            ))}
          </div>
        </main>
        <VictoryModal
          isOpen={status === 'won'}
          moves={moves}
          timer={timer}
          onRestart={startGame}
        />
        <footer className="mt-12 text-center text-slate-400 text-sm font-medium">
          <p>Built with ❤��� by Aurelia | Safari Match Quest</p>
        </footer>
      </div>
    </AppLayout>
  );
}