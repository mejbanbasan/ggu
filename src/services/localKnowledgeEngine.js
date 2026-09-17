import { RAW_CURRICULUM_TEXT, RAW_PROGRAM_DETAILS_TEXT } from '../data/rawKnowledgeBase.js';

/**
 * Intelligent Multi-Language Local Knowledge Engine (Hindi, English, Gujarati)
 * Grounded in curriculum_llms.txt and program_details_llms.txt
 * Handles both Latin/Hinglish and Hindi Devanagari / Gujarati speech inputs.
 * Separates user intents cleanly: Syllabus != Eligibility != Admission != Fees.
 */

// Hindi & Gujarati phonetic and script normalization dictionary
const SCRIPT_NORMALIZATION_MAP = [
  [/एडमिशन|ऍडमिशन|प्रवेश|दाखिला|પ્રવેશ|એડમિશન/gi, ' admission '],
  [/बीटेक|बी\s*टेक|बी\.टेक|बी-टेक|બીટેક|બી-ટેક/gi, ' btech '],
  [/डिप्लोमा|डिपलोमा|ડિપ્લોમા/gi, ' diploma '],
  [/एमटेक|एम\s*टेक|एम\.टेक|એમટેક/gi, ' mtech '],
  [/आर्टिफिशियल\s*इंटेलिजेंस|आर्टिफिशियल|इंटेलिजेंस|एआई|આર્ટિફિશિયલ|એઆઈ/gi, ' artificial intelligence ai '],
  [/कंप्यूटर|कम्प्यूटर|सीएसई|सीएस|કોમ્પ્યુટર|કમ્પ્યુટર/gi, ' computer cse '],
  [/साइबर\s*सिक्योरिटी|साइबर|સાયબર/gi, ' cyber security '],
  [/मैकेनिकल|मकैनिकल|મિકેનિકલ/gi, ' mechanical '],
  [/सिविल|સિવિલ/gi, ' civil '],
  [/इलेक्ट्रिकल|ઇલેક્ટ્રિકલ/gi, ' electrical '],
  [/आईसीटी|આઈસીટી/gi, ' ict '],
  [/ऑटोमोबाइल|ઓટોમોબાઈલ/gi, ' automobile '],
  [/फीस|फी|खर्च|कितने\s*पैसे|पैसे|રૂપિયા|ખર્ચ/gi, ' fee fees '],
  [/सिलेबस|सब्जेक्ट|विषय|पाठ्यक्रम|સિલેબસ|વિષય/gi, ' syllabus subject '],
  [/सेमेस्टर|सेम|સેમેસ્ટર|સેમ/gi, ' semester sem '],
  [/प्लेसमेंट|पैकेज|नौकरी|सैलरी|પ્લેસમેન્ટ|પેકેજ/gi, ' placement package '],
  [/हॉस्टल|छात्रावास|હોસ્ટેલ/gi, ' hostel '],
  [/डीन|प्रिंसिपल|ડીન/gi, ' dean '],
  [/स्कॉलरशिप|छात्रवृत्ति|સ્કોલરશીપ/gi, ' scholarship '],
  [/एलिजिबिलिटी|योग्यता|पात्रता|प्रतिशत|લાયકાત/gi, ' eligibility criteria ']
];

function normalizeQuery(text) {
  if (!text) return '';
  let res = text.toLowerCase();
  for (const [pattern, replacement] of SCRIPT_NORMALIZATION_MAP) {
    res = res.replace(pattern, replacement);
  }
  return res.replace(/\s+/g, ' ').trim();
}

