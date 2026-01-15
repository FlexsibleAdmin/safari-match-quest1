import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
interface VictoryModalProps {
  isOpen: boolean;
  moves: number;
  timer: number;
  onRestart: () => void;
}
export function VictoryModal({ isOpen, moves, timer, onRestart }: VictoryModalProps) {
  useEffect(() => {
    if (isOpen) {
      const duration = 3000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#4ADE80', '#FACC15', '#FB923C']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#4ADE80', '#FACC15', '#FB923C']
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isOpen]);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };
  // Calculate stars based on moves (simple logic: < 20 moves = 3 stars, < 30 = 2 stars, else 1)
  const stars = moves <= 20 ? 3 : moves <= 30 ? 2 : 1;
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md bg-white border-4 border-yellow-400 rounded-3xl shadow-2xl p-0 overflow-hidden">
        <div className="bg-yellow-400 p-6 text-center">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-yellow-900 uppercase tracking-wider">
              Safari Champion!
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="p-8 flex flex-col items-center gap-6">
          {/* Stars */}
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: i <= stars ? 1 : 0.8, rotate: 0 }}
                transition={{ delay: i * 0.2, type: 'spring' }}
              >
                <Star 
                  className={`w-12 h-12 ${i <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 fill-slate-200'}`} 
                  strokeWidth={3}
                />
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 text-center">
              <p className="text-xs font-bold text-slate-400 uppercase">Total Moves</p>
              <p className="text-2xl font-black text-slate-700">{moves}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 text-center">
              <p className="text-xs font-bold text-slate-400 uppercase">Time Taken</p>
              <p className="text-2xl font-black text-slate-700">{formatTime(timer)}</p>
            </div>
          </div>
          <Button 
            onClick={onRestart}
            className="w-full bg-green-500 hover:bg-green-600 text-white border-b-4 border-green-700 active:border-b-0 active:translate-y-1 rounded-xl font-bold py-6 text-lg transition-all"
          >
            <RotateCcw className="w-6 h-6 mr-2" />
            Play Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}