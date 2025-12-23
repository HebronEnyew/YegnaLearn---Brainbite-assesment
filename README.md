# My Fullstack Learning App - YegnaLearn

A modern courses platform with user auth, AI features, and basic TTS support.

---

## **Tech Stack**

- **Frontend:** Nuxt 3, Custom CSS  
- **Backend:** NestJS, Railway-deployed  
- **Database/Auth:** Supabase  
- **AI / TTS:** OpenAI API + Browser SpeechSynthesis API  
- **Testing:** Jest (unit tests), Playwright (e2e tests)

---

## **Setup Instructions**

### **Local Development**

1. Clone the repo:

```bash
git clone <repo-url>
cd frontend   # for Nuxt
npm install
npm run dev
Backend:

bash
Copy code
cd backend
npm install
npm run start:dev
Environment variables (create .env in root of each):

bash
Copy code
# Backend (.env)
OPENAI_API_KEY=<your-openai-key>
SUPABASE_URL=<your-supabase-url>
SUPABASE_KEY=<your-supabase-key>

# Frontend (.env)
Deployment
Frontend: Vercel → connect repo, set root to frontend/, add env NUXT_PUBLIC_BACKEND_URL=https://<your-railway-backend-url>

Backend: Railway → connect repo, root backend/, build: npm run build, start: npm run start:prod, add env vars (OPENAI_API_KEY, SUPABASE_URL, SUPABASE_KEY)

High-level Architecture
scss
Copy code
Frontend (Nuxt3, Browser) 
        │
        ▼
Backend (NestJS API, Railway) 
        │
        ▼
Supabase (DB & Auth) + OpenAI (AI features)
Frontend requests → Backend → Supabase/OpenAI → Backend → Frontend renders

TTS: Uses browser SpeechSynthesis API directly from frontend

TTS Example
Put this in any frontend component where you want to trigger speech (e.g., dashboard.vue or course page):

js
Copy code
const speak = (text) => {
  if (!text) return
  speechSynthesis.cancel() // stop previous
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 1
  utterance.pitch = 1
  utterance.lang = 'en-US'
  speechSynthesis.speak(utterance)
}
Usage in template:

html
Copy code
<button @click="speak('Hello World!')">Speak</button>
Testing
Unit tests: npm run test in backend (Jest)

E2E tests: npx playwright test
