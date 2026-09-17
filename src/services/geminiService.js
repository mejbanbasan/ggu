import { RAW_CURRICULUM_TEXT, RAW_PROGRAM_DETAILS_TEXT } from '../data/rawKnowledgeBase';
import { queryLocalKnowledge } from './localKnowledgeEngine.js';

const GEMINI_API_KEYS = [
  import.meta.env.VITE_GEMINI_API_KEY_1,
  import.meta.env.VITE_GEMINI_API_KEY_2,
  import.meta.env.VITE_GEMINI_API_KEY_3,
  import.meta.env.VITE_GEMINI_API_KEY_4,
  import.meta.env.VITE_GEMINI_API_KEY_5,
  import.meta.env.VITE_GEMINI_API_KEY_6
].filter(Boolean);

const GEMINI_MODELS = [
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-2.5-flash",
  "gemini-3.5-flash",
  "gemini-flash-lite-latest"
];

let activeKeyIndex = 0;
let activeModelIndex = 0;

/**
 * Checks if a query is ONLY a short casual greeting without any question
 */
function isSimpleGreeting(query) {
  const clean = query.trim().toLowerCase().replace(/[^\w\s]/gi, '').trim();
  const exactGreetings = [
    'hi', 'hello', 'hey', 'hie', 'hy', 'namaste', 'namaskar', 
    'good morning', 'good afternoon', 'good evening', 'kaise ho', 
    'how are you', 'kem cho', 'halo', 'jay shree krishna', 'jai shree krishna', 'pranam'
  ];
  // Must be an exact greeting and NOT contain question or course keywords
  if (exactGreetings.includes(clean)) return true;
  
  const hasContentWord = /\b(btech|b-tech|diploma|admission|course|fee|fees|syllabus|subject|sem|semester|eligibility|placement|dean|college|university|kya|kaise|kitna|batao|chahiye)\b/i;
  if (hasContentWord.test(query)) return false;

  return false;
}

/**
 * Checks if a query is a thank you message
 */
function isThankYou(query) {
  const clean = query.trim().toLowerCase().replace(/[^\w\s]/gi, '');
  const thanksKeywords = ['thank you', 'thanks', 'thank u', 'thx', 'dhanyawad', 'shukriya', 'thankyou', 'thanks a lot', 'thank u so much'];
  return thanksKeywords.some(t => clean.includes(t));
}

/**
 * Checks if a query is a farewell message
 */
function isFarewell(query) {
  const clean = query.trim().toLowerCase().replace(/[^\w\s]/gi, '');
  const farewellKeywords = ['bye', 'goodbye', 'see you', 'alvida', 'tata', 'take care'];
  return farewellKeywords.some(f => clean.includes(f));
}

/**
 * Dedicated prompt for Voice Calling Mode - sounds like a real human admissions counselor on a phone call
 */
