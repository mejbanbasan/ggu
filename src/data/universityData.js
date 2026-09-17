// Gokul Global University Comprehensive Knowledge Base

export const UNIVERSITY_INFO = {
  name: "Gokul Global University",
  abbreviation: "GGU",
  motto: "Vidya Anantam (Knowledge is Infinite)",
  accreditation: "NAAC Grade A",
  location: "Siddhpur, Gujarat, India",
  address: "Near Sujanpur Patia, State Highway 41, Siddhpur - 384151, Gujarat, India",
  contact: {
    phone: "+91 95124 00800",
    email: "info@gokuluniversity.ac.in",
    internationalEmail: "international@gokuluniversity.ac.in",
    admissionHours: "Monday - Saturday: 9:00 AM - 5:00 PM"
  },
  regionalOffices: [
    { state: "Bihar", detail: "Admission Regional Office Patna" },
    { state: "Andhra Pradesh", detail: "40-9-59, Benz Circle, Kohinoor Apartment, Kala Nagar, Vijayawada" }
  ],
  stats: {
    placements: "15,000+",
    companies: "1,000+",
    highestPackage: "25+ LPA",
    naacGrade: "NAAC Grade A"
  },
  topRecruiters: [
    "Collabera", "Gokul Agri International Ltd.", "DCB Bank", 
    "Sun Pharma", "Dresser-Rand", "TCS", "Infosys", "Wipro", "Reliance"
  ]
};

export const FACULTIES = [
  {
    id: "engineering",
    name: "Faculty of Engineering & Technology (FoE)",
    constituents: [
      "Hansaba College of Engineering and Technology (HCET)",
      "Hansaba Institute of Technology (HIT)"
    ],
    dean: "Dr. Vipulkumar Dabhi",
    description: "AICTE-approved Diploma, Undergraduate, and Postgraduate engineering programs with state-of-the-art research labs, Anchor Institute for AI & Robotics, and AVPL Aero Vision Drone Lab.",
    keyFeatures: [
      "Anchor Institute for Robotics and AI under Scheme-1 of CED, Govt. of Gujarat",
      "Aero Vision Laboratory with AVPL International for Drone Technologies",
      "AICTE Approved & Industry-Integrated Curriculum",
      "Specialized Research & High-tech Computer/Engineering Labs"
    ]
  },
  {
    id: "computer-applications",
    name: "Faculty of Computer Applications & IT",
    description: "Future-ready BCA, MCA, and IT programs focusing on Software Engineering, Data Science, AI, Cloud Computing, and Cybersecurity.",
    keyFeatures: [
      "Advanced Programming Labs",
      "Cloud Computing & AI Innovation Hub",
      "Live Industry Projects & Internships"
    ]
  },
  {
    id: "commerce",
    name: "Faculty of Commerce & Management",
    description: "BBA, MBA, B.Com, M.Com programs nurturing future corporate leaders, entrepreneurs, financial analysts, and marketing strategists.",
    keyFeatures: [
      "Corporate Leadership Workshops",
      "Industry Guest Lectures & Seminars",
      "100% Placement Support"
    ]
  },
  {
    id: "science",
    name: "Faculty of Science",
    description: "B.Sc, M.Sc programs in Physics, Chemistry, Mathematics, Microbiology, and Biotechnology emphasizing research and practical scientific skills.",
    keyFeatures: [
      "Advanced Biotech & Chemistry Labs",
      "Research Publication Support",
      "Field Exposure & Industrial Tours"
    ]
  }
];