// Parse program curriculum into structured map
const curriculumMap = (() => {
  const map = {};
  const sections = RAW_CURRICULUM_TEXT.split(/# Program:\s*/);
  for (const sec of sections) {
    if (!sec.trim()) continue;
    const lines = sec.split('\n');
    const title = lines[0].trim();
    const semesters = {};

    const semMatches = [...sec.matchAll(/### Semester (\d+)([\s\S]*?)(?=### Semester|\n---|$)/g)];
    for (const sm of semMatches) {
      const semNum = sm[1];
      const tableContent = sm[2];
      const rows = tableContent
        .split('\n')
        .filter(l => l.startsWith('|') && !l.includes('Course Code') && !l.includes('---') && !l.includes('Total') && !l.includes('Hrs.'));
      
      const subjects = rows
        .map(r => {
          const cols = r.split('|').map(c => c.trim()).filter(Boolean);
          return cols[2] || cols[1] || '';
        })
        .filter(s => s && s.toLowerCase() !== 'details' && s.length > 2 && !s.includes('Semester -'));

      semesters[semNum] = {
        subjects,
        rawTable: tableContent.trim()
      };
    }

    map[title.toLowerCase()] = {
      title: title.replace(/b\.\s*tech/gi, 'B-Tech').replace(/m\.\s*tech/gi, 'M-Tech'),
      semesters
    };
  }
  return map;
})();

function extractSemester(query) {
  const q = normalizeQuery(query);
  const match = q.match(/sem(?:ester)?\s*([1-8])/i) || q.match(/([1-8])(?:st|nd|rd|th)?\s*sem/i);
  if (match) return match[1];

  if (q.includes('first') || q.includes('pehla') || q.includes('1st') || q.includes('pahelu')) return '1';
  if (q.includes('second') || q.includes('dusra') || q.includes('2nd') || q.includes('biju')) return '2';
  if (q.includes('third') || q.includes('teesra') || q.includes('3rd') || q.includes('triju')) return '3';
  if (q.includes('fourth') || q.includes('chautha') || q.includes('4th') || q.includes('chothu')) return '4';
  if (q.includes('fifth') || q.includes('paanchwa') || q.includes('5th') || q.includes('panchmu')) return '5';
  if (q.includes('sixth') || q.includes('chhatha') || q.includes('6th') || q.includes('chhatthu')) return '6';
  if (q.includes('seventh') || q.includes('saatwa') || q.includes('7th') || q.includes('satmu')) return '7';
  if (q.includes('eighth') || q.includes('aathwa') || q.includes('8th') || q.includes('aathmu')) return '8';

  return null;
}

/**
 * Returns initial call welcome speech in chosen language
 */
export function getWelcomeGreeting(lang = 'hi') {
  if (lang === 'gu') {
    return "Namaste! Gokul Global University Admissions Helpline ma tamaru swagat chhe. Hu tamari shu madad kari shaku chhu?";
  }
  if (lang === 'en') {
    return "Welcome to Gokul Global University Admissions Helpline. How can I assist you today?";
  }
  return "Namaste! Gokul Global University Admissions Helpline mein aapka swagat hai. Main aapki kya madad kar sakta hoon?";
}

/**
 * Primary Multi-Language Local Knowledge Query Engine
 * Accurately dispatches user intent:
 * 1. Syllabus & Subjects
 * 2. Eligibility & Cutoffs
 * 3. Fees & Scholarships
 * 4. Placements & Packages
 * 5. Admission Process & How to apply
 * 6. Campus & Hostels
 * 7. Dean & Leadership
 */
export function queryLocalKnowledge(userQuery, isVoiceMode = true, lang = 'hi') {
  if (!userQuery) return getWelcomeGreeting(lang);

  const rawQ = userQuery.toLowerCase().trim();
  const q = normalizeQuery(userQuery);

  // 1. CASUAL GREETING DURING ACTIVE CONVERSATION
  if (/^(hi|hello|hey|namaste|namaskar|pranam|kem cho|good morning|good afternoon|good evening|halo)\b/i.test(rawQ) && rawQ.length <= 15) {
    if (lang === 'gu') return "Ha bolo! Hu tamari admission vishe shu madad kari shaku chhu?";
    if (lang === 'en') return "Yes, please tell me, how can I assist you with your admissions today?";
    return "Haanji boliye! Main engineering admissions ke baare mein aapki kya madad karoon?";
  }

  // 2. THANK YOU
  if (/\b(thank|thanks|dhanyawad|shukriya|dhanyavad|aabhar)\b/i.test(q)) {
    if (lang === 'gu') return "Tamaro aabhar! Tamari sathe vat kari ne anand thayo. Koi pan bija prashno hoy to jarur puchho. All the best!";
    if (lang === 'en') return "You are most welcome! Glad I could help. Feel free to ask any other questions. All the best!";
    return "Aapka bahut-bahut swagat hai! Khushi hui aapse baat karke. Agar koi aur sawaal ho to bejhijhak poochiye. All the best!";
  }

  // 3. FAREWELL
  if (/\b(bye|goodbye|tata|alvida|aavjo)\b/i.test(q)) {
    if (lang === 'gu') return "Aavjo! Tamaro divas shubh rahe ane future admissions mate all the best!";
    if (lang === 'en') return "Goodbye! Have a great day ahead and wishing you all the best for your future!";
    return "Dhanyawad! Aapka din shubh ho aur aapke future admissions ke liye all the best!";
  }

  // 4. DEAN / LEADERSHIP
  if (/\b(dean|principal|head|director|patel|dilip|dilipkumar|vipul)\b/i.test(q)) {
    if (lang === 'gu') {
      return "Engineering Faculty na Dean Doctor Dilipkumar S. Patel chhe. Temnu guidance quality education ane practical student development par focused chhe.";
    }
    if (lang === 'en') {
      return "Doctor Dilipkumar S. Patel is the Dean of the Faculty of Engineering and Technology at Gokul Global University. His focus is on high-quality technical education and research.";
    }
    return "Engineering Faculty ke Dean Doctor Dilipkumar S. Patel hain. Unka guidance quality education aur holistic student development par focused hai.";
  }

  // 5. PLACEMENTS & PACKAGES & RECRUITERS
  if (/\b(placement|placements|package|highest package|salary|job|recruiter|recruiters|company|companies)\b/i.test(q)) {
    if (lang === 'gu') {
      return "GGU Engineering ma 15,000 thi vadhu placements 1000 thi vadhu reputed companiyo ma thayu chhe, ane highest package 25 plus LPA chhe. Top recruiters ma Collabera, Gokul Agri, DCB Bank ane Sun Pharma shamil chhe.";
    }
    if (lang === 'en') {
      return "GGU has achieved over 15,000 placements across 1,000+ reputed companies, with milestone packages exceeding 25 plus LPA. Top recruiters include Collabera, Gokul Agri, DCB Bank, Sun Pharma, and Dresser-Rand.";
    }
    return "GGU Engineering mein 15,000 se zyada placements 1000 se zyada reputed companies mein ho chuke hain, aur highest package 25 plus LPA ka raha hai. Hamare top recruiters mein Collabera, Gokul Agri International, DCB Bank, Sun Pharma aur Dresser-Rand shamil hain.";
  }

  // 6. FEES & SCHOLARSHIPS
  if (/\b(fee|fees|kharcha|cost|paisa|scholarship|scholarships|mysy|kitne rupaye|kharach|khoroch)\b/i.test(q)) {
    if (lang === 'gu') {
      return "Diploma Engineering ni fee varshik lagbhag 40,000 thi 45,000 rupiya chhe, ane B-Tech ni fee lagbhag 65,000 thi 75,000 rupiya chhe. Gujarat sarkar ni MYSY ane Digital Gujarat scholarship pan male chhe.";
    }
    if (lang === 'en') {
      return "Diploma Engineering fees are approximately 40,000 to 45,000 per year, while B-Tech fees are around 65,000 to 75,000 per year. MYSY and government scholarships are also available.";
    }
    return "Diploma Engineering ki fees lagbhag 40,000 se 45,000 rupaye per year hai, aur B-Tech ki fees lagbhag 65,000 se 75,000 rupaye per year hai. Gujarat Government ki MYSY aur Digital Gujarat scholarships se fees mein kaafi financial aid mil jaati hai.";
  }

  // 7. LABS & SPECIAL HUBS (DRONE & ROBOTICS)
  if (/\b(lab|labs|drone|aero vision|robotics|ai hub|infrastructure)\b/i.test(q) && !q.includes('syllabus')) {
    if (lang === 'gu') {
      return "Hansaba College ma AVPL International sathe Aero Vision Drone Laboratory chhe jya drones par practical training male chhe. Ane Gujarat Sarkar dwara Robotics ane AI nu official Anchor Institute pan run thay chhe.";
    }
    if (lang === 'en') {
      return "Hansaba College hosts the Aero Vision Drone Laboratory in partnership with AVPL International and operates the official Anchor Institute for Robotics and AI under the Government of Gujarat.";
    }
    return "Hansaba College mein AVPL International ke partnership mein Aero Vision Drone Laboratory sthit hai jahan drones par practical training milti hai. Saath hi Gujarat Government ke under Robotics aur AI ka official Anchor Institute bhi yahan run hota hai.";
  }

  // 8. CAMPUS LOCATION & HOSTEL & TRANSPORT
  if (/\b(campus|location|kahan hai|address|hostel|bus|transport|siddhpur|patan|kyan chhe|rehna)\b/i.test(q)) {
    if (lang === 'gu') {
      return "Hamaru campus Sujanpur Patia, State Highway 41, Siddhpur, Patan ma sthit chhe. Ahiya boys ane girls mate separate hostels, Wi-Fi, modern labs ane pure North Gujarat ma bus transport ni suvidha chhe.";
    }
    if (lang === 'en') {
      return "Our campus is located at Sujanpur Patia, State Highway 41, Siddhpur, Patan, Gujarat, featuring separate hostels for boys and girls, Wi-Fi, and transport facilities across North Gujarat.";
    }
    return "Hamara campus Sujanpur Patia, State Highway 41, Siddhpur, Patan, Gujarat mein sthit hai. Yahan boys aur girls ke liye separate modern hostels, Wi-Fi campus, AC labs aur poore North Gujarat ke liye bus transportation available hai.";
  }

  // -------------------------------------------------------------
  // BRANCH IDENTIFICATION HELPER
  // -------------------------------------------------------------
  const isAI = /\b(ai|artificial intelligence|machine learning|ml)\b/i.test(q);
  const isCSE = /\b(computer|cse|cs|it|information technology)\b/i.test(q) && !isAI;
  const isCyber = /\b(cyber|security)\b/i.test(q);
  const isCivil = /\b(civil)\b/i.test(q);
  const isMech = /\b(mech|mechanical)\b/i.test(q);
  const isElect = /\b(elect|electrical)\b/i.test(q);
  const isICT = /\b(ict)\b/i.test(q) && !isAI && !isCSE;
  const isDiploma = q.includes('diploma') || q.includes('polytechnic');
  const isBTech = q.includes('btech') || q.includes('b-tech') || q.includes('b.tech') || q.includes('degree');
  const sem = extractSemester(q);

  // -------------------------------------------------------------
  // INTENT 1: SYLLABUS, SUBJECTS, WHAT IS TAUGHT (CRITICAL PRIORITY!)
  // -------------------------------------------------------------
  const isSyllabusQuery = /\b(syllabus|subject|subjects|curriculum|kya padhate|kya sikhaya|kya sikhate|kya padhaya|kya padhna|kya sikhna|topics|padhai|kya course|course content|konsa subject|kaunse subject|vishay)\b/i.test(q);

  if (isSyllabusQuery) {
    // A. ARTIFICIAL INTELLIGENCE (B-Tech in AI)
    if (isAI) {
      if (!isVoiceMode) {
        return `### 📚 B-Tech in Artificial Intelligence & Machine Learning — Syllabus Details
**Faculty:** Hansaba College of Engineering and Technology (HCET), Gokul Global University
**Accreditation:** AICTE Approved, NAAC Grade A

| Semester | Key Core Subjects & Practical Labs |
|---|---|
| **Semester 1 & 2** | Mathematics-I & II, Programming for Problem Solving (Python/C), Applied Physics, Basic Electrical & Electronics, Engineering Graphics, Communication Skills |
| **Semester 3 & 4** | Data Structures & Algorithms, Object Oriented Programming (OOP), Database Management Systems (DBMS), Discrete Mathematics, Operating Systems, Computer Organization |
| **Semester 5** | Python Programming, Machine Learning, Advanced Java, Data Analytics, Computer Graphics |
| **Semester 6** | Artificial Neural Network (ANN), Business Intelligence, Cloud Computing, Block Chain, Internet of Things (IoT) |
| **Semester 7** | Industrial Internship & Major Project-I |
| **Semester 8** | Artificial Intelligence, Deep Neural Network, Natural Language Processing (NLP), Software Engineering, Data Science |

*Syllabus includes hands-on training at the official state Anchor Institute for Robotics and AI.*`;
      }

      // Voice response
      if (sem === '5') {
        return "Semester 5 mein Python Programming, Machine Learning, Advanced Java, Data Analytics aur Computer Graphics jaise core subjects sikhaye jaate hain.";
      }
      if (sem === '6') {
        return "Semester 6 mein Artificial Neural Network, Business Intelligence, Cloud Computing, Block Chain aur Internet of Things cover hota hai.";
      }
      if (sem === '8') {
        return "Semester 8 mein Artificial Intelligence, Deep Neural Network, Natural Language Processing, Software Engineering aur Data Science sikhaye jaate hain.";
      }
      if (sem === '1' || sem === '2') {
        return "First year mein basic engineering foundation sikhaya jata hai, jaise Mathematics, Applied Physics, Programming for Problem Solving in Python aur C, Engineering Graphics aur Communication Skills.";
      }
      return "B-Tech Artificial Intelligence mein Machine Learning, Python Programming, Artificial Neural Networks, Deep Learning, Natural Language Processing, Data Analytics, Computer Vision aur Robotics jaise core subjects sikhaye jaate hain. First year mein basic engineering foundation hota hai.";
    }

    // B. COMPUTER SCIENCE / CSE / IT
    if (isCSE || isICT) {
      if (isDiploma) {
        if (!isVoiceMode) {
          return `### 📚 Diploma in Computer Engineering — Semester 1 Syllabus
| S. No | Course Code | Course Name | Type | Credits | Theory | Tutorial | Practical |
|---|---|---|---|---|---|---|---|
| 1 | FED212001 | Mathematics-I | Basic Science | 3 | 2 | 1 | 0 |
| 2 | FED212002 | Communication Skill | Humanities | 3 | 2 | 0 | 2 |
| 3 | FED212003 | Applied Physics-I | Basic Science | 4 | 3 | 0 | 2 |
| 4 | FED212004 | Applied Chemistry | Basic Science | 4 | 3 | 0 | 2 |
| 5 | FED212005 | Sports and Yoga | Humanities | 1 | 0 | 0 | 2 |
| 6 | FED212207 | Engineering Graphics | Engineering Science | 3 | 2 | 0 | 2 |
| 7 | FED212208 | Engineering Workshop | Engineering Science | 2 | 0 | 0 | 4 |`;
        }
        return "Diploma Computer Engineering Semester 1 mein Mathematics-I, Communication Skills, Applied Physics, Applied Chemistry, Engineering Graphics aur Workshop sikhaya jaata hai. Higher semesters mein C Programming, Java, Data Structures aur Web Technology aati hai.";
      }

      if (!isVoiceMode) {
        return `### 📚 B-Tech Computer Science & Engineering (CSE) — Curriculum Overview
- **Year 1 (Sem 1-2):** Mathematics-I & II, Engineering Physics/Chemistry, Programming in C/Python, Basic Electronics, Engineering Graphics.
- **Year 2 (Sem 3-4):** Data Structures & Algorithms, OOP with Java/C++, Database Systems (DBMS), Operating Systems, Computer Networks.
- **Year 3 (Sem 5-6):** Full-Stack Web Development, Software Engineering, Cloud Computing, Artificial Intelligence, Cybersecurity Fundamentals.
- **Year 4 (Sem 7-8):** Big Data Analytics, Machine Learning, Industry Internship, Capstone Project.`;
      }
      return "Computer Science B-Tech mein Data Structures, Algorithms, Full-Stack Web Development, Database Management, Operating Systems, Cloud Computing, Computer Networks aur Artificial Intelligence sikhaya jata hai.";
    }

    // C. CYBER SECURITY
    if (isCyber) {
      return "B-Tech Cyber Security mein Network Defense, Ethical Hacking, Digital Forensics, Cryptography, Cyber Laws, Web Application Security aur Information Security Management sikhaya jata hai.";
    }

    // D. MECHANICAL ENGINEERING
    if (isMech) {
      return "Mechanical Engineering mein Engineering Mechanics, Thermodynamics, Fluid Mechanics, CAD-CAM, Manufacturing Processes, Heat Transfer, Machine Design aur Automobile Engineering sikhaya jata hai.";
    }

    // E. CIVIL ENGINEERING
    if (isCivil) {
      return "Civil Engineering mein Structural Analysis, Surveying, Concrete Technology, Geotechnical Engineering, Building Construction, Transportation Engineering aur Environmental Engineering sikhaya jata hai.";
    }

    // F. ELECTRICAL ENGINEERING
    if (isElect) {
      return "Electrical Engineering mein Electrical Circuits, Electric Machines, Power Systems, Control Systems, Renewable Solar Energy, Power Electronics aur Electric Vehicles sikhaya jata hai.";
    }

    // G. GENERIC SYLLABUS QUERY
    if (!isVoiceMode) {
      return `### 📚 Engineering Curriculum & Syllabus (Hansaba College of Engineering)
Gokul Global University offers comprehensive engineering curriculums for:
#### 1. Diploma Programs (3 Years / 6 Semesters):
- **Computer Engineering** | **ICT Engineering** | **Civil Engineering** | **Mechanical Engineering** | **Electrical Engineering** | **Automobile Engineering**
#### 2. B-Tech Programs (4 Years / 8 Semesters):
- **CSE (Artificial Intelligence)** | **CSE (Cyber Security)** | **Computer Science & Engineering** | **Information Technology** | **Civil Engineering** | **Mechanical Engineering** | **Electrical Engineering**`;
    }

    if (isDiploma) {
      return "Diploma Engineering mein Computer, ICT, Civil, Mechanical, Electrical aur Automobile branches available hain. Semester 1 mein Mathematics-I, Applied Physics, Communication Skills aur Engineering Graphics jaise core subjects hote hain.";
    }
    return "B-Tech mein Computer Science, Artificial Intelligence, Cyber Security, ICT, Electrical, Civil aur Mechanical branches available hain. Har branch ka detailed semester-wise syllabus ready hai. Aap kis branch ka syllabus dekhna chahte hain?";
  }

  // -------------------------------------------------------------
  // INTENT 2: ELIGIBILITY & MARKS & CRITERIA
  // -------------------------------------------------------------
  const isEligibilityQuery = /\b(eligibility|criteria|qualification|percentage|marks|cutoff|pass|12th|10th|laykat)\b/i.test(q);

  if (isEligibilityQuery) {
    if (isDiploma || q.includes('10th')) {
      if (lang === 'gu') return "Diploma Engineering mate 10th pass Maths, Science ane English sathe minimum 35 percent aggregate marks joiye.";
      return "Diploma Engineering ke liye candidate 10th pass hona chahiye Maths, Science aur English subjects ke saath, minimum 35 percent aggregate marks ke saath.";
    }
    if (q.includes('mtech') || q.includes('master')) {
      return "M-Tech ke liye candidate ke paas relevant branch mein B.E. ya B-Tech degree honi chahiye minimum 50 percent marks ke saath, aur reserved category ke liye 45 percent.";
    }
    if (isAI) {
      return "B-Tech in Artificial Intelligence mein admission ke liye 12th Science PCM mein minimum 45% marks hona zaroori hai (reserved categories ke liye 40%), aur saath mein valid GUJCET ya JEE Main score chahiye.";
    }
    return "B-Tech engineering programs ke liye 12th Science PCM mein minimum 45 percent marks chahiye (reserved category ke liye 40 percent), aur valid GUJCET ya JEE Main score hona chahiye.";
  }

  // -------------------------------------------------------------
  // INTENT 3: ADMISSION PROCESS & HOW TO APPLY ("mere ko admission lena hai")
  // -------------------------------------------------------------
  const isAdmissionQuery = /\b(admission|admit|apply|form|seat|dakhila|pravesh|lena hai|chahiye|kaise milega|process|counselling|acpc|acpdc)\b/i.test(q);

  if (isAdmissionQuery) {
    if (isAI) {
      if (lang === 'gu') {
        return "Haanji bilkul, B-Tech in Artificial Intelligence ma admission open chhe. Direct management quota ane ACPC merit counselling banne marfat admission male chhe. 12th Science PCM ma 45 percent ane GUJCET joiye.";
      }
      return "Haanji bilkul, B-Tech in Artificial Intelligence mein direct management quota aur ACPC merit counselling dono ke through admission open hai. Minimum eligibility 12th Science PCM mein 45% marks aur GUJCET score hai. GGU mein Robotics aur AI ka official state Anchor Institute bhi hai jahan advanced practical labs hain.";
    }

    if (isCSE) {
      return "Computer Science and Engineering B-Tech mein admission ke liye 12th Science PCM mein minimum 45% marks aur GUJCET score chahiye. Direct management quota aur ACPC counselling dono ke through admission mil sakta hai.";
    }

    if (isDiploma) {
      return "Diploma Engineering mein admission ke liye 10th standard Maths, Science aur English ke saath minimum 35 percent aggregate marks chahiye. Course duration 3 saal ka hai aur direct campus admission tatha ACPDC dono uplabdh hain.";
    }

    if (lang === 'gu') {
      return "Haanji zaroor! Gokul Global University ma Diploma ane B-Tech banne ma admissions open chhe. Direct campus admission ane ACPC/ACPDC merit counselling banne options available chhe. Tame 10th pachhi Diploma ma interest dharavo chho ke 12th pachhi B-Tech ma?";
    }
    return "Haanji zaroor! Gokul Global University mein admissions chal rahe hain. 10th ke baad 3 saal ka Diploma Engineering aur 12th Science ke baad 4 saal ka B-Tech kar sakte hain. Direct admission ke liye aap campus admission office par visit kar sakte hain ya ACPC counselling ke through apply kar sakte hain. Aap Diploma dekh rahe hain ya 12th ke baad B-Tech?";
  }

  // -------------------------------------------------------------
  // INTENT 4: GENERAL BRANCH OVERVIEW (When user asks about scope, branch info)
  // -------------------------------------------------------------
  if (isAI) {
    return "B-Tech in Artificial Intelligence GGU ka high-demand specialization hai jisme Machine Learning, Deep Learning aur Robotics sikhaya jata hai. Yahan Gujarat Sarkar dwara approved official Anchor Institute for Robotics and AI ki advanced labs hain.";
  }

  if (isCSE) {
    return "Computer Science and Engineering B-Tech mein Full-Stack Development, Cloud Computing, AI aur Data Structures cover hote hain, aur top IT companies mein 100% placement support di jaati hai.";
  }

  if (isCyber) {
    return "B-Tech in Cyber Security mein Network Defense, Ethical Hacking, Digital Forensics aur Information Security par practical training milti hai, jinki industry mein bahut high demand hai.";
  }

  if (isMech) {
    return "Mechanical Engineering Diploma, B-Tech aur M-Tech mein available hai. Ismein CAD-CAM, CNC machines, Thermodynamics aur Automobile design sikhaya jata hai.";
  }

  if (isCivil) {
    return "Civil Engineering Diploma aur B-Tech dono mein uplabdh hai. Ismein Structural Design, Surveying, Highway Engineering aur Construction Management cover hota hai.";
  }

  if (isElect) {
    return "Electrical Engineering Diploma aur B-Tech dono mein available hai. Isme Power Systems, Renewable Solar Energy, Electric Vehicles (EV) aur Industrial Automation sikhaya jata hai.";
  }

  if (isDiploma) {
    return "GGU mein 3 saal ka Diploma Engineering Computer, ICT, Electrical, Civil, Mechanical aur Automobile branches mein offer kiya jata hai. 10th pass 35 percent marks ke saath iski eligibility hai.";
  }

  if (isBTech) {
    return "GGU mein 4 saal ka B-Tech Computer Science, Artificial Intelligence, Cyber Security, ICT, Electrical, Civil aur Mechanical branches mein available hai. 12th Science PCM mein 45 percent marks iski eligibility hai.";
  }

  // -------------------------------------------------------------
  // NATURAL FALLBACK (Warm, concise, human-like counselor)
  // -------------------------------------------------------------
  if (lang === 'gu') {
    return "Gokul Global University Hansaba College of Engineering ma admissions open chhe. Tame Diploma ke B-Tech na koi pan course, fees athva admission process vishe puchhi shako chho.";
  }
  if (lang === 'en') {
    return "Admissions are open at Hansaba College of Engineering, Gokul Global University. You can ask about Diploma or B-Tech courses, fees, eligibility, or the admission process.";
  }
  return "Gokul Global University ke Hansaba College of Engineering mein admissions open hain. Aap Diploma ya B-Tech ke kisi bhi branch ke syllabus, fees, eligibility ya admission process ke baare mein pooch sakte hain.";
}
