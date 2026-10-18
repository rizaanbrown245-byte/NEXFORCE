import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserProfile, EquipmentType, ExerciseDifficulty } from '../../types';
import {
  User,
  Shield,
  Sliders,
  Download,
  Upload,
  RotateCcw,
  Volume2,
  VolumeX,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Info,
  HeartPulse,
  Save,
  Sun,
  Moon
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    profile,
    updateProfile,
    resetOnboarding,
    exportUserData,
    importUserData,
    resetAllDataToDemo,
    isAndroidFrameMode,
    setIsAndroidFrameMode,
    theme,
    setTheme
  } = useApp();

  const [name, setName] = useState<string>(profile.name);
  const [goal, setGoal] = useState(profile.primaryGoal);
  const [level, setLevel] = useState<ExerciseDifficulty>(profile.experienceLevel);
  const [location, setLocation] = useState(profile.preferredLocation);
  const [days, setDays] = useState<number>(profile.availableDaysPerWeek);
  const [duration, setDuration] = useState<number>(profile.sessionDurationMinutes);
  const [limitations, setLimitations] = useState<string>(profile.physicalLimitations);
  const [unitSystem, setUnitSystem] = useState(profile.unitSystem);
  const [soundEnabled, setSoundEnabled] = useState(profile.soundEnabled);

  const [importText, setImportText] = useState<string>('');
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState<boolean>(false);

  const handleSaveProfile = () => {
    updateProfile({
      name,
      primaryGoal: goal,
      experienceLevel: level,
      preferredLocation: location,
      availableDaysPerWeek: days,
      sessionDurationMinutes: duration,
      physicalLimitations: limitations,
      unitSystem,
      soundEnabled
    });
    setSavedSuccessMsg(true);
    setTimeout(() => setSavedSuccessMsg(false), 2500);
  };

  const handleExportData = () => {
    const jsonStr = exportUserData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gyming-research-advance-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    if (!importText.trim()) return;
    const ok = importUserData(importText);
    if (ok) {
      alert('Data imported successfully!');
      setIsImportModalOpen(false);
      setImportText('');
    } else {
      alert('Invalid JSON file format. Please check the backup file.');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#080d1a] text-gray-100 pb-24">
      {/* Header */}
      <div className="p-4 sm:p-5 bg-[#0f172a] border-b border-[#213253]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 neon-glow" />
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
                PROFILE & ATHLETE SETTINGS
              </h1>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Personalized training parameters, unit preferences & data backup
            </p>
          </div>

          <button
            onClick={handleSaveProfile}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>

        {savedSuccessMsg && (
          <div className="mt-3 p-2.5 bg-blue-950/40 border border-blue-600/50 rounded-xl text-xs text-sky-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-400" />
            <span>Settings and training profile updated successfully!</span>
          </div>
        )}
      </div>

      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-6 max-w-3xl mx-auto w-full">
        {/* Medical & Safety Guidance Banner */}
        <div className="bg-[#162038] border border-amber-500/30 p-4 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase font-mono">
            <HeartPulse className="w-4 h-4" />
            <span>Safety First: Exercise Safety & Medical Advisory</span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Stop exercising immediately and seek licensed medical evaluation if you experience sharp acute joint pain, chest tightness, dizziness, nausea, or irregular shortness of breath.
            General training plans do not substitute for personalized medical diagnosis or physiotherapy rehabilitation.
          </p>
        </div>

        {/* Athlete Profile Information */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#213253] space-y-4">
          <h2 className="text-sm font-bold font-heading uppercase text-white flex items-center gap-2">
            <User className="w-4 h-4 text-sky-400" />
            <span>Athlete Profile Configuration</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-gray-400 font-mono block mb-1">Athlete Name / Nickname:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-[#162038] border border-[#213253] rounded-xl text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="text-gray-400 font-mono block mb-1">Primary Training Goal:</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as any)}
                className="w-full p-2.5 bg-[#162038] border border-[#213253] rounded-xl text-white focus:outline-none focus:border-blue-600"
              >
                <option value="Hypertrophy">Hypertrophy (Muscle Accretion)</option>
                <option value="Strength">Max Strength & Power</option>
                <option value="Fat Loss & Conditioning">Fat Loss & Conditioning</option>
                <option value="General Health & Mobility">General Health & Mobility</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 font-mono block mb-1">Experience Level:</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full p-2.5 bg-[#162038] border border-[#213253] rounded-xl text-white focus:outline-none focus:border-blue-600"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 font-mono block mb-1">Preferred Location:</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as any)}
                className="w-full p-2.5 bg-[#162038] border border-[#213253] rounded-xl text-white focus:outline-none focus:border-blue-600"
              >
                <option value="Gym">Commercial Gym</option>
                <option value="Home">Home (No-Gym / Household)</option>
                <option value="Both">Both (Hybrid)</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 font-mono block mb-1">Available Days / Week:</label>
              <input
                type="number"
                min="1"
                max="7"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value) || 4)}
                className="w-full p-2.5 bg-[#162038] border border-[#213253] rounded-xl text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="text-gray-400 font-mono block mb-1">Session Target Duration (min):</label>
              <input
                type="number"
                min="15"
                max="180"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 60)}
                className="w-full p-2.5 bg-[#162038] border border-[#213253] rounded-xl text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-gray-400 font-mono block mb-1">
                Exercise Limitations or Joint Sensitivities (Voluntary):
              </label>
              <input
                type="text"
                value={limitations}
                onChange={(e) => setLimitations(e.target.value)}
                placeholder="e.g. Mild lower back sensitivity, avoid overhead barbell presses..."
                className="w-full p-2.5 bg-[#162038] border border-[#213253] rounded-xl text-white focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
        </div>

        {/* App Preferences & Interface */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#213253] space-y-4">
          <h2 className="text-sm font-bold font-heading uppercase text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            <span>App Preferences</span>
          </h2>

          <div className="space-y-3 text-xs">
            {/* Units */}
            <div className="flex items-center justify-between p-3 bg-[#162038] rounded-xl border border-[#213253]">
              <div>
                <span className="font-bold text-white block">Measurement Unit System</span>
                <span className="text-gray-400 text-[11px]">Kilograms (kg) or Pounds (lbs)</span>
              </div>
              <div className="flex items-center bg-[#0f172a] p-0.5 rounded-lg border border-[#213253]">
                <button
                  onClick={() => setUnitSystem('metric')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    unitSystem === 'metric' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400'
                  }`}
                >
                  Metric (kg)
                </button>
                <button
                  onClick={() => setUnitSystem('imperial')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    unitSystem === 'imperial' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400'
                  }`}
                >
                  Imperial (lbs)
                </button>
              </div>
            </div>

            {/* Appearance Theme Toggle */}
            <div className="flex items-center justify-between p-3 bg-[#162038] rounded-xl border border-[#213253]">
              <div>
                <span className="font-bold text-white block">Appearance & Theme</span>
                <span className="text-gray-400 text-[11px]">Choose between Clean White (Light) and Midnight Sapphire (Dark)</span>
              </div>
              <div className="flex items-center bg-[#0f172a] p-0.5 rounded-lg border border-[#213253]">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                    theme === 'light' ? 'bg-amber-500 text-white font-bold shadow-sm' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                    theme === 'dark' ? 'bg-blue-600 text-white font-bold shadow-sm' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>
              </div>
            </div>

            {/* Sound Chime Toggle */}
            <div className="flex items-center justify-between p-3 bg-[#162038] rounded-xl border border-[#213253]">
              <div className="flex items-center gap-2.5">
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-sky-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-gray-500" />
                )}
                <div>
                  <span className="font-bold text-white block">Workout Audio Chimes</span>
                  <span className="text-gray-400 text-[11px]">Synthesizer sound cues for rest timers & completions</span>
                </div>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                  soundEnabled
                    ? 'bg-blue-600/20 text-sky-400 border-blue-600/50'
                    : 'bg-[#0f172a] text-gray-500 border-[#213253]'
                }`}
              >
                {soundEnabled ? 'Enabled' : 'Muted'}
              </button>
            </div>

            {/* Android Device Simulator Frame */}
            <div className="flex items-center justify-between p-3 bg-[#162038] rounded-xl border border-[#213253]">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-sky-400" />
                <div>
                  <span className="font-bold text-white block">Android Mobile Preview Frame</span>
                  <span className="text-gray-400 text-[11px]">
                    Preview app inside an Android phone bezel with mobile status bar
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsAndroidFrameMode(!isAndroidFrameMode)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                  isAndroidFrameMode
                    ? 'bg-blue-600 text-white font-bold border-sky-400'
                    : 'bg-[#0f172a] text-gray-400 border-[#213253]'
                }`}
              >
                {isAndroidFrameMode ? 'Active' : 'Off'}
              </button>
            </div>
          </div>
        </div>

        {/* Data Architecture, Backup & Reset */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#213253] space-y-3">
          <h2 className="text-sm font-bold font-heading uppercase text-white flex items-center gap-2">
            <Download className="w-4 h-4 text-sky-400" />
            <span>Data Architecture & Offline Backup</span>
          </h2>
          <p className="text-xs text-gray-400">
            All workout logs, personal records, custom routines, and bookmarks are persistently stored locally in your device&apos;s isolated offline storage.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={handleExportData}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#162038] hover:bg-[#1f2d4d] text-sky-400 text-xs font-semibold rounded-xl border border-[#213253]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON Backup</span>
            </button>

            <button
              onClick={() => setIsImportModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 text-xs font-semibold rounded-xl border border-[#213253]"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import JSON Backup</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Reset all demo data back to default state?')) {
                  resetAllDataToDemo();
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#162038] hover:bg-red-950 text-red-400 text-xs font-semibold rounded-xl border border-[#213253]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Import JSON Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-[#213253] rounded-2xl p-5 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-sm text-white">Import Backup JSON Data</h3>
            <p className="text-xs text-gray-400">
              Paste the JSON text from a previous backup file to restore your routines and logs.
            </p>

            <textarea
              rows={6}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder='{"profile": {...}, "workoutLogs": [...]}'
              className="w-full p-2.5 bg-[#162038] border border-[#213253] rounded-xl text-xs font-mono text-white focus:outline-none focus:border-blue-600"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="flex-1 py-2 bg-[#162038] text-gray-300 text-xs rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleImportSubmit}
                disabled={!importText.trim()}
                className="flex-1 py-2 bg-blue-600 disabled:opacity-40 text-black font-bold text-xs rounded-lg"
              >
                Restore Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