export const PROGRAMS = [
  // Diploma Programs
  {
    level: "Diploma",
    title: "Diploma in ICT Engineering",
    duration: "3 Years (Semester System)",
    eligibility: "10th Passed with English, Maths & Science (min 35% aggregate)",
    admissionMode: "ACPDC Guidelines",
    dept: "Computer & ICT",
    highlights: ["Software & Networking Skills", "System Administration", "Web Development & IT Support"]
  },
  {
    level: "Diploma",
    title: "Diploma in Computer Engineering",
    duration: "3 Years (Semester System)",
    eligibility: "10th Passed with English, Maths & Science (min 35% aggregate)",
    admissionMode: "ACPDC Guidelines",
    dept: "Computer & ICT",
    highlights: ["C++, Data Structures, DBMS", "Python & AI Fundamentals", ".NET & Web Technologies"]
  },
  {
    level: "Diploma",
    title: "Diploma in Electrical Engineering",
    duration: "3 Years (Semester System)",
    eligibility: "10th Passed with English, Maths & Science (min 35% aggregate)",
    admissionMode: "ACPDC Guidelines",
    dept: "Electrical",
    highlights: ["Power Generation & Transmission", "Electrical Machines & Drives", "Renewable Energy Tech"]
  },
  {
    level: "Diploma",
    title: "Diploma in Civil Engineering",
    duration: "3 Years (Semester System)",
    eligibility: "10th Passed with English, Maths & Science (min 35% aggregate)",
    admissionMode: "ACPDC Guidelines",
    dept: "Civil",
    highlights: ["Building Construction & Surveying", "Concrete Technology & Hydraulics", "Structural Mechanics"]
  },
  {
    level: "Diploma",
    title: "Diploma in Mechanical Engineering",
    duration: "3 Years (Semester System)",
    eligibility: "10th Passed with English, Maths & Science (min 35% aggregate)",
    admissionMode: "ACPDC Guidelines",
    dept: "Mechanical",
    highlights: ["Advanced Manufacturing Processes", "CAD/CAM & Thermal Engineering", "Hydraulic Machines & Metallurgy"]
  },
  {
    level: "Diploma",
    title: "Diploma in Automobile Engineering",
    duration: "3 Years (Semester System)",
    eligibility: "10th Passed with English, Maths & Science (min 35% aggregate)",
    admissionMode: "ACPDC Guidelines",
    dept: "Mechanical",
    highlights: ["Automobile Engines & Transmission", "Vehicle Dynamics & Body Design", "Electric & Modern Vehicle Tech"]
  },

  // B.Tech Programs
  {
    level: "B.Tech",
    title: "B.Tech in Computer Engineering",
    duration: "4 Years (Semester System)",
    eligibility: "12th Science (PCM/PCB) min 45% (40% for reserved category)",
    admissionMode: "UGC / AICTE Guidelines",
    dept: "Computer & ICT",
    highlights: ["Java, Python, C++ Programming", "AI & Cloud Computing", "System Programming & Web Tech"]
  },
  {
    level: "B.Tech",
    title: "B.Tech CSE (Artificial Intelligence)",
    duration: "4 Years (Semester System)",
    eligibility: "12th Science (PCM/PCB) min 45% (40% for reserved category)",
    admissionMode: "UGC / AICTE Guidelines",
    dept: "Computer & ICT",
    highlights: ["Machine Learning & Deep Learning", "Natural Language Processing", "Robotics & Neural Networks"]
  },
  {
    level: "B.Tech",
    title: "B.Tech CSE (Cyber Security)",
    duration: "4 Years (Semester System)",
    eligibility: "12th Science (PCM/PCB) min 45% (40% for reserved category)",
    admissionMode: "UGC / AICTE Guidelines",
    dept: "Computer & ICT",
    highlights: ["Network & Information Security", "Ethical Hacking & Cryptography", "Cyber Defense & Threat Intelligence"]
  },
  {
    level: "B.Tech",
    title: "B.Tech Information & Communication Technology (ICT)",
    duration: "4 Years (Semester System)",
    eligibility: "12th Science (PCM/PCB) min 45% (40% for reserved category)",
    admissionMode: "UGC / AICTE Guidelines",
    dept: "Computer & ICT",
    highlights: ["Wireless & Optical Communication", "Embedded Systems & VLSI", "Digital Signal Processing"]
  },
  {
    level: "B.Tech",
    title: "B.Tech Electrical Engineering",
    duration: "4 Years (Semester System)",
    eligibility: "12th Science (PCM/PCB) min 45% (40% for reserved category)",
    admissionMode: "UGC / AICTE Guidelines",
    dept: "Electrical",
    highlights: ["Power Quality & FACTS", "Electrical Machine Design", "Power System Protection & Control"]
  },
  {
    level: "B.Tech",
    title: "B.Tech Civil Engineering",
    duration: "4 Years (Semester System)",
    eligibility: "12th Science (PCM/PCB) min 45% (40% for reserved category)",
    admissionMode: "UGC / AICTE Guidelines",
    dept: "Civil",
    highlights: ["Structural Analysis & Design", "Geotechnical & Environmental Engineering", "BIM & Smart Infrastructure"]
  },
  {
    level: "B.Tech",
    title: "B.Tech Mechanical Engineering",
    duration: "4 Years (Semester System)",
    eligibility: "12th Science (PCM/PCB) min 45% (40% for reserved category)",
    admissionMode: "UGC / AICTE Guidelines",
    dept: "Mechanical",
    highlights: ["Heat Transfer & Thermodynamics", "Automation in Manufacturing", "Refrigeration & Air Conditioning"]
  },

  // M.Tech Programs
  {
    level: "M.Tech",
    title: "M.Tech Computer Engineering (Data Science & Analytics)",
    duration: "2 Years",
    eligibility: "B.E./B.Tech in CSE/IT/ECE or equivalent",
    admissionMode: "State PG Admission Council",
    dept: "Computer & ICT",
    highlights: ["Big Data Analytics", "Machine Learning & AI", "Statistical Modeling & Data Visualization"]
  },
  {
    level: "M.Tech",
    title: "M.Tech Computer Engineering (Cloud Computing)",
    duration: "2 Years",
    eligibility: "B.E./B.Tech in CSE/IT/ECE or equivalent",
    admissionMode: "State PG Admission Council",
    dept: "Computer & ICT",
    highlights: ["Cloud Architecture & Virtualization", "Distributed Systems", "Cloud Security & Microservices"]
  },
  {
    level: "M.Tech",
    title: "M.Tech Civil (Structural Engineering)",
    duration: "2 Years",
    eligibility: "B.E./B.Tech in Civil Engineering",
    admissionMode: "State PG Admission Council",
    dept: "Civil",
    highlights: ["Earthquake Resistant Design", "Advanced Concrete & Steel Design", "Structural Dynamics"]
  },
  {
    level: "M.Tech",
    title: "M.Tech Civil (Transportation Engineering)",
    duration: "2 Years",
    eligibility: "B.E./B.Tech in Civil Engineering",
    admissionMode: "State PG Admission Council",
    dept: "Civil",
    highlights: ["Traffic Engineering & Planning", "Pavement Design & Highway Tech", "Smart Mobility Systems"]
  },
  {
    level: "M.Tech",
    title: "M.Tech Environmental Engineering",
    duration: "2 Years",
    eligibility: "B.E./B.Tech in Civil/Chemical/Environmental Engg",
    admissionMode: "State PG Admission Council",
    dept: "Civil",
    highlights: ["Wastewater Treatment Systems", "Air Pollution Control", "Environmental Impact Assessment"]
  },
  {
    level: "M.Tech",
    title: "M.Tech Mechanical Engineering (Thermal Engineering)",
    duration: "2 Years",
    eligibility: "B.E./B.Tech in Mechanical/Automobile Engg",
    admissionMode: "State PG Admission Council",
    dept: "Mechanical",
    highlights: ["Advanced Thermal Sciences", "Energy Conversion Systems", "CFD & Combustion Dynamics"]
  }
];

