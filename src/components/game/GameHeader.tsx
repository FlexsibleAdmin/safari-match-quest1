import React from 'react';
import { Timer, RotateCcw, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
interface GameHeaderProps {
  moves: number;
  timer: number;
  onRestart: () => void;
}
export function GameHeader({ moves, timer, onRestart }: GameHeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  return (
    <header className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-b-4 border-slate-200 mb-8">
      {/* Logo Area */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-inner border-b-4 border-orange-700">
          <span className="text-2xl">🦁</span>
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-800 leading-none tracking-tight">SAFARI</h1>
          <span className="text-sm font-bold text-orange-500 tracking-widest uppercase">Match Quest</span>
        </div>
      </div>
      {/* Stats Pills */}
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full border-b-4 border-blue-300">
          <Trophy className="w-5 h-5 text-blue-600" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-blue-400 uppercase leading-none">Moves</span>
            <span className="text-lg font-black text-blue-700 leading-none tabular-nums">{moves}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full border-b-4 border-purple-300">
          <Timer className="w-5 h-5 text-purple-600" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-purple-400 uppercase leading-none">Time</span>
            <span className="text-lg font-black text-purple-700 leading-none tabular-nums">{formatTime(timer)}</span>
          </div>
        </div>
      </div>
      {/* Actions */}
      <Button 
        onClick={onRestart}
        className="bg-red-500 hover:bg-red-600 text-white border-b-4 border-red-700 active:border-b-0 active:translate-y-1 rounded-xl font-bold px-6 h-12 transition-all"
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        Restart
      </Button>
    </header>
  );
}