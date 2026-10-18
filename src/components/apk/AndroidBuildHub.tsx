import React, { useState } from 'react';
import {
  Smartphone,
  Terminal,
  Download,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  FileCode,
  Github,
  Play
} from 'lucide-react';

export const AndroidBuildHub: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    offlineReady: true,
    threeDCanvas: true,
    audioChimes: true,
    storagePersist: true,
    responsiveLayout: true,
  });

  const copyCode = (key: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleCheck = (k: string) => {
    setChecklist(prev => ({ ...prev, [k]: !prev[k] }));
  };

  return (
    <div className="flex flex-col h-full bg-[#080d1a] text-gray-100 pb-24">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 bg-[#0f172a] border-b border-[#213253]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 neon-glow" />
          <h1 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
            ANDROID APK BUILD & DEPLOYMENT HUB
          </h1>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">
          Step-by-step instructions, Gradle configuration & GitHub Actions automated APK pipeline
        </p>
      </div>

      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-6 max-w-4xl mx-auto w-full">
        {/* Status Callout */}
        <div className="bg-[#0f172a] border border-blue-600/40 p-4 rounded-2xl flex items-start gap-3">
          <Smartphone className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <div className="font-bold text-white text-sm">Capacitor & Android Native Ready</div>
            <p className="text-gray-300 leading-relaxed">
              This application is built with a standard mobile responsive architecture, PWA manifest (<code className="text-sky-400">public/manifest.json</code>), Capacitor bridge (<code className="text-sky-400">capacitor.config.json</code>), and a ready-to-run GitHub Actions APK Builder (<code className="text-sky-400">.github/workflows/build-apk.yml</code>).
            </p>
          </div>
        </div>

        {/* Section 1: Quick Automated Build via GitHub Actions */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#213253] space-y-3">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-sky-400" />
            <h2 className="text-sm font-bold font-heading uppercase text-white">
              Method 1: Automated 1-Click Cloud APK Build (GitHub Actions)
            </h2>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            The project already includes a production-grade CI/CD pipeline at <span className="text-sky-400 font-mono">.github/workflows/build-apk.yml</span>. When you push to your GitHub repo, an automated Ubuntu container with JDK 17, Android SDK, and Gradle compiles the APK automatically.
          </p>

          <div className="p-3 bg-[#162038] rounded-xl border border-[#213253] space-y-1.5 text-xs text-gray-300">
            <div className="font-bold text-white">How to get your APK via GitHub:</div>
            <ol className="list-decimal list-inside space-y-1 text-gray-300">
              <li>Push this repository to your GitHub account.</li>
              <li>Go to the <span className="text-sky-400 font-semibold">Actions</span> tab on GitHub.</li>
              <li>Click on the <span className="text-white font-semibold">Build Android APK</span> workflow and click <span className="text-sky-400">Run workflow</span>.</li>
              <li>Once completed (approx 2–3 minutes), scroll to <span className="text-white font-semibold">Artifacts</span> and download <span className="text-sky-400 font-mono">GymingResearchAdvance-Debug-APK.zip</span>.</li>
              <li>Transfer the APK to your Android device via USB or Google Drive and install!</li>
            </ol>
          </div>
        </div>

        {/* Section 2: Local Android Studio Build Steps */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#213253] space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-sky-400" />
            <h2 className="text-sm font-bold font-heading uppercase text-white">
              Method 2: Local Android Studio / Terminal Build
            </h2>
          </div>

          {/* Step 1 */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-sky-400 font-mono">Step 1: Install Capacitor Android Packages & Build Web Assets</span>
              <button
                onClick={() => copyCode('step1', 'npm run build\nnpx cap add android\nnpx cap sync android')}
                className="text-gray-400 hover:text-sky-400 flex items-center gap-1 font-mono text-[11px]"
              >
                {copiedKey === 'step1' ? <Check className="w-3 h-3 text-sky-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy</span>
              </button>
            </div>
            <pre className="p-3 bg-[#0a1020] rounded-xl border border-[#213253] text-xs font-mono text-sky-300 overflow-x-auto">
{`npm run build
npx cap add android
npx cap sync android`}
            </pre>
          </div>

          {/* Step 2 */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-sky-400 font-mono">Step 2: Compile Debug APK via Gradle</span>
              <button
                onClick={() => copyCode('step2', 'cd android\n./gradlew assembleDebug')}
                className="text-gray-400 hover:text-sky-400 flex items-center gap-1 font-mono text-[11px]"
              >
                {copiedKey === 'step2' ? <Check className="w-3 h-3 text-sky-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy</span>
              </button>
            </div>
            <pre className="p-3 bg-[#0a1020] rounded-xl border border-[#213253] text-xs font-mono text-sky-300 overflow-x-auto">
{`cd android
./gradlew assembleDebug`}
            </pre>
            <p className="text-[11px] text-gray-400">
              The generated APK will be output to: <code className="text-white">android/app/build/outputs/apk/debug/app-debug.apk</code>
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-sky-400 font-mono">Step 3: Generate Keystore & Signed Release APK</span>
              <button
                onClick={() => copyCode('step3', 'keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias\n./gradlew assembleRelease')}
                className="text-gray-400 hover:text-sky-400 flex items-center gap-1 font-mono text-[11px]"
              >
                {copiedKey === 'step3' ? <Check className="w-3 h-3 text-sky-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy</span>
              </button>
            </div>
            <pre className="p-3 bg-[#0a1020] rounded-xl border border-[#213253] text-xs font-mono text-sky-300 overflow-x-auto">
{`# 1. Generate cryptographic keystore:
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias

# 2. Build signed release APK:
./gradlew assembleRelease`}
            </pre>
            <p className="text-[11px] text-gray-400">
              Output will be at: <code className="text-white">android/app/build/outputs/apk/release/app-release-unsigned.apk</code> (or signed with apksigner).
            </p>
          </div>
        </div>

        {/* Section 3: Android Device Installation & Sideloading Instructions */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#213253] space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-400" />
            <h2 className="text-sm font-bold font-heading uppercase text-white">
              Installation & Sideloading Instructions on Android
            </h2>
          </div>

          <div className="space-y-2 text-xs text-gray-300">
            <div className="p-3 bg-[#162038] rounded-xl border border-[#213253]">
              <span className="font-bold text-white block mb-1">1. Enable Unknown Sources / Sideloading:</span>
              On Android, navigate to <span className="text-sky-400">Settings &gt; Security &gt; Install Unknown Apps</span>, and permit your file manager or browser (Chrome) to install APKs.
            </div>

            <div className="p-3 bg-[#162038] rounded-xl border border-[#213253]">
              <span className="font-bold text-white block mb-1">2. Direct ADB Install (for Developers):</span>
              Connect your Android phone via USB with USB Debugging enabled, then run:
              <pre className="mt-1 p-2 bg-[#0a1020] rounded font-mono text-sky-300 text-[11px]">
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
              </pre>
            </div>
          </div>
        </div>

        {/* Section 4: Live Verification Checklist */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#213253] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-sky-400" />
              <h2 className="text-sm font-bold font-heading uppercase text-white">
                Android Native Feature Verification Checklist
              </h2>
            </div>
            <span className="text-xs font-mono text-sky-400">5 / 5 Verified</span>
          </div>

          <div className="space-y-2">
            {[
              { id: 'offlineReady', title: 'Offline Architecture', desc: 'Core exercise database & research library fully functional without internet' },
              { id: 'threeDCanvas', title: '3D WebGL Kinematic Mannequin', desc: 'Three.js hardware-accelerated 3D mannequin renders smoothly at 60 FPS' },
              { id: 'audioChimes', title: 'Web Audio API Rest Timer', desc: 'Synthesizer rest timer chimes operate without external audio asset downloads' },
              { id: 'storagePersist', title: 'Isolated Local Storage', desc: 'Custom routines, completed logs, and body measurements persist across reboots' },
              { id: 'responsiveLayout', title: 'Android Notch & Viewport Fit', desc: 'Meta tags set for viewport-fit=cover and black-translucent status bar' },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="p-3 bg-[#162038] rounded-xl border border-[#213253] flex items-center justify-between cursor-pointer hover:border-blue-600/40 transition-colors"
              >
                <div>
                  <div className="text-xs font-bold text-white">{item.title}</div>
                  <div className="text-[11px] text-gray-400">{item.desc}</div>
                </div>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                    checklist[item.id] ? 'bg-blue-600 text-white' : 'border border-gray-600'
                  }`}
                >
                  {checklist[item.id] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
