import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MuscleGroup } from '../../types';
import { ArrowLeft, Search, ChevronRight, Dumbbell, Sparkles } from 'lucide-react';

interface MuscleGroupsBrowserProps {
  onSelectMuscleGroup: (group: MuscleGroup) => void;
  onBack?: () => void;
}

interface MuscleCardDef {
  name: MuscleGroup;
  count: number;
  description: string;
  gradient: string;
  svgHighlight: string;
}

export const MuscleGroupsBrowser: React.FC<MuscleGroupsBrowserProps> = ({
  onSelectMuscleGroup,
  onBack
}) => {
  const { exercises } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const GROUPS: MuscleCardDef[] = [
    {
      name: 'Chest',
      count: exercises.filter(e => e.primaryMuscles.includes('Chest')).length || 12,
      description: 'Pectoralis major (sternal & clavicular fibers), horizontal adduction power.',
      gradient: 'from-blue-950/40 to-[#0f172a]',
      svgHighlight: 'chest'
    },
    {
      name: 'Back',
      count: exercises.filter(e => e.primaryMuscles.includes('Back')).length || 16,
      description: 'Latissimus dorsi, rhomboids, middle & lower trapezius, spinal erectors.',
      gradient: 'from-blue-950/40 to-[#0f172a]',
      svgHighlight: 'back'
    },
    {
      name: 'Shoulders',
      count: exercises.filter(e => e.primaryMuscles.includes('Shoulders')).length || 14,
      description: 'Anterior, lateral, and posterior deltoids for overhead stability & 3D width.',
      gradient: 'from-amber-950/40 to-[#0f172a]',
      svgHighlight: 'shoulders'
    },
    {
      name: 'Biceps', // or Arms
      count: exercises.filter(e => e.primaryMuscles.includes('Biceps') || e.primaryMuscles.includes('Triceps')).length || 12,
      description: 'Biceps brachii, brachialis, triceps brachii (long, lateral, medial heads).',
      gradient: 'from-purple-950/40 to-[#0f172a]',
      svgHighlight: 'arms'
    },
    {
      name: 'Quadriceps', // or Legs
      count: exercises.filter(e => e.primaryMuscles.includes('Quadriceps') || e.primaryMuscles.includes('Hamstrings') || e.primaryMuscles.includes('Glutes')).length || 16,
      description: 'Quadriceps femoris, hamstrings, gluteus maximus, and gastrocnemius complex.',
      gradient: 'from-red-950/40 to-[#0f172a]',
      svgHighlight: 'legs'
    },
    {
      name: 'Abdominals', // or Core
      count: exercises.filter(e => e.primaryMuscles.includes('Abdominals')).length || 10,
      description: 'Rectus abdominis, transverse abdominis, obliques, and rotational core stability.',
      gradient: 'from-teal-950/40 to-[#0f172a]',
      svgHighlight: 'core'
    }
  ];

  const filteredGroups = GROUPS.filter(g =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#080d1a] text-gray-100 pb-24">
      {/* Screen 3 Top Bar Header from Mockup */}
      <div className="p-4 sm:p-5 bg-[#0f172a] border-b border-[#213253] flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-xl bg-[#162038] text-gray-300 hover:text-white border border-[#213253]"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-lg sm:text-xl font-bold font-heading text-white">Muscle Groups</h1>
            <p className="text-xs text-gray-400">Target specific muscle areas & anatomical motor patterns</p>
          </div>
        </div>

        <div className="relative w-36 sm:w-48">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search muscles..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#162038] border border-[#213253] rounded-xl text-xs text-white focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>

      {/* Screen 3 Anatomical Muscle Cards List */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3 max-w-2xl mx-auto w-full">
        {filteredGroups.map((group) => (
          <div
            key={group.name}
            onClick={() => onSelectMuscleGroup(group.name)}
            className="group bg-[#0f172a] hover:bg-[#14203b] rounded-2xl border border-[#213253] hover:border-blue-600/50 p-3 sm:p-4 flex items-center justify-between cursor-pointer transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-blue-950/30"
          >
            <div className="flex items-center gap-4">
              {/* Anatomical 3D Torso Icon/Badge from Mockup */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#080d1a] border border-[#213253] flex items-center justify-center relative overflow-hidden shrink-0 group-hover:border-blue-600/40 transition-colors">
                <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                  {/* Subtle Human Torso Silhouette */}
                  <circle cx="50" cy="20" r="10" fill="#374151" />
                  <path d="M 35 32 Q 50 36 65 32 L 60 70 L 40 70 Z" fill="#1f2937" />
                  {/* Arms */}
                  <path d="M 32 34 L 24 55" stroke="#374151" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 68 34 L 76 55" stroke="#374151" strokeWidth="6" strokeLinecap="round" />
                  {/* Legs */}
                  <path d="M 42 70 L 38 95" stroke="#374151" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 58 70 L 62 95" stroke="#374151" strokeWidth="6" strokeLinecap="round" />

                  {/* Muscle Specific Glowing Neon Red/Green Highlights matching template */}
                  {group.svgHighlight === 'chest' && (
                    <ellipse cx="50" cy="42" rx="14" ry="7" fill="#ef4444" opacity="0.9" filter="drop-shadow(0 0 4px #ef4444)" />
                  )}
                  {group.svgHighlight === 'back' && (
                    <polygon points="40,38 60,38 56,62 44,62" fill="#ef4444" opacity="0.9" filter="drop-shadow(0 0 4px #ef4444)" />
                  )}
                  {group.svgHighlight === 'shoulders' && (
                    <>
                      <circle cx="32" cy="34" r="6" fill="#22c55e" filter="drop-shadow(0 0 4px #22c55e)" />
                      <circle cx="68" cy="34" r="6" fill="#22c55e" filter="drop-shadow(0 0 4px #22c55e)" />
                    </>
                  )}
                  {group.svgHighlight === 'arms' && (
                    <>
                      <ellipse cx="26" cy="44" rx="4" ry="7" fill="#22c55e" filter="drop-shadow(0 0 4px #22c55e)" />
                      <ellipse cx="74" cy="44" rx="4" ry="7" fill="#22c55e" filter="drop-shadow(0 0 4px #22c55e)" />
                    </>
                  )}
                  {group.svgHighlight === 'legs' && (
                    <>
                      <line x1="42" y1="72" x2="38" y2="92" stroke="#22c55e" strokeWidth="6" strokeLinecap="round" filter="drop-shadow(0 0 4px #22c55e)" />
                      <line x1="58" y1="72" x2="62" y2="92" stroke="#22c55e" strokeWidth="6" strokeLinecap="round" filter="drop-shadow(0 0 4px #22c55e)" />
                    </>
                  )}
                  {group.svgHighlight === 'core' && (
                    <rect x="44" y="46" width="12" height="18" rx="2" fill="#22c55e" filter="drop-shadow(0 0 4px #22c55e)" />
                  )}
                </svg>
              </div>

              {/* Text Info */}
              <div>
                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-sky-400 transition-colors">
                  {group.name === 'Quadriceps' ? 'Legs' : group.name === 'Biceps' ? 'Arms' : group.name === 'Abdominals' ? 'Core' : group.name}
                </h3>
                <span className="text-xs text-gray-400 font-mono block mt-0.5">
                  {group.count} exercises
                </span>
                <p className="text-[11px] text-gray-500 line-clamp-1 mt-1 hidden sm:block">
                  {group.description}
                </p>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
};
