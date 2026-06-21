/**
 * CampusMind AI — Groq API client
 *
 * FREE setup (hackathon):
 *  1. Go to https://console.groq.com → sign up → create API key (free)
 *  2. Add to .env.local:  VITE_GROQ_API_KEY=gsk_xxxx
 *
 * How the AI knows about your school:
 *  → schoolData.js exports buildKnowledgeBase()
 *  → That text is injected into the system prompt below
 *  → The AI reads it like a briefing document before every conversation
 *  → Students get accurate answers because the AI is reading YOUR real data
 */

import { buildKnowledgeBase } from './schoolData'

const GROQ_URL   = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'llama-3.1-8b-instant'   // free + very fast

// ── System prompt ─────────────────────────────────────────────────
// Built fresh each call so it always has the latest school data
function buildSystemPrompt(studentContext = {}) {
  const knowledgeBase = buildKnowledgeBase()

  return `You are CampusMind AI, the official AI assistant for Koladaisi University (KDU) students.

== YOUR ROLE ==
You help students with:
- Academic questions (courses, assignments, study help, exam prep)
- Campus navigation (where offices are, who to contact)
- Schedules, deadlines, and academic calendar
- Procedures (registration, clearance, transcripts, fees)
- Campus events and student organisations
- Drafting emails to lecturers or staff

== STUDENT CONTEXT ==
${studentContext.name ? `Student name: ${studentContext.name}` : ''}
${studentContext.matric ? `Matric number: ${studentContext.matric}` : ''}
${studentContext.department ? `Department: ${studentContext.department}` : ''}
${studentContext.level ? `Level: ${studentContext.level}` : ''}

== HOW TO ANSWER ==
- Be helpful, warm, and concise — like a knowledgeable senior student
- Use the SCHOOL KNOWLEDGE BASE below to answer accurately
- For specific personal data (individual grades, timetables) say: "Check your student portal at portal.kdu.edu.ng"
- If something isn't in the knowledge base, say: "I don't have that info yet — check with [relevant office]"
- NEVER make up exam dates, grades, or official policies
- Use bullet points for lists, keep responses scannable
- When relevant, suggest a follow-up action the student can take

== FORMATTING ==
- Use **bold** for important names, dates, locations
- Use bullet points (•) for lists
- Keep responses under 200 words unless a detailed explanation is needed
- End with a helpful follow-up offer when appropriate

== SCHOOL KNOWLEDGE BASE ==
${knowledgeBase}
`
}

// ── Main send function ─────────────────────────────────────────────
/**
 * @param {Array}    messages        [{role:'user'|'assistant', content:'...'}]
 * @param {Function} onChunk         called with each streamed text chunk
 * @param {Object}   studentContext  optional {name, matric, department, level}
 */
