import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ShieldAlert,
  BookOpen,
  RefreshCw,
  Copy,
  Check,
  FileQuestion,
  HelpCircle,
  Dumbbell
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  source?: 'gemini-3.8-flash' | 'sports-science-engine';
  timestamp: string;
}

const PRESET_QUESTIONS = [
  'Which exercises train my chest?',
  'How do I perform a squat correctly?',
  'What is progressive overload in simple terms?',
  'What does research say about weekly training volume?',
  'How can I build muscle at home with no equipment?',
  'What is the difference between strength and hypertrophy?'
];

export const AIAssistantView: React.FC = () => {
  const { exercises } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Hello! I am your AI Fitness Research Assistant for Gyming Research Advance.

I am grounded in peer-reviewed exercise science, biomechanics, and evidence-based hypertrophy & strength research (ACSM, NSCA, Schoenfeld, Morton, Helms).

You can ask me questions about:
• Exercise technique & biomechanical joint cues
• Designing customized gym or home workout routines
• Explaining scientific studies and meta-analyses in plain language
• Progressive overload, weekly volume, and recovery principles

*Educational Disclaimer: I provide sports science education, not personalized medical or physical therapy advice. Always stop exercising if you experience acute pain.*`,
      source: 'sports-science-engine',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'simplifier'>('chat');
  const [studyTextToSimplify, setStudyTextToSimplify] = useState<string>('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Built-in intelligent sports science fallback engine
  const generateOfflineKnowledgeResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('chest') || q.includes('pec')) {
      const chestEx = exercises.filter(e => e.primaryMuscles.includes('Chest'));
      return `### Evidence-Based Chest Training Overview:
The Pectoralis Major has two main fiber orientations: the sternal (mid/lower) head and the clavicular (upper) head.

**Optimal Exercise Selection:**
1. **Barbell Bench Press / Dumbbell Press**: Maximizes overall horizontal adduction and mechanical tension in the lengthened-to-mid range.
2. **Incline Dumbbell Press (30° Incline)**: Emphasizes the clavicular head by aligning humeral movement with upper pectoral fiber angles.
3. **Parallel Bar Dips / Push-ups**: Closed-chain adduction allowing natural scapular motion.
4. **Cables / Dumbbell Flyes**: Provides peak tension in the fully contracted shortened range.

**Volume Recommendation**: 10 to 18 total hard sets per week, distributed across 2 separate sessions for maximum muscle protein synthesis.`;
    }

    if (q.includes('squat') || q.includes('leg')) {
      return `### How to Perform a Biomechanically Correct Squat:
1. **Stance & Setup**: Stand with feet roughly shoulder-width apart, toes flared outward 15°–30° to accommodate individual femoral-acetabular anatomy.
2. **Bracing**: Take a 360° diaphragmatic breath, brace intra-abdominal pressure as if absorbing a punch, and pull the barbell tight against your upper traps.
3. **Descent**: Break simultaneously at the hips and knees, sitting down between thighs while actively pushing knees out in line with your toes.
4. **Depth**: Descend until the hip crease dips below the top of the patella (below parallel) or to the deepest active range without lumbar spinal flexion ("butt wink").
5. **Ascent**: Drive the floor away through your mid-foot tripod, maintaining identical torso angle through the sticking point.`;
    }

    if (q.includes('progressive overload')) {
      return `### What is Progressive Overload?
Progressive overload is the gradual increase of stress placed on the neuromuscular system over time to stimulate continuous adaptation.

**4 Ways to Achieve Overload Without Just Adding Weight:**
1. **Rep Progression**: Increasing reps with the same weight (e.g. 8 reps → 10 reps @ 80kg).
2. **Range of Motion & Quality**: Sinking squats 2 inches deeper, or eliminating chest bounces.
3. **Eccentric Cadence**: Controlling the downward negative for 2–3 seconds to maximize mechanical tension.
4. **Load (Weight)**: Adding 1–2.5kg once you hit the top of your target repetition bracket.`;
    }

    if (q.includes('volume') || q.includes('sets per week')) {
      return `### Current Sports Science on Training Volume:
Based on meta-analyses by Schoenfeld, Ogborn, & Krieger (2017) and Baz-Valle et al. (2022):
• **Maintenance / Beginners**: 6–9 hard sets per muscle group per week.
• **Optimal Growth Bracket**: 10–20 direct sets per muscle group per week.
• **Junk Volume Threshold**: Beyond 22–25 sets in a single week for a single muscle group, fatigue accumulation outpaces adaptive response.
• **Per-Session Cap**: Limit individual workouts to 6–10 hard sets per muscle group before returns diminish.`;
    }

    if (q.includes('home') || q.includes('no equipment') || q.includes('bodyweight')) {
      return `### Effective Muscle Building at Home Without Equipment:
Mechanical tension does not require a gym membership—it requires placing muscle fibers near failure (0–2 Reps in Reserve).

**High-Yield Home Progressions:**
1. **Chest & Triceps**: Standard Push-ups → Deficit Push-ups (hands on books) → Incline/Decline Push-ups → Chair Dips.
2. **Back & Biceps**: Inverted Rows under a sturdy dining table, Bed-sheet doorframe rows, Doorframe towel hangs.
3. **Quads & Glutes**: Bodyweight Squats → Bulgarian Split Squats (rear foot on sofa) → 1.5-Rep Lunges.
4. **Hamstrings**: Towel Slider Leg Curls on smooth floors, Nordic Hamstring Negatives with ankles anchored under heavy sofa.
5. **Shoulders**: Pike Push-ups → Elevated Pike Push-ups with feet on a chair.`;
    }

    if (q.includes('strength') && q.includes('hypertrophy')) {
      return `### Strength vs. Hypertrophy: Key Scientific Distinctions
While strength and hypertrophy are closely linked, they represent different neuromuscular adaptations:

**1. Strength (Neural & Specificity):**
• **Rep Range**: 1–5 reps @ 80–90%+ 1RM.
• **Primary Mechanism**: Neurological motor unit recruitment, rate coding, intermuscular coordination, and tendon stiffness.
• **Rest Intervals**: 3–5 minutes between sets.

**2. Hypertrophy (Structural Muscle Cross-Sectional Area):**
• **Rep Range**: 6–30 reps taken within 0–3 Reps in Reserve.
• **Primary Mechanism**: Cumulative mechanical tension on myofibrils activating the mTORC1 pathway.
• **Rest Intervals**: 1.5–3 minutes between sets.`;
    }

    // General fallback
    return `### Evidence-Based Guidance on: "${query}"
Sports science research underscores that effective training requires:
1. **Consistency & Specificity**: Stimulating target muscles every 3–5 days with progressive overload.
2. **Effort Calibration**: Ensuring working sets are taken within 1–3 reps of true muscular failure (RPE 7–9).
3. **Nutritional Support**: Consuming 1.6–2.2g of protein per kg of bodyweight and sufficient calories for tissue remodeling.
4. **Recovery**: Securing 7–9 hours of sleep nightly for hormonal and myofibrillar restoration.

Feel free to ask for specific exercise form breakdowns or customized routines!`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      // Call server endpoint
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          history: messages.slice(-6).map(m => ({ role: m.role, text: m.text }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.response && data.source === 'gemini-3.8-flash') {
          setMessages(prev => [
            ...prev,
            {
              id: `a-${Date.now()}`,
              role: 'assistant',
              text: data.response,
              source: 'gemini-3.8-flash',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
          setIsLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend call failed, using built-in knowledge engine');
    }

    // Graceful offline fallback
    setTimeout(() => {
      const offlineReply = generateOfflineKnowledgeResponse(prompt);
      setMessages(prev => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: offlineReply,
          source: 'sports-science-engine',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsLoading(false);
    }, 450);
  };

  const handleSimplifyStudy = () => {
    if (!studyTextToSimplify.trim()) return;
    const prompt = `Please analyze and simplify this scientific study or fitness claim in plain, understandable language with evidence strength rating:

"${studyTextToSimplify}"

Provide:
1. Plain-English Summary (No academic jargon)
2. Practical Gym Application
3. Evidence Strength & Limitations`;

    setActiveTab('chat');
    handleSendMessage(prompt);
    setStudyTextToSimplify('');
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#080d1a] text-gray-100 pb-20">
      {/* Assistant Header */}
      <div className="p-4 bg-[#0f172a] border-b border-[#213253] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 neon-glow" />
            <h1 className="text-xl font-bold font-heading text-white tracking-wide">
              AI FITNESS RESEARCH ASSISTANT
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Powered by Gemini AI & Sports Science Knowledge Base • Evidence-based answers with source citations
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-[#162038] p-0.5 rounded-lg border border-[#213253] text-xs">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'chat' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Chat Coach
          </button>
          <button
            onClick={() => setActiveTab('simplifier')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              activeTab === 'simplifier' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Study Simplifier
          </button>
        </div>
      </div>

      {activeTab === 'simplifier' ? (
        /* Study Simplifier Tool */
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-3xl mx-auto w-full space-y-4">
          <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#213253] space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-400" />
              <h2 className="text-base font-bold font-heading uppercase text-white">
                Scientific Paper & Abstract Simplifier
              </h2>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Paste any scientific study abstract, article link, PubMed snippet, or controversial fitness claim below.
              The AI will translate the findings into plain English, evaluate evidence strength, and provide practical gym takeaways.
            </p>

            <textarea
              rows={6}
              value={studyTextToSimplify}
              onChange={(e) => setStudyTextToSimplify(e.target.value)}
              placeholder="Paste study abstract or claim here (e.g. 'Effects of resistance training frequency on measures of muscle hypertrophy: A systematic review and meta-analysis...')"
              className="w-full p-3 bg-[#162038] border border-[#213253] rounded-xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-600"
            />

            <button
              onClick={handleSimplifyStudy}
              disabled={!studyTextToSimplify.trim()}
              className="w-full py-2.5 bg-blue-600 hover:bg-sky-400 disabled:opacity-50 text-black font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Translate & Simplify Paper</span>
            </button>
          </div>
        </div>
      ) : (
        /* Chat Interface */
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Scrollable Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold border ${
                    msg.role === 'assistant'
                      ? 'bg-blue-600/20 text-sky-400 border-blue-600/40'
                      : 'bg-[#213253] text-white border-[#384f42]'
                  }`}
                >
                  {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-2 relative group ${
                    msg.role === 'assistant'
                      ? 'bg-[#0f172a] border-[#213253] text-gray-200'
                      : 'bg-[#18251e] border-blue-600/40 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 text-[10px] font-mono text-gray-400 mb-1">
                    <span>{msg.role === 'assistant' ? 'Research Assistant' : 'You'}</span>
                    <div className="flex items-center gap-2">
                      {msg.source && (
                        <span className="text-sky-400 font-semibold uppercase">{msg.source}</span>
                      )}
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>

                  <div className="whitespace-pre-line font-sans">{msg.text}</div>

                  {msg.role === 'assistant' && (
                    <div className="pt-2 border-t border-[#1c2948] flex justify-end">
                      <button
                        onClick={() => copyToClipboard(msg.id, msg.text)}
                        className="text-gray-400 hover:text-sky-400 text-[11px] font-mono flex items-center gap-1 transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-sky-400" />
                            <span className="text-sky-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 max-w-3xl">
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-sky-400 border border-blue-600/40 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-4 rounded-2xl bg-[#0f172a] border border-[#213253] text-xs text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <span>Synthesizing sports science research...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Prompt Suggestions Pills */}
          <div className="px-4 py-2 bg-[#0e1411] border-t border-[#1c2948] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[11px] text-gray-500 font-mono shrink-0">Quick questions:</span>
            {PRESET_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 bg-[#162038] hover:bg-[#1f2d4d] text-gray-300 hover:text-white rounded-lg border border-[#213253] text-xs whitespace-nowrap transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 sm:p-4 bg-[#0f172a] border-t border-[#213253]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask about exercises, biomechanics, research, or training plans..."
                className="flex-1 px-4 py-2.5 bg-[#162038] border border-[#213253] rounded-xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-600 transition-colors"
              />

              <button
                type="submit"
                disabled={!inputPrompt.trim() || isLoading}
                className="p-2.5 bg-blue-600 hover:bg-sky-400 disabled:opacity-40 text-black rounded-xl transition-colors shrink-0 shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
