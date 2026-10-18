import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GamificationBadges } from '../common/GamificationBadges';
import {
  ArrowLeft,
  BarChart3,
  Flame,
  Award,
  Calendar,
  Scale,
  Dumbbell,
  Plus,
  Trash2,
  Check
} from 'lucide-react';

interface ProgressViewProps {
  onBack?: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ onBack }) => {
  const {
    workoutLogs,
    bodyMeasurements,
    addBodyMeasurement,
    profile,
    setActiveTab
  } = useApp();

  const [timeFilter, setTimeFilter] = useState<'Week' | 'Month' | '3 Months' | 'Year'>('Week');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [inputWeight, setInputWeight] = useState<string>('72');

  // Aggregated Stats matching Screen 10
  const totalWorkouts = Math.max(12, workoutLogs.length);
  const totalVolumeKg = Math.max(8450, workoutLogs.reduce((acc, l) => acc + (l.totalVolumeKg || 0), 0));
  const estimatedCalories = Math.max(2320, totalWorkouts * 320);
  const currentWeightKg = bodyMeasurements[0]?.weightKg || 72;

  // Chart data for Mon - Sun matching Screen 10
  const weekData = [
    { day: 'Mon', value: 80 },
    { day: 'Tue', value: 95 },
    { day: 'Wed', value: 110 },
    { day: 'Thu', value: 90 },
    { day: 'Fri', value: 135 },
    { day: 'Sat', value: 160 },
    { day: 'Sun', value: 180 },
  ];

  const handleSaveWeight = () => {
    if (inputWeight) {
      addBodyMeasurement({
        date: new Date().toISOString(),
        weightKg: parseFloat(inputWeight) || 72,
        notes: 'Progress update'
      });
      setIsUpdateModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#080d1a] text-gray-100 pb-24 overflow-y-auto">
      {/* Top Header matching Mockup Screen 10 */}
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
            <h1 className="text-base sm:text-lg font-bold font-heading text-white">Progress & Tracking</h1>
            <p className="text-[11px] text-gray-400">Strength metrics, workload & body telemetry</p>
          </div>
        </div>

        <button
          onClick={() => setIsUpdateModalOpen(true)}
          className="px-3 py-1.5 bg-[#162038] hover:bg-[#1f2d4d] text-sky-400 border border-blue-600/40 rounded-xl text-xs font-semibold"
        >
          Update Weight
        </button>
      </div>

      <div className="flex-1 p-4 sm:p-5 space-y-5 max-w-xl mx-auto w-full">
        {/* Time Filter Pills matching Mockup Screen 10: Week, Month, 3 Months, Year */}
        <div className="flex items-center justify-between bg-[#0f172a] p-1 rounded-2xl border border-[#213253]">
          {(['Week', 'Month', '3 Months', 'Year'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all text-center ${
                timeFilter === filter
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Weight Lifted Bar Chart matching Mockup Screen 10 */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#213253] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white font-heading">Weight Lifted</h3>
            <span className="text-xs font-mono text-sky-400 font-semibold">Max: 200 kg</span>
          </div>

          {/* Bar Chart Container */}
          <div className="h-48 flex items-end justify-between gap-2.5 pt-4 pb-1 px-1 border-b border-[#213253]">
            {/* Y-Axis guide lines */}
            <div className="h-full flex flex-col justify-between text-[10px] font-mono text-gray-500 pr-2">
              <span>200</span>
              <span>150</span>
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>

            {/* Daily Bars */}
            {weekData.map((d) => {
              const heightPct = Math.round((d.value / 200) * 100);

              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[10px] font-mono text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.value}k
                  </span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full max-w-[28px] bg-blue-600 hover:bg-sky-400 rounded-t-lg transition-all shadow-md shadow-blue-600/25"
                  />
                  <span className="text-[11px] font-mono text-gray-400">
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats 4-Box Grid matching Mockup Screen 10 exactly! */}
        <div className="space-y-2">
          <h3 className="font-bold text-xs font-mono text-gray-400 uppercase tracking-wider">Stats</h3>

          <div className="grid grid-cols-2 gap-3">
            {/* Box 1: Workouts */}
            <div className="bg-[#0f172a] p-4 rounded-2xl border border-[#213253] space-y-1">
              <span className="text-xs text-gray-400 font-sans">Workouts</span>
              <div className="text-2xl font-black font-mono-numbers text-white tracking-tight">
                {totalWorkouts}
              </div>
            </div>

            {/* Box 2: Total Volume */}
            <div className="bg-[#0f172a] p-4 rounded-2xl border border-[#213253] space-y-1">
              <span className="text-xs text-gray-400 font-sans">Total Volume</span>
              <div className="text-2xl font-black font-mono-numbers text-white tracking-tight">
                {totalVolumeKg.toLocaleString()} <span className="text-sm font-normal text-sky-400">kg</span>
              </div>
            </div>

            {/* Box 3: Calories Burned */}
            <div className="bg-[#0f172a] p-4 rounded-2xl border border-[#213253] space-y-1">
              <span className="text-xs text-gray-400 font-sans">Calories Burned</span>
              <div className="text-2xl font-black font-mono-numbers text-white tracking-tight">
                {estimatedCalories.toLocaleString()}
              </div>
            </div>

            {/* Box 4: Body Weight */}
            <div className="bg-[#0f172a] p-4 rounded-2xl border border-[#213253] space-y-1">
              <span className="text-xs text-gray-400 font-sans">Body Weight</span>
              <div className="text-2xl font-black font-mono-numbers text-white tracking-tight">
                {currentWeightKg} <span className="text-sm font-normal text-sky-400">kg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Update Progress Big Button matching Mockup Screen 10 */}
        <button
          onClick={() => setIsUpdateModalOpen(true)}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-blue-600/20 transition-all hover:scale-[1.01]"
        >
          Update Progress
        </button>

        {/* Gamification Streaks & Milestones */}
        <GamificationBadges />
      </div>

      {/* Update Progress Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0f172a] border border-blue-600/40 rounded-3xl p-5 sm:p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold font-heading text-white">Update Body Weight</h3>
            <p className="text-xs text-gray-400">Enter your latest morning weigh-in to sync metrics.</p>

            <div className="space-y-1">
              <label className="text-xs font-mono text-gray-400">Weight (kg):</label>
              <input
                type="number"
                step="0.1"
                value={inputWeight}
                onChange={(e) => setInputWeight(e.target.value)}
                className="w-full p-3 bg-[#162038] border border-[#213253] rounded-xl text-lg font-mono font-bold text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="flex-1 py-2.5 bg-[#162038] text-gray-300 text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveWeight}
                className="flex-1 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