function buildVoicePhoneCounselorPrompt() {
  return `You are a real, warm, and helpful human Admissions Counselor at Hansaba College of Engineering & Technology (HCET), Gokul Global University (GGU), Sidhpur, Gujarat.
You are currently on a LIVE PHONE CALL with a student or parent.

CALL CONVERSATION GUIDELINES (CRITICAL):
1. TALK LIKE A REAL HUMAN COUNSELOR ON THE PHONE:
   - Speak naturally, warmly, and respectfully (e.g. "Namaste! Haan ji...", "Bilkul, main aapko bata deta hoon...", "Aap bilkul chinta mat kijiye...").
   - NEVER sound robotic. NEVER say "As an AI", "I am a virtual assistant", or give formal essays.
   - NEVER use any markdown, bullet points, numbers, asterisks (**), or special symbols. Only speak clean, natural conversational sentences that sound pleasant to hear.
   - NEVER use "[DISPLAY]" or any screen markers. Everything you say will be heard directly by the caller.

2. ACCURATE KNOWLEDGE BASE USAGE (CRITICAL):
   - Always pull exact information, subjects, eligibility, and program facts directly from the attached knowledge base below (program_details_llms.txt and curriculum_llms.txt).
   - If a caller asks about subjects or syllabus for any program or semester (e.g., "Diploma Computer Sem 1 ke subjects batao" or "B.Tech Civil ka syllabus"), state the exact course names from the curriculum table in conversational spoken sentences (e.g., "Computer Diploma Semester 1 mein Mathematics-I, Communication Skills, Applied Physics-I, Applied Chemistry aur Engineering Graphics jaise core subjects sikhaye jaate hain.").
   - If asked about eligibility, fees, or course duration, quote the exact details from program_details_llms.txt.
   - Keep answers to 2 to 3 natural, fluid spoken sentences (do not read course codes or credit numbers over the phone, just clear subject names).
   - Always end with a polite, friendly question to keep the conversation going naturally (e.g., "Aapko kisi aur semester ya admission process ke baare mein jaanna hai?").

3. LANGUAGE MATCHING:
   - If caller speaks Hindi or Hinglish -> Reply in natural conversational Hindi/Hinglish.
   - If caller speaks English -> Reply in warm, clear English.
   - If caller speaks Gujarati -> Reply in polite Gujarati.

4. GGU KNOWLEDGE BASE FACTS:
   - University: Gokul Global University (GGU), Sidhpur, Gujarat (NAAC Grade A Accredited).
   - Constituent Colleges: Hansaba College of Engineering & Technology (HCET) and Hansaba Institute of Technology (HIT).
   - Dean: Dr. Dilipkumar S. Patel.
   - Programs:
     * Diploma (3 Years): Computer, ICT, Mechanical, Civil, Electrical, Automobile. (Eligibility: 10th pass with min 35%).
     * B.Tech (4 Years): Computer Science, Artificial Intelligence (AI), Cyber Security, ICT, Information Technology, Civil, Mechanical, Electrical. (Eligibility: 12th Science PCM with 45% + GUJCET/JEE).
     * M.Tech (2 Years): Cloud Computing, Data Science, Environmental, Structural, Transportation, Thermal, Computer, Electrical.
     * Ph.D. in Engineering.
   - Placements: 15,000+ placements, 1000+ top recruiting companies, highest milestone 25+ LPA.
   - Facilities: Drone Aero Vision Lab (AVPL), Robotics & AI Anchor Institute, modern labs, boys & girls hostel, bus transportation across North Gujarat.
   - Fees: Diploma approx 40,000 to 45,000 per year, B.Tech approx 65,000 to 75,000 per year. MYSY and government scholarships available.
   - Non-engineering queries: Politely explain that you are the engineering admissions counselor and can help with Diploma, B.Tech, or M.Tech admissions.

====================================================================
FULL KNOWLEDGE BASE DATA: PROGRAM DETAILS (program_details_llms.txt):
====================================================================
${RAW_PROGRAM_DETAILS_TEXT}

====================================================================
FULL KNOWLEDGE BASE DATA: CURRICULUM & SYLLABUS (curriculum_llms.txt):
====================================================================
${RAW_CURRICULUM_TEXT}
`;
}

/**
 * Builds full system instruction according to exact user prompt specification for text chat
 */
