import React from 'react';
import { Exercise } from '../../types';
import { getTechniqueVideoForExercise } from '../../data/techniqueVideosData';
import { TechniqueVideoPlayer } from './TechniqueVideoPlayer';
import { X, Box, Video, Dumbbell, ExternalLink, Activity, Play } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TechniqueVideoModalProps {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
  onOpen3DAnimation?: (exerciseId: string) => void;
}

export const TechniqueVideoModal: React.FC<TechniqueVideoModalProps> = ({
  exercise,
  isOpen,
  onClose,
  onOpen3DAnimation
}) => {
  const { setSelectedStudioExerciseId, setActiveTab } = useApp();

  if (!isOpen || !exercise) return null;

  const videoData = getTechniqueVideoForExercise(exercise.id, exercise.category);

  const handleSwitchTo3D = () => {
    setSelectedStudioExerciseId(exercise.id);
    setActiveTab('3d-studio');
    onClose();
    if (onOpen3DAnimation) {
      onOpen3DAnimation(exercise.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0f172a] border border-blue-600/40 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl shadow-blue-950/50">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#0a1020] border-b border-[#213253] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <Play className="w-5 h-5 fill-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                  {exercise.name}
                </h3>
                <span className="px-2 py-0.5 rounded bg-red-600/20 text-red-400 font-mono text-[10px] font-bold border border-red-500/30">
                  FREE YOUTUBE VIDEO
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Free YouTube form breakdown, slow-mo review & angle cues
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSwitchTo3D}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#162038] hover:bg-[#1f2d4d] text-sky-400 border border-blue-600/40 rounded-xl text-xs font-semibold"
            >
              <Activity className="w-4 h-4 text-sky-400" />
              <span>Workout Animation</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-xl bg-[#162038] border border-[#213253]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          <TechniqueVideoPlayer
            exercise={exercise}
            videoData={videoData}
            onOpen3D={handleSwitchTo3D}
          />

          {/* Quick Target Muscles & Safety Brief */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-[#0a1020] rounded-xl border border-[#213253]">
              <span className="text-[10px] font-mono text-gray-400 uppercase font-bold block mb-1">
                Target Muscles Worked
              </span>
              <div className="text-xs text-sky-300 font-semibold">
                {exercise.targetMuscles}
              </div>
            </div>

            <div className="p-3 bg-[#0a1020] rounded-xl border border-[#213253]">
              <span className="text-[10px] font-mono text-gray-400 uppercase font-bold block mb-1">
                Equipment Needed
              </span>
              <div className="text-xs text-white font-medium">
                {exercise.equipment.join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
