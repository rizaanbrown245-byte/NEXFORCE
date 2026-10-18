import React, { useState } from 'react';
import {
  Flame,
  Activity,
  Info,
  ChevronRight,
  Layers,
  Eye,
  ShieldCheck,
  Crosshair,
  Sparkles,
  X,
  RotateCcw,
  Target,
  Maximize2
} from 'lucide-react';
import {
  MuscleId,
  ExerciseMuscleHeatmap,
  MuscleActivationInfo,
  getHeatColorForEMG
} from '../../data/muscleHeatmapData';

interface MuscleHeatmapOverlayProps {
  heatmapData: ExerciseMuscleHeatmap;
  selectedMuscleId: MuscleId | null;
  onSelectMuscle: (muscleId: MuscleId | null) => void;
  heatmapMode: 'heatmap' | 'standard' | 'isolation';
  onSetHeatmapMode: (mode: 'heatmap' | 'standard' | 'isolation') => void;
  onFocusCameraToMuscle: (muscle: MuscleActivationInfo) => void;
  currentProgress: number; // 0 to 1 for live contraction readouts
}

export const MuscleHeatmapOverlay: React.FC<MuscleHeatmapOverlayProps> = ({
  heatmapData,
  selectedMuscleId,
  onSelectMuscle,
  heatmapMode,
  onSetHeatmapMode,
  onFocusCameraToMuscle,
  currentProgress
}) => {
  const [activeTab, setActiveTab] = useState<'roster' | 'body-map'>('roster');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Sorted muscles by EMG activation percentage
  const sortedMuscles = Object.values(heatmapData.muscles).sort(
    (a, b) => b.emgPercent - a.emgPercent
  );

  const selectedMuscle = selectedMuscleId ? heatmapData.muscles[selectedMuscleId] : null;

  // Real-time live dynamic contraction intensity
  const dynamicTensionMultiplier =
    currentProgress > 0.5 ? (currentProgress - 0.5) * 2 : 1 - currentProgress * 2;

  return (
    <div className="flex flex-col bg-[#0f172a]/95 backdrop-blur-md rounded-2xl border border-[#213253] shadow-2xl overflow-hidden transition-all duration-300">
      {/* Heatmap Header */}
      <div className="p-3.5 bg-[#162038] border-b border-[#213253] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600/30 to-sky-500/20 border border-blue-500/40 flex items-center justify-center text-sky-400">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs sm:text-sm font-bold font-heading text-white">
                Muscle Activation Heatmap
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/20 text-sky-300 border border-blue-500/40">
                EMG Scientific
              </span>
            </div>
            <p className="text-[10px] text-gray-400">
              Targeted muscle recruitment for {heatmapData.exerciseName}
            </p>
          </div>
        </div>

        {/* Mode Toggles */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-[#0a1020] p-0.5 rounded-xl border border-[#213253] text-[10px] font-mono">
            <button
              onClick={() => onSetHeatmapMode('heatmap')}
              className={`px-2 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                heatmapMode === 'heatmap'
                  ? 'bg-sky-500 text-black font-bold shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Thermodynamic EMG Heatmap"
            >
              <Flame className="w-3 h-3" />
              <span className="hidden sm:inline">EMG</span>
            </button>
            <button
              onClick={() => onSetHeatmapMode('isolation')}
              className={`px-2 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                heatmapMode === 'isolation'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Isolate Targeted Muscle"
            >
              <Target className="w-3 h-3" />
              <span className="hidden sm:inline">Isolate</span>
            </button>
            <button
              onClick={() => onSetHeatmapMode('standard')}
              className={`px-2 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                heatmapMode === 'standard'
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Standard Bio Highlight"
            >
              <Layers className="w-3 h-3" />
              <span className="hidden sm:inline">Normal</span>
            </button>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 transition-colors text-xs border border-[#213253]"
            title={isExpanded ? 'Collapse Heatmap' : 'Expand Heatmap'}
          >
            {isExpanded ? '▾' : '▴'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-3.5 space-y-3 max-h-[380px] overflow-y-auto">
          {/* Heatmap Spectrum Legend Bar */}
          <div className="p-2.5 bg-[#162038] rounded-xl border border-[#213253] space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
              <span className="flex items-center gap-1 text-red-400">
                <span className="w-2 h-2 rounded-full bg-[#ef4444]" /> Primary (88–100%)
              </span>
              <span className="flex items-center gap-1 text-orange-400">
                <span className="w-2 h-2 rounded-full bg-[#f97316]" /> Synergist (72–87%)
              </span>
              <span className="flex items-center gap-1 text-yellow-400">
                <span className="w-2 h-2 rounded-full bg-[#eab308]" /> Active (52–71%)
              </span>
              <span className="flex items-center gap-1 text-sky-400">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8]" /> Stabilizer (35–51%)
              </span>
            </div>
            {/* Gradient Spectrum Bar */}
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-[#2563eb] via-[#38bdf8] via-[#eab308] via-[#f97316] to-[#ef4444] shadow-inner" />
          </div>

          {/* Sub-Tabs: Muscle List vs Anatomical Body Map */}
          <div className="flex items-center justify-between border-b border-[#213253] pb-2 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('roster')}
                className={`px-3 py-1 rounded-lg font-mono transition-colors ${
                  activeTab === 'roster'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Target Muscle Ranking ({sortedMuscles.length})
              </button>
              <button
                onClick={() => setActiveTab('body-map')}
                className={`px-3 py-1 rounded-lg font-mono transition-colors ${
                  activeTab === 'body-map'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Anatomical Map
              </button>
            </div>

            {selectedMuscleId && (
              <button
                onClick={() => onSelectMuscle(null)}
                className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1 font-mono"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Show All</span>
              </button>
            )}
          </div>

          {/* TAB 1: TARGET MUSCLE RANKING LIST */}
          {activeTab === 'roster' && (
            <div className="space-y-2">
              {sortedMuscles.map((muscle) => {
                const isSelected = selectedMuscleId === muscle.id;
                const heat = getHeatColorForEMG(muscle.emgPercent);
                const livePercent = Math.round(
                  muscle.emgPercent * (0.65 + dynamicTensionMultiplier * 0.35)
                );

                return (
                  <div
                    key={muscle.id}
                    onClick={() => {
                      onSelectMuscle(isSelected ? null : muscle.id);
                      onFocusCameraToMuscle(muscle);
                    }}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#182645] border-blue-400 shadow-lg shadow-blue-500/15'
                        : 'bg-[#162038] border-[#213253] hover:bg-[#1c2948]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: muscle.heatColor }}
                        />
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>{muscle.name}</span>
                            {muscle.role === 'primary' && (
                              <span className="px-1.5 py-0.2 bg-red-500/20 text-red-400 rounded text-[9px] font-mono border border-red-500/40">
                                Primary Mover
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-gray-400 italic">
                            {muscle.latinName}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className="text-xs font-mono font-bold"
                          style={{ color: muscle.heatColor }}
                        >
                          {muscle.emgPercent}% EMG
                        </div>
                        <div className="text-[9px] font-mono text-gray-400">
                          Live: {livePercent}%
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar with heat color */}
                    <div className="w-full bg-[#0a1020] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${muscle.emgPercent}%`,
                          backgroundColor: muscle.heatColor
                        }}
                      />
                    </div>

                    {/* Expanded details when selected */}
                    {isSelected && (
                      <div className="mt-2.5 pt-2 border-t border-[#213253] space-y-1.5 text-[11px]">
                        <div className="text-gray-300 flex items-start gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-white">Role:</strong> {muscle.functionInExercise}
                          </span>
                        </div>
                        <div className="text-sky-300 flex items-start gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-white">Form Cue:</strong> {muscle.cue}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] text-gray-400 font-mono">
                            Contraction: {muscle.contractionType}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onFocusCameraToMuscle(muscle);
                            }}
                            className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] flex items-center gap-1 shadow-sm transition-colors"
                          >
                            <Crosshair className="w-3 h-3" />
                            <span>Orbit to Joint</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: ANATOMICAL BODY MAP (INTERACTIVE HEAT ZONES) */}
          {activeTab === 'body-map' && (
            <div className="p-3 bg-[#162038] rounded-xl border border-[#213253] space-y-3">
              <div className="text-center text-[11px] text-gray-400">
                Click any anatomical region to isolate muscle fibers & recruitment:
              </div>

              {/* Grid of anatomical muscle zone buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {sortedMuscles.map((muscle) => {
                  const isSelected = selectedMuscleId === muscle.id;
                  return (
                    <button
                      key={muscle.id}
                      onClick={() => {
                        onSelectMuscle(isSelected ? null : muscle.id);
                        onFocusCameraToMuscle(muscle);
                      }}
                      className={`p-2 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-blue-400 bg-blue-600/20 shadow-md shadow-blue-500/20'
                          : 'border-[#213253] bg-[#0f172a] hover:bg-[#182645]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold text-white truncate">
                          {muscle.name}
                        </span>
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: muscle.heatColor }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-gray-400 capitalize">{muscle.bodyRegion}</span>
                        <span
                          className="font-bold"
                          style={{ color: muscle.heatColor }}
                        >
                          {muscle.emgPercent}%
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedMuscle && (
                <div className="p-2.5 rounded-xl bg-[#0f172a] border border-blue-500/40 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sky-400 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5" />
                      <span>{selectedMuscle.name}</span>
                    </span>
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                      style={{
                        backgroundColor: `${selectedMuscle.heatColor}20`,
                        color: selectedMuscle.heatColor
                      }}
                    >
                      {selectedMuscle.emgPercent}% EMG
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-300">{selectedMuscle.functionInExercise}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
