import React from 'react';

interface GymLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  textColor?: string;
}

export const GymLogo: React.FC<GymLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textColor = 'text-white'
}) => {
  const iconSize = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-14 h-14' : 'w-10 h-10';
  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-xl' : 'text-sm sm:text-base';
  const subTextSize = size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-xs' : 'text-[10px]';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Weightlifter with Barbell Electric Blue Emblem */}
      <div className={`relative ${iconSize} shrink-0 flex items-center justify-center`}>
        <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-[0_0_10px_rgba(59,130,246,0.65)]">
          {/* Barbell weights */}
          <rect x="2" y="32" width="6" height="16" rx="2" fill="#2563eb" />
          <rect x="9" y="30" width="5" height="20" rx="2" fill="#38bdf8" />
          <rect x="86" y="30" width="5" height="20" rx="2" fill="#38bdf8" />
          <rect x="92" y="32" width="6" height="16" rx="2" fill="#2563eb" />
          {/* Barbell bar */}
          <rect x="14" y="38" width="72" height="4" rx="2" fill="#93c5fd" />

          {/* Muscular Body Silhouette */}
          {/* Head */}
          <circle cx="50" cy="18" r="8" fill="#3b82f6" />
          {/* Trapezius & Neck */}
          <path d="M 42 24 L 58 24 L 64 32 L 36 32 Z" fill="#3b82f6" />
          {/* Muscular Chest & Torso */}
          <path d="M 36 32 Q 50 38 64 32 L 60 56 Q 50 58 40 56 Z" fill="#1d4ed8" />
          {/* Biceps Left */}
          <ellipse cx="28" cy="38" rx="8" ry="6" fill="#3b82f6" transform="rotate(-15 28 38)" />
          {/* Forearm Left */}
          <path d="M 22 40 L 16 38 L 18 42 L 26 44 Z" fill="#60a5fa" />
          {/* Biceps Right */}
          <ellipse cx="72" cy="38" rx="8" ry="6" fill="#3b82f6" transform="rotate(15 72 38)" />
          {/* Forearm Right */}
          <path d="M 78 40 L 84 38 L 82 42 L 74 44 Z" fill="#60a5fa" />
          {/* Core Abs highlight */}
          <line x1="50" y1="36" x2="50" y2="52" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <line x1="45" y1="42" x2="55" y2="42" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="46" y1="47" x2="54" y2="47" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-heading font-black tracking-wide leading-none ${textSize} ${textColor}`}>
            Gyming Research
          </span>
          <span className={`font-heading font-black tracking-wider leading-tight text-sky-400 ${textSize}`}>
            Advance
          </span>
          <span className={`font-mono text-gray-400 tracking-tight leading-none mt-0.5 ${subTextSize}`}>
            Train Smarter • Build Stronger • Live Healthier
          </span>
        </div>
      )}
    </div>
  );
};
