import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExerciseDifficulty, EquipmentType } from '../../types';
import {
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  Check,
  User,
  HeartPulse,
  Award,
  Sparkles
} from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { profile, updateProfile } = useApp();
  const [step, setStep] = useState<number>(1);

  const [name, setName] = useState<string>(profile.name || 'Athlete');
  const [goal, setGoal] = useState(profile.primaryGoal);
  const [level, setLevel] = useState<ExerciseDifficulty>(profile.experienceLevel);
  const [location, setLocation] = useState(profile.preferredLocation);
  const [limitations, setLimitations] = useState<string>('None');
  const [acknowledgedSafety, setAcknowledgedSafety] = useState<boolean>(false);

  if (profile.onboardingCompleted) {
    return null;
  }

  const handleFinish = () => {
    updateProfile({
      name,
      primaryGoal: goal,
      experienceLevel: level,
      preferredLocation: location,
      physicalLimitations: limitations,
      onboardingCompleted: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-[#0f172a] border border-blue-600/40 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl relative">
        {/* Progress Dots */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  step === s ? 'w-8 bg-sky-400' : 'w-2 bg-[#213253]'
                }`}
              />
            ))}
          </div>

          <span className="text-[10px] font-mono text-sky-400 uppercase">
            Step {step} of 3
          </span>
        </div>

        {/* STEP 1: WELCOME & GOALS */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
                WELCOME TO GYMING RESEARCH ADVANCE
              </span>
              <h2 className="text-xl font-bold font-heading text-white">
                Train Smarter. Build Stronger. Live Healthier.
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Let&apos;s configure your training profile to tailor exercises, volume thresholds, and recovery metrics.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">What should we call you?</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-[#162038] border border-[#213253] rounded-xl text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Primary Fitness Goal:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Hypertrophy', title: 'Hypertrophy', desc: 'Maximum muscle growth' },
                    { id: 'Strength', title: 'Strength', desc: 'Peak 1RM barbell power' },
                    { id: 'Fat Loss & Conditioning', title: 'Fat Loss & Conditioning', desc: 'Cardio & metabolic rate' },
                    { id: 'General Health & Mobility', title: 'Health & Mobility', desc: 'Joint longevity & posture' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id as any)}
                      className={`p-3 text-left rounded-xl border transition-all ${
                        goal === g.id
                          ? 'bg-blue-600/20 text-sky-300 border-blue-600 font-bold'
                          : 'bg-[#162038] text-gray-400 border-[#213253] hover:text-white'
                      }`}
                    >
                      <div className="text-xs">{g.title}</div>
                      <div className="text-[10px] text-gray-400">{g.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: EXPERIENCE & ENVIRONMENT */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold font-heading text-white">Experience & Training Location</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                We adapt exercise complexity and volume based on your training age.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Experience Level:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setLevel(lvl)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        level === lvl
                          ? 'bg-blue-600 text-white font-bold border-sky-400'
                          : 'bg-[#162038] text-gray-400 border-[#213253] hover:text-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Where do you train?</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Gym', label: 'Commercial Gym' },
                    { id: 'Home', label: 'Home / No-Gym' },
                    { id: 'Both', label: 'Hybrid' }
                  ].map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => setLocation(loc.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        location === loc.id
                          ? 'bg-blue-600 text-white font-bold border-sky-400'
                          : 'bg-[#162038] text-gray-400 border-[#213253] hover:text-white'
                      }`}
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Voluntary Physical Limitations (if any):</label>
                <input
                  type="text"
                  value={limitations}
                  onChange={(e) => setLimitations(e.target.value)}
                  placeholder="e.g. Mild knee soreness, shoulder sensitivity..."
                  className="w-full p-2 bg-[#162038] border border-[#213253] rounded-xl text-white"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="py-2.5 px-4 bg-[#162038] text-gray-300 text-xs rounded-xl"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: MEDICAL ADVISORY & SAFETY STANDARD */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono uppercase">
                <HeartPulse className="w-4 h-4" />
                <span>Safety Advisory & Medical Protocol</span>
              </div>
              <h2 className="text-lg font-bold font-heading text-white">Train Safely, Progress Steadily</h2>
            </div>

            <div className="p-3.5 bg-[#162038] border border-amber-500/30 rounded-xl space-y-2 text-xs text-gray-300 leading-relaxed">
              <p>
                <span className="font-bold text-amber-400">Important Health Standard: </span>
                Always warm up dynamically before heavy sets. Stop exercising immediately and consult a healthcare professional if you experience sharp acute pain, chest pain, lightheadedness, or unusual shortness of breath.
              </p>
              <p className="text-gray-400 text-[11px]">
                Gyming Research Advance provides evidence-based sports science education and tracking tools. It does not diagnose medical conditions or substitute for professional physiotherapy treatment.
              </p>
            </div>

            <div
              onClick={() => setAcknowledgedSafety(!acknowledgedSafety)}
              className="flex items-center gap-3 p-3 bg-[#162038] rounded-xl border border-[#213253] cursor-pointer hover:border-blue-600/40 transition-colors"
            >
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                  acknowledgedSafety ? 'bg-blue-600 text-white' : 'border border-gray-600'
                }`}
              >
                {acknowledgedSafety && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span className="text-xs text-gray-300">
                I understand the safety protocol and agree to train responsibly within my current limits.
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(2)}
                className="py-2.5 px-4 bg-[#162038] text-gray-300 text-xs rounded-xl"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                disabled={!acknowledgedSafety}
                className="flex-1 py-3 bg-blue-600 hover:bg-sky-400 disabled:opacity-40 text-black font-bold text-xs rounded-xl shadow-lg shadow-blue-600/20"
              >
                Start Training Smarter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
