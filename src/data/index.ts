// ── Types ──────────────────────────────────────
export interface MarqueeItem { emoji: string; text: string }
export interface StackItem { emoji: string; name: string }
export interface HeroCardData { cls: string; icon: string; main: string; sub: string; href: string }
export interface Project {
  num: string; type: string; title: string; period: string;
  desc: string; fullDesc: string; image: string;
  highlights: { icon: string; text: string }[];
  tags: { name: string; logo?: string }[];
  liveDemo?: string;
  videoDemo?: string;
}
export interface BlogPost { date: string; read: string; title: string; excerpt: string }
export interface Testimonial { avatar: string; name: string; role: string; quote: string }

// ── Marquee ────────────────────────────────────
export const marqueeItems: MarqueeItem[] = [
  { emoji: "🏆", text: "Dev Summit 2026 — 2nd Runner-Up" },
  { emoji: "🤖", text: "AI/ML Engineer" },
  { emoji: "⚡", text: "Full Stack Developer" },
  { emoji: "🎓", text: "B.Tech Computer Engineering" },
  { emoji: "🌐", text: "MERN Stack Specialist" },
  { emoji: "🧠", text: "LLM Integration Expert" },
  { emoji: "🎨", text: "UI/UX Enthusiast" },
  { emoji: "☁️", text: "Cloud Computing" },
  { emoji: "🚀", text: "Shipped 4+ Products" },
  { emoji: "💼", text: "IBM Trainee" },
  { emoji: "🔥", text: "Flaunch AI Intern" },
  { emoji: "🏅", text: "Hackathon Finalist" },
];

// ── Stack ──────────────────────────────────────
export const stackItems: StackItem[][] = [
  [
    { emoji: "🐍", name: "Python" }, { emoji: "💻", name: "C/C++" }, { emoji: "📄", name: "HTML5" },
    { emoji: "🎭", name: "CSS3" }, { emoji: "⚛️", name: "React.js" }, { emoji: "🎨", name: "Tailwind CSS" }
  ],
  [
    { emoji: "🟢", name: "Node.js" }, { emoji: "🚂", name: "Express.js" }, { emoji: "🐳", name: "Flask" },
    { emoji: "🍃", name: "MongoDB" }, { emoji: "🔥", name: "Firebase" }, { emoji: "🗃️", name: "SQL" },
    { emoji: "🔌", name: "REST APIs" }, { emoji: "🔷", name: "Socket.IO" }
  ],
  [
    { emoji: "🧠", name: "LLMs" }, { emoji: "⚡", name: "GROQ API" }, { emoji: "🐙", name: "Git" },
    { emoji: "🐙", name: "GitHub" }, { emoji: "🤖", name: "Arduino UNO" }
  ]
];

// ── Hero Cards ─────────────────────────────────
export const heroCards: HeroCardData[] = [
  { cls: "c1", icon: "📬", main: "Let's collaborate", sub: "janavizala0612@gmail.com", href: "mailto:janavizala0612@gmail.com" },
  { cls: "c2", icon: "github", main: "GitHub", sub: "Janavizala06", href: "https://github.com/Janavizala06" },
  { cls: "c3", icon: "📄", main: "Resume", sub: "View my experience", href: "resume" },
  { cls: "c4", icon: "🌏", main: "Based in India", sub: "Anand, Gujarat", href: "#" },
  { cls: "c5", icon: "🚀", main: "Projects", sub: "CodeTalk · LibTrack · MuseMate", href: "#projects" },
  { cls: "c6", icon: "💼", main: "LinkedIn", sub: "Connect with me", href: "https://linkedin.com/in/janavi-zala-226117288" },
];