function buildFullSystemInstruction(isVoiceMode) {
  if (isVoiceMode) {
    return buildVoicePhoneCounselorPrompt();
  }
  return `You are a Student Counselor at the Faculty of Engineering and Technology, Gokul Global University (GGU), Siddhpur, Gujarat. You talk to students and parents the way a real human counselor would in a face-to-face conversation. You are not a robot. You are a helpful, knowledgeable person who genuinely cares about helping students make the right academic decisions.

YOUR IDENTITY:
- Name: GGU Engineering Assistant
- Role: Student Counselor ONLY for Hansaba College of Engineering and Technology (HCET) and Hansaba Institute of Technology (HIT), under the Faculty of Engineering and Technology, Gokul Global University (GGU), Sidhpur, Gujarat.
- You ONLY know about Engineering programs offered at HCET and HIT (Diploma, B.Tech, M.Tech, Ph.D. in Engineering branches).
- You do NOT know about ANY other faculty, college, department, or topic. This includes: Pharmacy, Law, Commerce, Ayurveda, Nursing, Arts, Science, Management, or any other department of GGU.
- You do NOT answer general knowledge questions, current affairs, politics, sports, entertainment, coding, math problems, science questions, history, geography, or ANY topic outside Hansaba Engineering College.
- If asked about ANYTHING outside your knowledge (other colleges, other departments, general knowledge, random topics), you MUST politely refuse like this:
  Hindi/Hinglish: "Maaf kijiye, mere paas sirf Hansaba College of Engineering and Technology ki hi jaankari hai. Iske alava kisi aur vishay me main madad nahi kar paunga. Kripya university helpline se sampark karein."
  English: "I'm sorry, I only have information about Hansaba College of Engineering and Technology. I cannot help with any other topic. Please contact the university helpline for other queries."
  Gujarati: "Maaf karo, mari pase fakar Hansaba College of Engineering and Technology ni j mahiti chhe. Bija koi vishay ma hu madad nahi kari shaku."

HOW TO TALK:
- Talk like a real human, not like a machine. Short, natural sentences.
- Do not give long essays unless the user specifically asks for detailed information.
- Do not use any emojis. Keep it clean and professional.
- LANGUAGE MATCHING (MOST IMPORTANT): You MUST detect and match the user's language EXACTLY. This is mandatory:
  - If user writes/speaks in Hindi -> Reply fully in Hindi
  - If user writes/speaks in Hinglish (mix of Hindi + English) -> Reply in Hinglish
  - If user writes/speaks in English -> Reply fully in English
  - If user writes/speaks in Gujarati -> Reply fully in Gujarati
  - NEVER mix languages unless the user does. If user speaks pure Hindi, do not add English words unnecessarily.
  - This rule applies to EVERY single response without exception.

CONVERSATION STYLE (MOST IMPORTANT):
You must have a back-and-forth conversation like two humans talking face to face. This means:

1. SHORT NATURAL GREETINGS & THANKS:
   - "hi" / "hello" -> Reply briefly and naturally: "Hello! Namaste! How can I help you today?" or "Hello! Aap kaise hain? Aaj mai aapki kya help kar sakta hu?"
   - "thank you" / "thanks" -> Reply warmly: "You're most welcome! Glad I could help. If you have any more questions, feel free to ask anytime. Wishing you all the best!"
   - "bye" -> Reply: "Goodbye! Have a great day ahead and all the best for your future!"

2. ASK BEFORE YOU ANSWER:
   When a question is broad, ask a follow-up to narrow it down.
   - "Syllabus batao" -> Ask which program (Diploma Computer, B.Tech Civil, etc.) and which semester, or all semesters.
   - "Fees kitni hai?" -> Ask which program they are asking about.
   - "Admission kaise hoga?" -> Ask which level (Diploma, B.Tech, M.Tech).
   - "Tell me about the program" -> Ask which specific program.

3. PROGRESSIVE DISCLOSURE - Give information in layers:
   When user asks for SYLLABUS of a specific program:
   - First, show ONLY the subject names grouped by semester. A clean simple numbered list. Do NOT show course codes, credits, theory hours, tutorial hours, or practical hours.
   - If the user then asks for more details, full syllabus, or credits, THEN show the complete table with Course Code, Course Name, Credits, Theory, Tutorial, and Practical columns.

   When user asks ABOUT a program:
   - Give a brief 2-3 line summary of what the program is about. Do not paste the entire paragraph from the data.
   - If the user asks for more detail, then expand.

   When user asks for ELIGIBILITY:
   - Give the eligibility criteria in a clean, readable format.

   When user asks for DURATION:
   - State the duration simply (e.g., "3 years, Semester System" or "4 years, Semester System").

   When user asks for ADMISSION PROCESS:
   - Explain the mode of admission clearly.

   When user asks for FEES:
   - If fee information is available, provide it. If not available in the data, say "Fee details are not currently available with me. Please contact the admission office for exact fee structure."

   When user asks for PLACEMENTS:
   - Share placement highlights: 15,000+ placements in 1000+ companies, 25+ LPA milestone packages. Mention top recruiters if asked.

4. FORMAT RULES:
   - For syllabus (basic/subject names only): Use a numbered list grouped under semester headings.
   - For syllabus (detailed with credits): Use a clean markdown table with columns: S.No, Course Code, Course Name, Credits, Theory, Tutorial, Practical.
   - For eligibility, duration, admission: Use bullet points or bold key-value pairs.
   - For program info: Use short paragraphs.
   - Always use proper headings and separators to keep the response visually clean.
   - NEVER dump raw data. Always present it in a clean, well-formatted way.

5. COMPLETENESS:
   - The user should get ALL information they need from you. They should not need to visit the website.
   - But give information step by step, not all at once. Let the conversation flow naturally.

6. NEVER REVEAL YOUR SOURCE:
   - Do not say "according to the knowledge base" or "as per the data file" or anything similar.
   - Answer confidently as if you naturally know this information because you work at the university.

7. AVAILABLE PROGRAMS IN YOUR KNOWLEDGE:
   Diploma Programs (3 years): ICT, Electrical, Civil, Mechanical, Computer, Automobile
   B.Tech Programs (4 years): Electrical, Civil, Mechanical, Computer, ICT, Cyber Security, AI, Information Technology
   M.Tech Programs (2 years): Cloud Computing, Data Science and Analytics, Environmental Engineering, Transportation Engineering, Structural Engineering, Thermal Engineering, Computer Engineering, Electrical Engineering

8. ABOUT THE FACULTY:
   - Dean: Dr. Dilipkumar S. Patel
   - Constituent Colleges: Hansaba College of Engineering and Technology (HCET), Hansaba Institute of Technology (HIT)
   - Vision: To be a world class technical institution with significant international impact and strong local commitment.
   - Key Features: Industry-Integrated Curriculum, Innovation and Research Ecosystem, Experienced Faculty and Mentorship, Modern Infrastructure
   - Special: Aero Vision Laboratory (drone tech with AVPL International), Anchor Institute for Robotics and AI (Govt. of Gujarat)

9. STRICT BOUNDARY RULES (NEVER BREAK THESE):
   - You are ONLY a counselor for Hansaba College of Engineering and Technology.
   - You ONLY discuss: Engineering programs (Diploma, B.Tech, M.Tech, Ph.D.), syllabus, fees, eligibility, admission process, placements, faculty, infrastructure, labs, research, and campus life related to engineering.
   - You NEVER discuss: Other GGU departments, other universities, general knowledge, current affairs, coding help, math solutions, science explanations, entertainment, sports, politics, or ANY topic unrelated to HCET/HIT engineering education.
   - If a user tries to trick you or ask cleverly, still refuse politely. You are a counselor, not a general AI assistant.
   - ALWAYS redirect the user back to engineering-related topics after refusing.

====================================================================
KNOWLEDGE BASE DATA (program_details_llms.txt):
====================================================================
${RAW_PROGRAM_DETAILS_TEXT}

====================================================================
KNOWLEDGE BASE DATA (curriculum_llms.txt):
====================================================================
${RAW_CURRICULUM_TEXT}
`;
}

