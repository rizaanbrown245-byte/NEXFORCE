import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, Award, Trophy, Star, ShieldCheck, Zap, Lock, CheckCircle2 } from 'lucide-react';

interface GamificationBadgesProps {
  compact?: boolean;
}

interface BadgeDef {
  id: string;
  name: string;
  category: 'streak' | 'volume';
  description: string;
  requirement: number;
  currentValue: number;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
}

export const GamificationBadges: React.FC<GamificationBadgesProps> = ({ compact = false }) => {
  const { workoutLogs } = useApp();

  const totalVolumeKg = workoutLogs.reduce((acc, l) => acc + (l.totalVolumeKg || 0), 0);
  const totalWorkouts = workoutLogs.length;

  // Calculate current consistency streak (assuming continuous days with workouts)
  const currentStreak = Math.max(1, totalWorkouts);

  const BADGES: BadgeDef[] = [
    {
      id: 'streak-3',
      name: 'Momentum Builder',
      category: 'streak',
      description: 'Log 3 consecutive workout sessions.',
      requirement: 3,
      currentValue: currentStreak,
      icon: '🔥',
      tier: 'bronze'
    },
    {
      id: 'streak-7',
      name: 'Iron Consistency',
      category: 'streak',
      description: 'Log 7 workouts and maintain unbroken discipline.',
      requirement: 7,
      currentValue: currentStreak,
      icon: '⚡',
      tier: 'silver'
    },
    {
      id: 'streak-14',
      name: 'Habit Titan',
      category: 'streak',
      description: 'Achieve 14 completed training sessions.',
      requirement: 14,
      currentValue: currentStreak,
      icon: '🛡️',
      tier: 'gold'
    },
    {
      id: 'vol-5k',
      name: '5,000 kg Club',
      category: 'volume',
      description: 'Accumulate 5,000 kg of total mechanical lifting workload.',
      requirement: 5000,
      currentValue: totalVolumeKg,
      icon: '🥉',
      tier: 'bronze'
    },
    {
      id: 'vol-25k',
      name: '25,000 kg Powerhouse',
      category: 'volume',
      description: 'Accumulate 25,000 kg of total mechanical volume.',
      requirement: 25000,
      currentValue: totalVolumeKg,
      icon: '🥈',
      tier: 'silver'
    },
    {
      id: 'vol-50k',
      name: 'Colossus 50k',
      category: 'volume',
      description: 'Surpass 50,000 kg lifted across all working sets.',
      requirement: 50000,
      currentValue: totalVolumeKg,
      icon: '🥇',
      tier: 'gold'
    },
    {
      id: 'vol-100k',
      name: 'Diamond Century',
      category: 'volume',
      description: 'Ascend to 100,000 kg total volume milestone.',
      requirement: 100000,
      currentValue: totalVolumeKg,
      icon: '💎',
      tier: 'diamond'
    }
  ];

  if (compact) {
    const unlockedCount = BADGES.filter(b => b.currentValue >= b.requirement).length;
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#111b33] border border-blue-600/30 rounded-xl text-xs font-mono">
        <Flame className="w-4 h-4 text-sky-400 fill-sky-400 animate-pulse" />
        <span className="font-bold text-sky-400">{currentStreak}-Day Streak</span>
        <span className="text-gray-500">•</span>
        <span className="text-gray-300">{unlockedCount} / {BADGES.length} Badges</span>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#213253] space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-sky-400" />
          <div>
            <h3 className="text-sm font-bold font-heading uppercase text-white">
              Consistency Streaks & Volume Milestones
            </h3>
            <p className="text-[11px] text-gray-400">
              Gamified discipline rewards based on real cumulative training history
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/20 text-sky-400 border border-blue-600/40 text-xs font-mono font-bold">
          <Flame className="w-3.5 h-3.5 fill-sky-400" />
          <span>{currentStreak} Days Active</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {BADGES.map((badge) => {
          const isUnlocked = badge.currentValue >= badge.requirement;
          const progressPercent = Math.min(100, Math.round((badge.currentValue / badge.requirement) * 100));

          return (
            <div
              key={badge.id}
              className={`p-3.5 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-gradient-to-b from-[#132040] to-[#121a15] border-blue-600/60 shadow-lg shadow-blue-950/40'
                  : 'bg-[#162038] border-[#213253] opacity-75'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-black/40 border border-[#213253] flex items-center justify-center text-lg">
                    {badge.icon}
                  </div>

                  <span
                    className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                      isUnlocked
                        ? 'bg-blue-600 text-white font-extrabold'
                        : 'bg-[#0f172a] text-gray-400 border border-[#213253]'
                    }`}
                  >
                    {isUnlocked ? 'UNLOCKED' : `${progressPercent}%`}
                  </span>
                </div>

                <div className="font-bold text-xs text-white">{badge.name}</div>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{badge.description}</p>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 pt-2 border-t border-[#1c2948]/80 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span>Progress</span>
                  <span className="text-sky-400 font-bold">
                    {badge.currentValue.toLocaleString()} / {badge.requirement.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#0f172a] rounded-full overflow-hidden">
                  <div
                    style={{ width: `${progressPercent}%` }}
                    className={`h-full transition-all ${
                      isUnlocked ? 'bg-sky-400' : 'bg-blue-600/70'
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