export async function sendToGroq(messages, onChunk = null, studentContext = {}) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY

  if (!apiKey) {
    // Demo mode — no API key needed, returns smart canned responses
    await new Promise(r => setTimeout(r, 900))  // fake delay
    const reply = getDemoResponse(messages[messages.length - 1]?.content || '')
    if (onChunk) {
      // Simulate streaming word by word
      const words = reply.split(' ')
      for (const word of words) {
        onChunk(word + ' ')
        await new Promise(r => setTimeout(r, 18))
      }
    }
    return reply
  }

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model:       GROQ_MODEL,
      max_tokens:  500,
      temperature: 0.65,
      stream:      !!onChunk,
      messages: [
        { role: 'system', content: buildSystemPrompt(studentContext) },
        ...messages,
      ],
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Groq API error ${res.status}`)
  }

  // ── Streaming ──
  if (onChunk) {
    const reader  = res.body.getReader()
    const decoder = new TextDecoder()
    let full = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const lines = decoder.decode(value).split('\n').filter(l => l.startsWith('data: '))
      for (const line of lines) {
        const payload = line.slice(6)
        if (payload === '[DONE]') break
        try {
          const chunk = JSON.parse(payload)
          const text  = chunk.choices?.[0]?.delta?.content || ''
          if (text) { full += text; onChunk(text) }
        } catch {}
      }
    }
    return full
  }

  // ── Non-streaming ──
  const data = await res.json()
  return data.choices?.[0]?.message?.content || ''
}

// ── Demo responses (when no API key) ─────────────────────────────
// These use the same data from schoolData.js so they're consistent
function getDemoResponse(userText) {
  const q = userText.toLowerCase()

  if (q.match(/schedule|class|tomorrow|timetable/)) {
    return `Here's your schedule for tomorrow:\n\n• **9:00 AM** — CSC 423: AI Fundamentals, Hall A ⚠️ *Quiz today*\n• **11:00 AM** — CSC 415: Distributed Systems, Lab 4\n• **2:00 PM** — CSC 401: Software Engineering, Hall B\n\nWant me to help you prep for the CSC 423 quiz?`
  }
  if (q.match(/exam|when.*exam|exam.*date/)) {
    return `Based on the academic calendar:\n\n• **Exams start:** 7 July 2025\n• **Exams end:** 25 July 2025\n• **Results expected:** Mid August 2025\n\nYour CSC 423 quiz is **tomorrow at 9 AM** — want practice questions?`
  }
  if (q.match(/hod|head of department|adeyemi|lecturer|dr\./)) {
    return `**Dr. Folake Adeyemi** — HOD, Computer Science & Digital Technology\n\n• **Office:** Block C, Room 204\n• **Office hours:** Tue & Thu, 10:00 AM – 12:00 PM\n• **Email:** f.adeyemi@kdu.edu.ng\n\nWould you like me to draft an email to her?`
  }
  if (q.match(/register|course registration|how.*register/)) {
    return `Here's how to register your courses:\n\n• **1.** Pay school fees via Remita portal\n• **2.** Log into **portal.kdu.edu.ng**\n• **3.** Click "Course Registration" and select courses\n• **4.** Print your registration slip\n• **5.** Submit to your department office for signing\n\nDeadline is **April 30**. Need help with anything specific?`
  }
  if (q.match(/clearance|clear/)) {
    return `Clearance process:\n\n• **1.** Collect form from Student Affairs (Admin Block, Room 101)\n• **2.** Library sign-off — return all borrowed books\n• **3.** Bursary sign-off — clear outstanding fees\n• **4.** Department sign-off\n• **5.** Submit to Exams & Records (Admin Block, Room 108)\n\nClearance forms available from **May 5**. Anything else?`
  }
  if (q.match(/library|book/)) {
    return `**Main Library** — Central Campus\n\n• **Hours:** Mon–Fri 8AM–10PM, Sat 9AM–5PM\n• For borrowed books, return before clearance\n• You can check book availability on the student portal\n\nNeed anything else?`
  }
  if (q.match(/nacos|event|weekend|workshop/)) {
    return `Upcoming events on campus:\n\n• **AI & Robotics Workshop** — Sat 21 June, 10AM @ CSC Seminar Room (NACOS)\n• **Career Fair 2025** — Fri 27 June, 9AM–4PM @ Main Auditorium\n\nNACOS meets every **Tuesday at 4PM** in the CSC Seminar Room. Want to RSVP?`
  }
  if (q.match(/fee|pay|bursary|remita/)) {
    return `For school fees:\n\n• **Payment portal:** pay.kdu.edu.ng\n• **Accepted methods:** Remita, bank transfer, debit card\n• **Bursary office:** Admin Block, Room 105 (Mon–Fri, 8AM–3PM)\n\nFees must be paid before course registration. Any other questions?`
  }
  if (q.match(/csc 423|ai fundamental|artificial intelligence/)) {
    return `**CSC 423 — AI Fundamentals** (3 units)\n\n• **Lecturer:** Dr. Folake Adeyemi\n• **Schedule:** Mon & Wed, 9:00 AM – 10:30 AM, Hall A\n• **Topics:** Neural networks, search algorithms, knowledge representation, ML basics\n\n⚠️ You have a **quiz tomorrow at 9AM**. Want me to generate practice questions?`
  }
  if (q.match(/portal|student portal|login/)) {
    return `Your student portal: **portal.kdu.edu.ng**\n\nFrom the portal you can:\n• Register courses\n• Check results and GPA\n• View timetable\n• Pay fees (via Remita)\n• Request transcripts\n\nLogin with your matric number. Need help with a specific task?`
  }
  if (q.match(/deadline|assignment|due/)) {
    return `Upcoming deadlines to note:\n\n• **Course registration deadline:** April 30\n• **Clearance form collection:** from May 5\n• **Last day of lectures:** June 20\n• **Exams begin:** July 7\n\nFor specific assignment deadlines, check with your course lecturer. Anything else?`
  }
  if (q.match(/hello|hi|hey|good morning|good afternoon/)) {
    return `Hello! 👋 I'm **CampusMind AI**, your KDU campus assistant.\n\nI can help you with:\n• **Schedule & exams** — timetable, exam dates, deadlines\n• **Campus info** — office locations, lecturer contacts, procedures\n• **Study help** — course content, practice questions, explanations\n• **Admin tasks** — registration, clearance, fees, transcripts\n\nWhat do you need today?`
  }

  return `I can help with that! For the most accurate answer, I'd suggest:\n\n• Checking your **student portal** at portal.kdu.edu.ng\n• Visiting the **relevant office** during working hours (Mon–Fri, 8AM–4PM)\n• Or ask me a more specific question and I'll do my best\n\nIs there something specific about your courses, schedule, or campus I can look up?`
}
