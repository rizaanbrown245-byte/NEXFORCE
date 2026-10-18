import React from 'react';

interface VisualExerciseFigureProps {
  type: string;
  className?: string;
  highlightColor?: string; // neon green by default
  animated?: boolean;
}

export const VisualExerciseFigure: React.FC<VisualExerciseFigureProps> = ({
  type,
  className = 'w-full h-48',
  highlightColor = '#3b82f6',
}) => {
  // SVG vector illustration tailored for each exercise type
  switch (type) {
    case 'bench-press':
    case 'incline-db-press':
      return (
        <div className={`relative flex items-center justify-center bg-[#0a1020] rounded-xl overflow-hidden border border-[#1c2948] ${className}`}>
          <div className="absolute top-2 left-2 text-[10px] tracking-widest font-mono text-sky-400/80 uppercase">
            Biomechanical Visual: Pectoral Force Vector
          </div>
          <svg viewBox="0 0 320 180" className="w-full h-full p-2">
            <defs>
              <linearGradient id="neonGlowBench" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {/* Bench structure */}
            <rect x="50" y="125" width="220" height="12" rx="3" fill="#213253" />
            <rect x="70" y="137" width="16" height="30" fill="#162038" />
            <rect x="234" y="137" width="16" height="30" fill="#162038" />
            <rect x="60" y="80" width="8" height="60" fill="#2d3f35" />
            
            {/* Athlete Torso Supine */}
            <path d="M 90 120 Q 150 116 210 120" stroke="#4b5563" strokeWidth="14" strokeLinecap="round" fill="none" />
            
            {/* Target Muscle: Chest Highlight */}
            <ellipse cx="145" cy="112" rx="18" ry="9" fill="url(#neonGlowBench)" filter="drop-shadow(0 0 6px rgba(16,185,129,0.8))" />
            <text x="145" y="96" fill="#3b82f6" fontSize="9" textAnchor="middle" fontWeight="bold">PECTORALIS MAJOR</text>
            <path d="M 145 100 L 145 106" stroke="#3b82f6" strokeWidth="1.5" />
            
            {/* Head and Legs */}
            <circle cx="80" cy="116" r="12" fill="#374151" />
            <path d="M 210 120 L 235 135 L 245 165" stroke="#4b5563" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            
            {/* Arms & Barbell */}
            <path d="M 135 116 L 122 85 L 145 60" stroke="#9ca3af" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M 155 116 L 168 85 L 145 60" stroke="#9ca3af" strokeWidth="7" strokeLinecap="round" fill="none" />
            
            {/* Barbell & Plates */}
            <line x1="85" y1="58" x2="205" y2="58" stroke="#e5e7eb" strokeWidth="4" />
            <rect x="90" y="44" width="8" height="28" rx="2" fill="#ef4444" />
            <rect x="99" y="48" width="6" height="20" rx="2" fill="#3b82f6" />
            <rect x="185" y="48" width="6" height="20" rx="2" fill="#3b82f6" />
            <rect x="192" y="44" width="8" height="28" rx="2" fill="#ef4444" />
            
            {/* Trajectory Arrow */}
            <path d="M 145 62 L 145 92" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
            <polygon points="145,95 141,88 149,88" fill="#38bdf8" />
          </svg>
        </div>
      );

    case 'squat':
      return (
        <div className={`relative flex items-center justify-center bg-[#0a1020] rounded-xl overflow-hidden border border-[#1c2948] ${className}`}>
          <div className="absolute top-2 left-2 text-[10px] tracking-widest font-mono text-sky-400/80 uppercase">
            Biomechanical Visual: Squat Depth & Knee Tracking
          </div>
          <svg viewBox="0 0 320 200" className="w-full h-full p-2">
            {/* Floor Plane */}
            <line x1="40" y1="180" x2="280" y2="180" stroke="#213253" strokeWidth="3" />
            
            {/* Parallel Reference Line */}
            <line x1="100" y1="130" x2="220" y2="130" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            <text x="230" y="133" fill="#38bdf8" fontSize="8" fontWeight="bold">PARALLEL PLANE</text>
            
            {/* Feet */}
            <ellipse cx="140" cy="180" rx="14" ry="4" fill="#374151" />
            <ellipse cx="180" cy="180" rx="14" ry="4" fill="#374151" />
            
            {/* Tibia & Fibula (Lower Legs) */}
            <line x1="140" y1="180" x2="132" y2="130" stroke="#6b7280" strokeWidth="10" strokeLinecap="round" />
            <line x1="180" y1="180" x2="188" y2="130" stroke="#6b7280" strokeWidth="10" strokeLinecap="round" />
            
            {/* Femur (Thigh) - Quads Highlighted */}
            <line x1="132" y1="130" x2="152" y2="135" stroke="#3b82f6" strokeWidth="13" strokeLinecap="round" filter="drop-shadow(0 0 8px rgba(16,185,129,0.9))" />
            <line x1="188" y1="130" x2="168" y2="135" stroke="#3b82f6" strokeWidth="13" strokeLinecap="round" filter="drop-shadow(0 0 8px rgba(16,185,129,0.9))" />
            
            {/* Pelvis & Glute Highlight */}
            <ellipse cx="160" cy="138" rx="16" ry="11" fill="#38bdf8" opacity="0.9" filter="drop-shadow(0 0 7px rgba(0,255,135,0.7))" />
            <text x="90" y="110" fill="#3b82f6" fontSize="9" fontWeight="bold">QUADRICEPS & GLUTES</text>
            <path d="M 120 115 L 145 130" stroke="#3b82f6" strokeWidth="1.5" />
            
            {/* Spine & Torso with optimal forward angle */}
            <line x1="160" y1="138" x2="160" y2="78" stroke="#4b5563" strokeWidth="14" strokeLinecap="round" />
            <circle cx="160" cy="60" r="13" fill="#374151" />
            
            {/* Arms holding barbell */}
            <path d="M 160 80 L 140 76 L 150 72" stroke="#9ca3af" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 160 80 L 180 76 L 170 72" stroke="#9ca3af" strokeWidth="6" strokeLinecap="round" fill="none" />
            
            {/* Barbell resting on Upper Traps */}
            <line x1="80" y1="72" x2="240" y2="72" stroke="#f3f4f6" strokeWidth="4.5" />
            <rect x="85" y="52" width="10" height="40" rx="3" fill="#ef4444" />
            <rect x="96" y="58" width="8" height="28" rx="2" fill="#3b82f6" />
            <rect x="216" y="58" width="8" height="28" rx="2" fill="#3b82f6" />
            <rect x="225" y="52" width="10" height="40" rx="3" fill="#ef4444" />
            
            {/* Center of Gravity Plumb Line */}
            <line x1="160" y1="40" x2="160" y2="180" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
            <text x="160" y="32" fill="#f59e0b" fontSize="8" textAnchor="middle" fontWeight="bold">MIDFOOT CENTER OF GRAVITY</text>
          </svg>
        </div>
      );

    case 'deadlift':
    case 'rdl':
      return (
        <div className={`relative flex items-center justify-center bg-[#0a1020] rounded-xl overflow-hidden border border-[#1c2948] ${className}`}>
          <div className="absolute top-2 left-2 text-[10px] tracking-widest font-mono text-sky-400/80 uppercase">
            Biomechanical Visual: Hip Hinge Posterior Chain
          </div>
          <svg viewBox="0 0 320 200" className="w-full h-full p-2">
            <line x1="40" y1="180" x2="280" y2="180" stroke="#213253" strokeWidth="3" />
            
            {/* Foot */}
            <ellipse cx="150" cy="180" rx="18" ry="5" fill="#374151" />
            {/* Shin (nearly vertical) */}
            <line x1="150" y1="180" x2="148" y2="128" stroke="#6b7280" strokeWidth="10" strokeLinecap="round" />
            
            {/* Hamstrings (Hips pushed back) */}
            <line x1="148" y1="128" x2="115" y2="108" stroke="#3b82f6" strokeWidth="13" strokeLinecap="round" filter="drop-shadow(0 0 8px rgba(16,185,129,0.9))" />
            {/* Gluteus Maximus Highlight */}
            <circle cx="112" cy="104" r="14" fill="#38bdf8" filter="drop-shadow(0 0 8px rgba(0,255,135,0.8))" />
            
            {/* Neutral Spine extending forward at ~45 deg */}
            <line x1="115" y1="104" x2="175" y2="70" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round" filter="drop-shadow(0 0 5px rgba(16,185,129,0.6))" />
            {/* Head */}
            <circle cx="188" cy="62" r="12" fill="#374151" />
            
            {/* Arm hanging straight down with bar */}
            <line x1="168" y1="74" x2="152" y2="135" stroke="#9ca3af" strokeWidth="7" strokeLinecap="round" />
            
            {/* Barbell Plates at floor level */}
            <circle cx="152" cy="155" r="24" fill="#ef4444" opacity="0.8" />
            <circle cx="152" cy="155" r="16" fill="#1f2937" />
            <circle cx="152" cy="155" r="5" fill="#f3f4f6" />
            <line x1="152" y1="135" x2="152" y2="175" stroke="#f3f4f6" strokeWidth="4" />
            
            {/* Biomechanical Cues */}
            <text x="75" y="80" fill="#38bdf8" fontSize="9" fontWeight="bold">POSTERIOR CHAIN STRETCH</text>
            <path d="M 95 85 L 115 100" stroke="#38bdf8" strokeWidth="1.5" />
            
            <text x="210" y="110" fill="#f59e0b" fontSize="8" fontWeight="bold">BAR AGAINST SHIN</text>
            <line x1="205" y1="112" x2="155" y2="138" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        </div>
      );

    case 'ohp':
    case 'lateral-raise':
      return (
        <div className={`relative flex items-center justify-center bg-[#0a1020] rounded-xl overflow-hidden border border-[#1c2948] ${className}`}>
          <div className="absolute top-2 left-2 text-[10px] tracking-widest font-mono text-sky-400/80 uppercase">
            Biomechanical Visual: Overhead Deltoid Alignment
          </div>
          <svg viewBox="0 0 320 200" className="w-full h-full p-2">
            <line x1="40" y1="185" x2="280" y2="185" stroke="#213253" strokeWidth="3" />
            
            {/* Legs standing straight */}
            <line x1="148" y1="185" x2="150" y2="125" stroke="#4b5563" strokeWidth="10" strokeLinecap="round" />
            <line x1="172" y1="185" x2="170" y2="125" stroke="#4b5563" strokeWidth="10" strokeLinecap="round" />
            
            {/* Torso & Glutes locked */}
            <line x1="160" y1="125" x2="160" y2="75" stroke="#4b5563" strokeWidth="14" strokeLinecap="round" />
            <circle cx="160" cy="58" r="12" fill="#374151" />
            
            {/* Deltoids Highlighted */}
            <ellipse cx="140" cy="74" rx="10" ry="7" fill="#3b82f6" filter="drop-shadow(0 0 7px rgba(16,185,129,0.9))" />
            <ellipse cx="180" cy="74" rx="10" ry="7" fill="#3b82f6" filter="drop-shadow(0 0 7px rgba(16,185,129,0.9))" />
            
            {/* Arms extending overhead */}
            <path d="M 140 74 L 135 48 L 150 25" stroke="#9ca3af" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 180 74 L 185 48 L 170 25" stroke="#9ca3af" strokeWidth="6" strokeLinecap="round" fill="none" />
            
            {/* Barbell locked out overhead */}
            <line x1="90" y1="23" x2="230" y2="23" stroke="#f3f4f6" strokeWidth="4" />
            <rect x="95" y="10" width="8" height="26" rx="2" fill="#ef4444" />
            <rect x="217" y="10" width="8" height="26" rx="2" fill="#ef4444" />
            
            {/* Plumb Line */}
            <line x1="160" y1="10" x2="160" y2="185" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <text x="210" y="65" fill="#3b82f6" fontSize="9" fontWeight="bold">DELTOIDS & CORE BRACED</text>
          </svg>
        </div>
      );

    case 'pullup':
      return (
        <div className={`relative flex items-center justify-center bg-[#0a1020] rounded-xl overflow-hidden border border-[#1c2948] ${className}`}>
          <div className="absolute top-2 left-2 text-[10px] tracking-widest font-mono text-sky-400/80 uppercase">
            Biomechanical Visual: Latissimus Dorsi Adduction
          </div>
          <svg viewBox="0 0 320 200" className="w-full h-full p-2">
            {/* Overhead Bar */}
            <line x1="60" y1="25" x2="260" y2="25" stroke="#e5e7eb" strokeWidth="5" />
            <circle cx="115" cy="25" r="5" fill="#9ca3af" />
            <circle cx="205" cy="25" r="5" fill="#9ca3af" />
            
            {/* Head clearing bar */}
            <circle cx="160" cy="22" r="13" fill="#374151" />
            
            {/* Arms flexing down */}
            <path d="M 115 25 L 128 55 L 148 58" stroke="#9ca3af" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M 205 25 L 192 55 L 172 58" stroke="#9ca3af" strokeWidth="7" strokeLinecap="round" fill="none" />
            
            {/* Back V-Taper / Lats Highlighted */}
            <polygon points="148,58 172,58 165,115 155,115" fill="#3b82f6" filter="drop-shadow(0 0 10px rgba(16,185,129,0.9))" />
            <text x="160" y="85" fill="#000" fontSize="8" fontWeight="bold" textAnchor="middle">LATS</text>
            
            {/* Legs hanging straight in hollow body */}
            <line x1="160" y1="115" x2="160" y2="175" stroke="#4b5563" strokeWidth="10" strokeLinecap="round" />
            <ellipse cx="160" cy="180" rx="6" ry="3" fill="#374151" />
            
            <text x="215" y="90" fill="#38bdf8" fontSize="9" fontWeight="bold">SCAPULAR DEPRESSION</text>
            <path d="M 210 92 L 175 75" stroke="#38bdf8" strokeWidth="1.5" />
          </svg>
        </div>
      );

    case 'pushup':
    case 'dips':
      return (
        <div className={`relative flex items-center justify-center bg-[#0a1020] rounded-xl overflow-hidden border border-[#1c2948] ${className}`}>
          <div className="absolute top-2 left-2 text-[10px] tracking-widest font-mono text-sky-400/80 uppercase">
            Biomechanical Visual: Closed Kinetic Chain Push
          </div>
          <svg viewBox="0 0 320 180" className="w-full h-full p-2">
            <line x1="40" y1="150" x2="280" y2="150" stroke="#213253" strokeWidth="3" />
            
            {/* Rigid Straight Line / Plank Alignment */}
            <line x1="75" y1="140" x2="235" y2="115" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            
            {/* Feet on toes */}
            <circle cx="75" cy="144" r="5" fill="#374151" />
            {/* Legs */}
            <line x1="75" y1="144" x2="140" y2="130" stroke="#4b5563" strokeWidth="9" strokeLinecap="round" />
            
            {/* Torso */}
            <line x1="140" y1="130" x2="220" y2="115" stroke="#4b5563" strokeWidth="12" strokeLinecap="round" />
            {/* Chest Highlight */}
            <ellipse cx="205" cy="118" rx="14" ry="7" fill="#3b82f6" filter="drop-shadow(0 0 7px rgba(16,185,129,0.9))" />
            
            {/* Head */}
            <circle cx="238" cy="110" r="11" fill="#374151" />
            
            {/* Hand on floor & Arm at 45 deg */}
            <line x1="205" y1="150" x2="195" y2="128" stroke="#9ca3af" strokeWidth="6" strokeLinecap="round" />
            <line x1="195" y1="128" x2="210" y2="118" stroke="#9ca3af" strokeWidth="6" strokeLinecap="round" />
            
            <text x="140" y="90" fill="#3b82f6" fontSize="9" fontWeight="bold">CHEST & CORE TENSION</text>
            <path d="M 170 95 L 195 112" stroke="#3b82f6" strokeWidth="1.5" />
          </svg>
        </div>
      );

    default:
      return (
        <div className={`relative flex items-center justify-center bg-[#0a1020] rounded-xl overflow-hidden border border-[#1c2948] ${className}`}>
          <div className="absolute top-2 left-2 text-[10px] tracking-widest font-mono text-sky-400/80 uppercase">
            Biomechanical Anatomy Visual
          </div>
          <svg viewBox="0 0 320 180" className="w-full h-full p-2">
            <circle cx="160" cy="40" r="16" fill="#374151" />
            <line x1="160" y1="56" x2="160" y2="115" stroke="#4b5563" strokeWidth="14" strokeLinecap="round" />
            {/* Muscle highlight */}
            <ellipse cx="160" cy="85" rx="16" ry="14" fill="#3b82f6" filter="drop-shadow(0 0 8px rgba(16,185,129,0.8))" />
            <path d="M 160 65 L 130 90 L 115 120" stroke="#9ca3af" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M 160 65 L 190 90 L 205 120" stroke="#9ca3af" strokeWidth="7" strokeLinecap="round" fill="none" />
            <line x1="155" y1="115" x2="140" y2="165" stroke="#4b5563" strokeWidth="9" strokeLinecap="round" />
            <line x1="165" y1="115" x2="180" y2="165" stroke="#4b5563" strokeWidth="9" strokeLinecap="round" />
            <text x="160" y="145" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">TARGET MUSCLE ZONE</text>
          </svg>
        </div>
      );
  }
};