// ── Projects ───────────────────────────────────
export const projects: Project[] = [
  {
    num: "01",
    type: "Embedded Robotics",
    title: "Arduino Robot",
    period: "2023",
    desc: "Autonomous Navigation & Real-Time Obstacle Avoidance System",
    fullDesc: "Embedded robotics project that combines real-time distance sensing, autonomous decision-making, and motor control to create a self-navigating robotic platform capable of avoiding obstacles and adapting to dynamic environments.",
    image: "/projects/robot.png",
    highlights: [
      { icon: "🧠", text: "Real-time obstacle detection using ultrasonic sensing" },
      { icon: "⚡", text: "Autonomous path correction & navigation logic" },
      { icon: "🔧", text: "Embedded motor control with efficient power management" },
      { icon: "📊", text: "Low-cost intelligent robotics prototype for automation applications" },
    ],
    tags: [
      { name: "Arduino UNO", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
      { name: "Embedded C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "HC-SR04" },
      { name: "L298N Motor Driver" },
      { name: "DC Gear Motors" },
      { name: "Battery Management System" },
    ],
  },
  {
    num: "02",
    type: "AI Chatbot",
    title: "MuseMate",
    period: "2024",
    desc: "AI-Powered Smart Ticketing & Visitor Engagement System",
    fullDesc: "Conversational AI platform designed to streamline ticket booking, enhance visitor engagement, and provide personalized travel assistance through intelligent natural language interactions.",
    image: "/projects/musemate.png",
    highlights: [
      { icon: "🧠", text: "Natural language ticket booking assistant" },
      { icon: "🎯", text: "Personalized recommendations & visitor guidance" },
      { icon: "📊", text: "Visitor insights & engagement analytics" },
      { icon: "🔒", text: "Secure and scalable AI-driven support system" },
    ],
    tags: [
      { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "NLP" },
      { name: "Machine Learning" },
      { name: "Generative AI" },
    ],
  },
  {
    num: "03",
    type: "AI Platform",
    title: "Flavour with Fusion",
    period: "2024",
    desc: "AI-Powered Recipe Generation & Culinary Discovery Platform",
    fullDesc: "Smart culinary platform that uses AI to generate personalized recipes based on available ingredients. Features advanced filtering, meal planning, and an intuitive user interface.",
    image: "/projects/flavour_fusion.png",
    liveDemo: "https://flavour-with-fusion-1.vercel.app/",
    highlights: [
      { icon: "🤖", text: "AI-generated fusion recipes from global cuisines" },
      { icon: "📊", text: "Nutritional analysis & health-focused meal planning" },
      { icon: "♻️", text: "Food waste reduction through ingredient optimization" },
      { icon: "🎯", text: "Personalized dietary recommendations & smart substitutions" },
    ],
    tags: [
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
      { name: "Spoonacular API" },
      { name: "Groq AI" },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    num: "04",
    type: "Web App",
    title: "LibTrack",
    period: "2025",
    desc: "Smart Digital Library & Resource Management Platform",
    fullDesc: "Full-stack library management solution that streamlines inventory management, lending operations, user engagement, and analytics through automated workflows, role-based access control, and real-time resource tracking.",
    image: "/projects/libtrack.png",
    liveDemo: "https://digitallib.vercel.app/",
    highlights: [
      { icon: "📖", text: "Comprehensive catalog, search & resource tracking" },
      { icon: "⚡", text: "Automated lending, returns & overdue fine management" },
      { icon: "🔐", text: "Secure role-based authentication & access control" },
      { icon: "📊", text: "Analytics, recommendations & user engagement features" },
    ],
    tags: [
      { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "JWT" },
      { name: "Mongoose" },
      { name: "Axios" },
    ],
  },
  {
    num: "05",
    type: "AI Platform",
    title: "CodeTalk",
    period: "2025",
    desc: "LLM-Powered Code Analysis & Error Explanation Platform",
    fullDesc: "Intelligent code analysis platform leveraging LLM technology to provide contextual error explanations, interactive debugging assistance, and real-time code insights across multiple programming languages.",
    image: "/projects/codetalk.png",
    liveDemo: "https://codetalk-2.vercel.app/",
    highlights: [
      { icon: "🧠", text: "LLM-powered code understanding" },
      { icon: "⚡", text: "Real-time analysis & instant feedback" },
      { icon: "🔍", text: "Context-aware error explanations" },
      { icon: "💡", text: "Interactive AI mentor for developers" },
    ],
    tags: [
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Streamlit", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg" },
      { name: "Groq API" },
      { name: "Llama 3.2" },
      { name: "LangChain" },
      { name: "ExecJS" },
    ],
  },
  {
    num: "06",
    type: "IT Monitoring",
    title: "InfraEye",
    period: "2026",
    desc: "Real-Time Endpoint Monitoring & Enterprise Asset Management Platform",
    fullDesc: "Centralized IT infrastructure monitoring platform that provides real-time endpoint visibility, asset tracking, network discovery, and license compliance across enterprise LAN environments.",
    image: "/projects/infraeye.png",
    videoDemo: "#",
    highlights: [
      { icon: "🖥️", text: "Real-time endpoint monitoring & alerts" },
      { icon: "📊", text: "Hardware, software & license inventory" },
      { icon: "🌐", text: "Automatic network discovery & device tracking" },
      { icon: "🔐", text: "Secure agent-based monitoring architecture" },
    ],
    tags: [
      { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
];

// ── Blog / Achievements ────────────────────────
export const posts: BlogPost[] = [
  {
    date: "2026", read: "Achievement",
    title: "Dev Summit 2026 — 2nd Runner-Up",
    excerpt: "Won Rs. 10,000 cash prize at a National Level Hackathon at Jagannath University, Jaipur. Competed against 500+ teams nationwide."
  },
  {
    date: "2025", read: "Recognition",
    title: "IBM GIFT City Recognition",
    excerpt: "Exclusively selected for IBM office visit at GIFT City, Gandhinagar for outstanding training performance during Full Stack Development program."
  },
  {
    date: "2025", read: "Achievement",
    title: "Unleash LLM Hackathon — Direct Finalist",
    excerpt: "Secured direct finals entry through excellence demonstrated during Flaunch internship. Built AI-powered solutions that stood out nationally."
  },
  {
    date: "2025", read: "Internship",
    title: "Flaunch — Top 20 & Level 2 Promotion",
    excerpt: "Earned Rs. 5,000 stipend for ranking among top performers nationally. Delivered CodeTalk as a top internship project."
  },
  {
    date: "2024", read: "Certification",
    title: "ITC Diploma in Programming Language",
    excerpt: "Certified in C, C++, Python, Web Design, SQL & Database Management from Information Technology Centre."
  },
];

// ── Testimonials / Experience ──────────────────
export const testimonials: Testimonial[] = [
  {
    avatar: "🤖", name: "Flaunch", role: "AI Technology Intern · Oct 2024 – Jan 2025",
    quote: "Designed and deployed conversational AI systems and LLM-powered applications serving real user workflows. Engineered seamless integrations between machine learning APIs and production-grade application pipelines."
  },
  {
    avatar: "💼", name: "IBM", role: "Full Stack Development Trainee · Aug 2025",
    quote: "Architected and shipped responsive full-stack web applications leveraging the MERN stack with RESTful API design. Designed and presented LibTrack as the program capstone."
  },
  {
    avatar: "🎓", name: "MBIT", role: "Chairperson, ISTE Student Branch · 2025 – Present",
    quote: "Spearheaded technical workshops and anchored large-scale college events as branch head. Leading a team of 50+ members in organizing hackathons and tech talks."
  },
  {
    avatar: "🎨", name: "MBIT", role: "Design Coordinator · 2024 – Present",
    quote: "Conceptualized and produced posters, banners & digital creatives; led visual identity for student initiatives across multiple departments."
  },
  {
    avatar: "📱", name: "NSS", role: "Social Media Coordinator · 2024 – 2025",
    quote: "Managed NSS social media presence: promoted community outreach drives and volunteer programs online, increasing engagement by 40%."
  },
  {
    avatar: "🤖", name: "CVM University", role: "Robotics Project Developer · Dec 2023 – Jan 2024",
    quote: "Developed and demonstrated an Arduino UNO robotics project at Gyanotsav 1.0; coordinated with a multidisciplinary team."
  },
];

// ── Nav sections for scroll tracking ───────────
export const navSections = ["hero", "about", "projects", "cta"] as const;
export const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  /*{ label: "Blog", href: "#blog" },*/
  { label: "Contact", href: "#cta" },
] as const;
