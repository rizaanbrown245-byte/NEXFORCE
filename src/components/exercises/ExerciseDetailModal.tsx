import React, { useState } from 'react';
import { Exercise } from '../../types';
import { useApp } from '../../context/AppContext';
import { VisualExerciseFigure } from '../common/VisualExerciseFigure';
import { TechniqueVideoModal } from '../common/TechniqueVideoModal';
import {
  X,
  Play,
  Box,
  AlertTriangle,
  CheckCircle2,
  Wind,
  Shield,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Zap,
  Activity,
  Video
} from 'lucide-react';

interface ExerciseDetailModalProps {
  exercise: Exercise;
  onClose: () => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({ exercise, onClose }) => {
  const { startWorkout, setSelectedStudioExerciseId, setActiveTab } = useApp();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleLaunch3DStudio = () => {
    setSelectedStudioExerciseId(exercise.id);
    setActiveTab('3d-studio');
    onClose();
  };

  const handleStartWorkout = () => {
    startWorkout(undefined, exercise);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0f172a] border border-[#213253] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 bg-[#0f172a]/95 backdrop-blur-md px-5 py-4 border-b border-[#213253] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 neon-glow" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-heading text-white">{exercise.name}</h2>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-400">
                <span className="text-sky-400 font-semibold">{exercise.category}</span>
                <span>•</span>
                <span>{exercise.difficulty}</span>
                <span>•</span>
                <span>{exercise.primaryMuscles.join(', ')}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 hover:text-white transition-colors border border-[#213253]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-5 space-y-6">
          {/* Visual Representation & 3D CTA */}
          <div className="space-y-3">
            <VisualExerciseFigure type={exercise.vectorVisualType} className="h-56 sm:h-64" />
            
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#162038] p-3 rounded-xl border border-[#213253]">
              <div className="text-xs text-gray-300">
                <span className="text-sky-400 font-semibold">Biomechanical Focus: </span>
                {exercise.biomechanicalFocus}
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 text-xs font-semibold rounded-lg border border-red-500/40 transition-colors shadow-sm"
                  title="Watch Free YouTube Technique Breakdown"
                >
                  <Play className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  <span>Watch Real Video (Free)</span>
                </button>

                {exercise.has3DModel && (
                  <button
                    onClick={handleLaunch3DStudio}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1f2d4d] hover:bg-blue-950 text-sky-300 text-xs font-semibold rounded-lg border border-blue-600/40 transition-colors"
                  >
                    <Activity className="w-3.5 h-3.5 text-sky-400" />
                    <span>Workout Animation</span>
                  </button>
                )}

                <button
                  onClick={handleStartWorkout}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-md transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Track Sets Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Short Summary */}
          <div className="bg-[#162038] p-4 rounded-xl border border-[#213253]">
            <h4 className="text-xs font-mono uppercase text-sky-400 font-bold mb-1">Exercise Overview</h4>
            <p className="text-sm text-gray-300 leading-relaxed">{exercise.shortSummary}</p>
          </div>

          {/* Muscle Anatomy Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#162038] p-3.5 rounded-xl border border-[#213253]">
              <div className="text-xs text-sky-400 font-mono font-bold uppercase mb-1">Primary Target Muscles</div>
              <div className="flex flex-wrap gap-1.5">
                {exercise.primaryMuscles.map(m => (
                  <span key={m} className="px-2.5 py-1 bg-blue-600/10 text-sky-300 text-xs rounded-md border border-blue-600/30 font-medium">
                    {m}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">{exercise.targetMuscles}</p>
            </div>

            <div className="bg-[#162038] p-3.5 rounded-xl border border-[#213253]">
              <div className="text-xs text-gray-400 font-mono font-bold uppercase mb-1">Equipment & Secondary Muscles</div>
              <div className="text-xs text-gray-300 space-y-1">
                <div>
                  <span className="text-gray-400">Equipment: </span>
                  <span className="text-white font-medium">{exercise.equipment.join(', ')}</span>
                </div>
                <div>
                  <span className="text-gray-400">Secondary Muscles: </span>
                  <span className="text-gray-300">{exercise.secondaryMuscles.length ? exercise.secondaryMuscles.join(', ') : 'None / Pure Isolation'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Execution */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-heading uppercase text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>Step-by-Step Execution Protocol</span>
            </h4>

            <div className="bg-[#162038] p-4 rounded-xl border border-[#213253] mb-3">
              <span className="text-xs font-bold text-sky-400 block mb-1">Starting Position:</span>
              <p className="text-xs text-gray-300 leading-relaxed">{exercise.startingPosition}</p>
            </div>

            <div className="space-y-2">
              {exercise.executionSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-[#162038]/70 p-3 rounded-xl border border-[#213253]/80">
                  <span className="w-5 h-5 rounded-full bg-blue-600/20 text-sky-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-gray-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Posture Cues & Breathing Pattern */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#162038] p-4 rounded-xl border border-[#213253]">
              <div className="text-xs font-bold text-sky-400 flex items-center gap-1.5 uppercase font-mono mb-2">
                <Shield className="w-3.5 h-3.5" />
                <span>Posture & Joint Cues</span>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {exercise.postureCues.map((cue, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-400 mt-1">•</span>
                    <span>{cue}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#162038] p-4 rounded-xl border border-[#213253]">
              <div className="text-xs font-bold text-sky-400 flex items-center gap-1.5 uppercase font-mono mb-2">
                <Wind className="w-3.5 h-3.5" />
                <span>Breathing Technique</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{exercise.breathingPattern}</p>
            </div>
          </div>

          {/* Recommended Sets & Reps by Goal */}
          <div className="bg-[#162038] p-4 rounded-xl border border-[#213253]">
            <h4 className="text-xs font-bold font-mono uppercase text-sky-400 mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>Recommended Prescription By Training Goal</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-[#0f172a] p-3 rounded-lg border border-[#213253]">
                <div className="text-sky-400 font-bold mb-1">Hypertrophy (Growth)</div>
                <div className="text-gray-300">{exercise.recommendedSetsReps.hypertrophy}</div>
              </div>
              <div className="bg-[#0f172a] p-3 rounded-lg border border-[#213253]">
                <div className="text-blue-400 font-bold mb-1">Maximum Strength</div>
                <div className="text-gray-300">{exercise.recommendedSetsReps.strength}</div>
              </div>
              <div className="bg-[#0f172a] p-3 rounded-lg border border-[#213253]">
                <div className="text-amber-400 font-bold mb-1">Muscular Endurance</div>
                <div className="text-gray-300">{exercise.recommendedSetsReps.endurance}</div>
              </div>
            </div>
          </div>

          {/* Common Mistakes & Safety Precautions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#162038] p-4 rounded-xl border border-red-500/20">
              <div className="text-xs font-bold text-red-400 flex items-center gap-1.5 uppercase font-mono mb-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Common Mistakes</span>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {exercise.commonMistakes.map((err, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✕</span>
                    <span>{err}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#162038] p-4 rounded-xl border border-amber-500/20">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase font-mono mb-2">
                <Shield className="w-3.5 h-3.5" />
                <span>Safety & Joint Precautions</span>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {exercise.safetyPrecautions.map((safe, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">!</span>
                    <span>{safe}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Variations & Alternatives */}
          <div className="bg-[#162038] p-4 rounded-xl border border-[#213253] space-y-2 text-xs">
            <h4 className="font-mono uppercase font-bold text-sky-400 mb-2">Progression Spectrum</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 bg-[#0f172a] rounded-lg border border-[#213253]">
                <span className="text-gray-400 block mb-0.5">Easier Regression:</span>
                <span className="text-sky-300 font-medium">{exercise.easierVariation}</span>
              </div>
              <div className="p-2.5 bg-[#0f172a] rounded-lg border border-[#213253]">
                <span className="text-gray-400 block mb-0.5">Harder Progression:</span>
                <span className="text-sky-300 font-medium">{exercise.harderVariation}</span>
              </div>
            </div>
            <div className="pt-2">
              <span className="text-gray-400 block mb-1">Suitable Alternatives:</span>
              <div className="flex flex-wrap gap-1.5">
                {exercise.alternatives.map((alt, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-[#1f2d4d] text-gray-200 rounded border border-[#213253]">
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Guidance by Level */}
          <div className="bg-[#162038] p-4 rounded-xl border border-[#213253]">
            <h4 className="text-xs font-mono uppercase text-sky-400 font-bold mb-2">Experience Roadmap</h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-sky-400 font-semibold">Beginner: </span>
                <span className="text-gray-300">{exercise.guidanceByLevel.beginner}</span>
              </div>
              <div>
                <span className="text-blue-400 font-semibold">Intermediate: </span>
                <span className="text-gray-300">{exercise.guidanceByLevel.intermediate}</span>
              </div>
              <div>
                <span className="text-purple-400 font-semibold">Advanced: </span>
                <span className="text-gray-300">{exercise.guidanceByLevel.advanced}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 bg-[#0f172a] border-t border-[#213253] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 text-xs rounded-xl border border-[#213253]"
          >
            Close
          </button>

          <button
            onClick={handleStartWorkout}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/20 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Tracking This Exercise</span>
          </button>
        </div>
      </div>

      {/* Real-life Free YouTube Technique Video Modal */}
      <TechniqueVideoModal
        exercise={exercise}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
};
