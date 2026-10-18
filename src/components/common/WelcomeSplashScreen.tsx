import React from 'react';
import { GymLogo } from './GymLogo';
import { ChevronRight, ShieldCheck, Sparkles, Activity } from 'lucide-react';

interface WelcomeSplashScreenProps {
  onGetStarted: () => void;
  onLogIn: () => void;
}

export const WelcomeSplashScreen: React.FC<WelcomeSplashScreenProps> = ({
  onGetStarted,
  onLogIn
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#080d1a] text-white p-6 overflow-hidden select-none">
      {/* Background 3D Athletic Figure from Template Screen 1 */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen overflow-hidden">
        <img
          src="/src/assets/images/app_hero_3d_1791810105161.jpg"
          alt="Gyming Research Advance 3D Athlete"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#080d1a]/80 to-transparent" />
      </div>

      {/* Top Brand Tag */}
      <div className="relative z-10 pt-4 flex justify-center">
        <div className="px-3.5 py-1 rounded-full bg-blue-600/10 border border-blue-600/30 text-[10px] font-mono text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span>RESEARCH-BASED WORKOUTS & 3D VISUALS</span>
        </div>
      </div>

      {/* Center Branding matching Screen 1 */}
      <div className="relative z-10 text-center space-y-4 max-w-sm mx-auto my-auto">
        {/* Emblem Logo */}
        <div className="flex justify-center">
          <GymLogo size="lg" showText={false} />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-wide text-white">
            Gyming Research
          </h1>
          <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-wider text-sky-400 drop-shadow-[0_0_12px_rgba(34,197,94,0.6)]">
            Advance
          </h2>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs font-mono text-gray-300">
          <span>Science</span>
          <span className="text-sky-400">•</span>
          <span>Strength</span>
          <span className="text-sky-400">•</span>
          <span>Results</span>
        </div>
      </div>

      {/* Bottom CTA Buttons matching Screen 1 */}
      <div className="relative z-10 space-y-3 max-w-sm mx-auto w-full pb-4">
        <button
          onClick={onGetStarted}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
        >
          <span>Get Started</span>
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          onClick={onLogIn}
          className="w-full py-3.5 bg-transparent hover:bg-white/5 text-gray-200 hover:text-white font-bold text-sm rounded-2xl border border-gray-700 transition-colors"
        >
          Log In
        </button>

        <div className="text-center pt-2 text-[10px] text-gray-500 font-mono">
          &quot;Train Smarter • Build Stronger • Live Healthier&quot;
        </div>
      </div>
    </div>
  );
};
