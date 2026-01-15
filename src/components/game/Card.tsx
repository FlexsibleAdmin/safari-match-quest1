import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card as CardType } from '@/store/gameStore';
interface CardProps {
  card: CardType;
  onClick: (id: string) => void;
}
export function Card({ card, onClick }: CardProps) {
  return (
    <div className="relative w-full aspect-[3/4] perspective-1000 group cursor-pointer" onClick={() => onClick(card.id)}>
      <motion.div
        className="w-full h-full relative transform-style-3d transition-all duration-500"
        initial={false}
        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Card Back (Pattern) */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full backface-hidden rounded-2xl shadow-md border-b-4 border-green-600 bg-green-400 flex items-center justify-center",
            "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMiI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiLz48L3N2Zz4=')]"
          )}
        >
          <span className="text-4xl opacity-50">🌿</span>
        </div>
        {/* Card Front (Emoji) */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full backface-hidden rounded-2xl shadow-md border-b-4 border-orange-600 bg-orange-100 flex items-center justify-center rotate-y-180",
            card.isMatched && "border-yellow-500 bg-yellow-100 ring-4 ring-yellow-300 ring-opacity-50"
          )}
        >
          <span className="text-5xl sm:text-6xl select-none filter drop-shadow-sm transform transition-transform hover:scale-110">
            {card.emoji}
          </span>
        </div>
      </motion.div>
    </div>
  );
}