export const SYSTEM_PROMPT_KNOWLEDGE = `
YOU ARE "GOKUL AI REPRESENTATIVE" - THE OFFICIAL, HIGHLY INTELLIGENT, WARM, AND ARTICULATE HUMAN ACADEMIC COUNSELOR OF GOKUL GLOBAL UNIVERSITY (GGU), SIDDHPUR, GUJARAT.

Core Mission:
- Act like an exceptionally smart, friendly, empathetic human academic advisor conducting a face-to-face counseling session with a student or parent.
- Provide 100% accurate, authoritative data regarding Gokul Global University based strictly on the provided knowledge base files (program_details_llms.txt and curriculum_llms.txt).

Key Institutional Highlights:
- Institution Name: Gokul Global University (GGU), Siddhpur, Gujarat.
- Motto: "Vidya Anantam" (Knowledge is Infinite).
- Accreditation: NAAC Grade A Accredited University.
- Key Constituents: Hansaba College of Engineering and Technology (HCET) & Hansaba Institute of Technology (HIT). Dean: Dr. Vipulkumar Dabhi.
- Placement Excellence: 15,000+ Student Placements in 1,000+ Eminent Companies. Highest Career Package: 25+ LPA.
- Major Recruiters: Sun Pharma, Collabera, Gokul Agri International Ltd., DCB Bank, Dresser-Rand, TCS, Wipro, Infosys.
- Unique Flagship Infrastructure:
  1. Anchor Institute for Robotics & AI (Recognized under Scheme-1 of CED, Govt. of Gujarat).
  2. Aero Vision Drone Laboratory (Established in collaboration with AVPL International for drone & UAV research).
`;