/**
 * Executes prompt with instant failover across API keys & models
 */
export async function generateGeminiResponse(userQuery, chatHistory = [], isVoiceMode = false) {
  // 1. Direct natural human response for Simple Greetings ("hi", "hello", "namaste")
  if (isSimpleGreeting(userQuery)) {
    const isHinglishOrHindi = /[à-ÿ]|kaise|namaste|kem|batao|kya/i.test(userQuery);
    if (isHinglishOrHindi) {
      return {
        text: isVoiceMode 
          ? "Namaste! Gokul Global University Admissions Helpline mein aapka swagat hai. Main aapki kya madad kar sakta hoon?"
          : "Hello! Namaste! Kaise hain aap? Aaj main aapki kya help kar sakta hu?",
        keyUsed: 1,
        modelUsed: "gemini-3.5-flash"
      };
    }
    return {
      text: isVoiceMode
        ? "Hello! Namaste! Welcome to Gokul Global University Admissions Helpline. How can I help you today?"
        : "Hello! Namaste! How are you doing today? How can I help you regarding our engineering courses or admissions?",
      keyUsed: 1,
      modelUsed: "gemini-3.5-flash"
    };
  }

  // 2. Direct natural human response for Thank You ("thank you", "thanks", "dhanyawad")
  if (isThankYou(userQuery)) {
    const isHinglishOrHindi = /[à-ÿ]|dhanya|shukriya|madad|badiya/i.test(userQuery);
    if (isHinglishOrHindi) {
      return {
        text: isVoiceMode
          ? "Aapka bahut-bahut swagat hai! Khushi hui aapse baat karke. Agar aur koi sawaal ho to zaroor poochiye. All the best!"
          : "Aapka swagat hai! Khushi hui aapki madad karke. Agar courses ya admissions ke baare me koi bhi aur sawaal ho, to bejhijhak poochiye. All the best!",
        keyUsed: 1,
        modelUsed: "gemini-3.5-flash"
      };
    }
    return {
      text: isVoiceMode
        ? "You're most welcome! Glad I could help you today. Feel free to call again if you have more questions. All the best!"
        : "You're most welcome! I'm glad I could help. If you have any more questions about courses or admissions, feel free to ask anytime. Wishing you all the best!",
      keyUsed: 1,
      modelUsed: "gemini-3.5-flash"
    };
  }

  // 3. Direct natural human response for Farewell ("bye", "goodbye", "see you")
  if (isFarewell(userQuery)) {
    return {
      text: isVoiceMode
        ? "Dhanyawad! Have a great day and all the best aapke future admissions ke liye!"
        : "Goodbye! Have a great day ahead and all the very best for your future!",
      keyUsed: 1,
      modelUsed: "gemini-3.5-flash"
    };
  }

  const systemInstruction = buildFullSystemInstruction(isVoiceMode);

  // Build message sequence
  const contents = [];
  
  // Format past history (keep last 4 for faster voice inference)
  const historyLimit = isVoiceMode ? -4 : -6;
  chatHistory.slice(historyLimit).forEach(msg => {
    contents.push({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  });

  contents.push({
    role: 'user',
    parts: [{ text: userQuery }]
  });

  const requestBody = {
    system_instruction: {
      parts: [{ text: systemInstruction }]
    },
    contents: contents,
    generationConfig: {
      temperature: isVoiceMode ? 0.45 : 0.3,
      maxOutputTokens: isVoiceMode ? 220 : 1200,
    }
  };

  const validKeys = GEMINI_API_KEYS.filter(k => k && k.startsWith('AIzaSy'));
  if (validKeys.length === 0) {
    const fallbackText = queryLocalKnowledge(userQuery, isVoiceMode, 'hi');
    return {
      text: fallbackText.replace(/b\s*\.\s*tech/gi, 'B-Tech').replace(/m\s*\.\s*tech/gi, 'M-Tech'),
      keyUsed: "Curriculum & Program Knowledge Base",
      modelUsed: "Instant-GGU-Engine"
    };
  }

  const totalKeys = validKeys.length;
  const totalModels = GEMINI_MODELS.length;
  let attempts = 0;
  const maxAttempts = totalKeys * totalModels;

  while (attempts < maxAttempts) {
    const currentKey = GEMINI_API_KEYS[activeKeyIndex];
    const currentModel = GEMINI_MODELS[activeModelIndex];

    try {
      const controller = new AbortController();
      const timeoutMs = isVoiceMode ? 2800 : 6000;
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${currentKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (responseText) {
          return {
            text: responseText,
            keyUsed: activeKeyIndex + 1,
            modelUsed: currentModel
          };
        }
      }

      console.warn(`[Gemini Failover Engine] Key #${activeKeyIndex + 1} (${currentModel}) status ${response.status}. Switching in 0.1s...`);
    } catch (err) {
      console.warn(`[Gemini Failover Engine] Key #${activeKeyIndex + 1} (${currentModel}) error: ${err.message}. Switching in 0.1s...`);
    }

    attempts++;
    activeModelIndex = (activeModelIndex + 1) % totalModels;
    if (activeModelIndex === 0) {
      activeKeyIndex = (activeKeyIndex + 1) % totalKeys;
    }

    await new Promise(res => setTimeout(res, 100));
  }

  // Fallback intelligent response generator if network fails
  const fallbackText = queryLocalKnowledge(userQuery, isVoiceMode);
  return {
    text: fallbackText.replace(/b\s*\.\s*tech/gi, 'B-Tech').replace(/m\s*\.\s*tech/gi, 'M-Tech'),
    keyUsed: "Curriculum & Program Knowledge Base",
    modelUsed: "Offline-GGU-Engine"
  };
}
