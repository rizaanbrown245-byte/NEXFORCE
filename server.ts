import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Fitness system prompt for evidence-based science
const SYSTEM_INSTRUCTION = `You are the AI Fitness Research Assistant for "Gyming Research Advance", with the motto: "Train Smarter. Build Stronger. Live Healthier."
Your role is to provide evidence-based exercise science, biomechanical guidance, hypertrophy/strength programming, and nutrition education for gym and home trainees.

Guidelines:
1. Prioritize peer-reviewed sports science (e.g., Schoenfeld, Helms, Morton, Brad Schoenfeld meta-analyses, ACSM, NSCA, ISSN).
2. Clearly distinguish established scientific consensus from preliminary findings or individual variation.
3. If giving workout recommendations, adapt for experience level (Beginner, Intermediate, Advanced) and equipment (Barbell, Dumbbell, Cables, Bodyweight, Household items).
4. Emphasize progressive overload, appropriate volume (10-20 sets per muscle group per week), recovery, and joint safety.
5. Provide practical, clear, structured responses with bullet points and exercise form cues.
6. Safety disclaimer: Clearly remind users that fitness educational advice does not replace individual medical or physiotherapy assessment, and to stop immediately if experiencing acute pain.`;

// AI Assistant endpoint
app.post('/api/assistant', async (req, res) => {
  try {
    const { message, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return res.status(200).json({
        source: 'built-in-offline',
        response: null,
        message: 'No GEMINI_API_KEY configured. Fallback engine will be used on client.'
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Prepare contents
    const contents = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-6)) {
        contents.push({
          role: item.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: item.text }]
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    res.json({
      source: 'gemini-3.8-flash',
      response: response.text || 'No response generated.'
    });
  } catch (err: any) {
    console.error('Gemini API error in /api/assistant:', err);
    res.status(500).json({
      error: err.message || 'Internal AI service error',
      source: 'fallback'
    });
  }
});

// App environment health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Gyming Research Advance',
    version: '1.0.0',
    aiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY')
  });
});

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
