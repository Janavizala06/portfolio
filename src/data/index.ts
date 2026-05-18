// ── Types ──────────────────────────────────────
export interface MarqueeItem { emoji: string; text: string }
export interface StackItem { emoji: string; name: string }
export interface HeroCardData { cls: string; icon: string; main: string; sub: string; href: string }
export interface Project { num: string; type: string; title: string; period: string; desc: string; tags: string[] }
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
export const stackItems: StackItem[] = [
  { emoji: "🐍", name: "Python" }, { emoji: "⚛️", name: "React.js" },
  { emoji: "🟢", name: "Node.js" }, { emoji: "🚂", name: "Express.js" },
  { emoji: "🍃", name: "MongoDB" }, { emoji: "🔥", name: "Firebase" },
  { emoji: "🎨", name: "Tailwind CSS" }, { emoji: "📄", name: "HTML5" },
  { emoji: "🎭", name: "CSS3" }, { emoji: "🗃️", name: "SQL" },
  { emoji: "💻", name: "C/C++" }, { emoji: "🧠", name: "LLMs" },
  { emoji: "⚡", name: "GROQ API" }, { emoji: "🔌", name: "REST APIs" },
  { emoji: "🐙", name: "Git/GitHub" }, { emoji: "🤖", name: "Arduino UNO" },
  { emoji: "🐳", name: "Flask" }, { emoji: "🔷", name: "Socket.IO" },
];

// ── Hero Cards ─────────────────────────────────
export const heroCards: HeroCardData[] = [
  { cls: "c1", icon: "📬", main: "Let's collaborate", sub: "janavi0612@gmail.com", href: "mailto:janavi0612@gmail.com" },
  { cls: "c2", icon: "github", main: "GitHub", sub: "Janavizala06", href: "https://github.com/Janavizala06" },
  { cls: "c3", icon: "📄", main: "Resume", sub: "View my experience", href: "resume" },
  { cls: "c4", icon: "🌏", main: "Based in India", sub: "Anand, Gujarat", href: "#" },
  { cls: "c5", icon: "🚀", main: "Projects", sub: "CodeTalk · LibTrack · MuseMate", href: "#projects" },
  { cls: "c6", icon: "💼", main: "LinkedIn", sub: "Connect with me", href: "https://linkedin.com/in/janavi-zala-226117288" },
];

// ── Projects ───────────────────────────────────
export const projects: Project[] = [
  { num: "01", type: "AI Platform", title: "CodeTalk", period: "2025",
    desc: "An intelligent platform that performs real-time code analysis, identifies bugs, and generates context-aware debugging recommendations using large language models.",
    tags: ["Python", "GROQ API", "LLM", "AI/ML", "Real-time Analysis"] },
  { num: "02", type: "Web App", title: "LibTrack", period: "2025",
    desc: "A complete library management solution featuring book cataloguing, member registration, and automated issue/return tracking with a responsive UI.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"] },
  { num: "03", type: "Web App", title: "Smart Recipe Generator", period: "2025",
    desc: "An AI-assisted meal planning web app enabling personalized recipe discovery, weekly planning, and dynamic ingredient suggestions.",
    tags: ["GROQ API", "MealDB API", "Firebase Auth", "AI/ML", "Web App"] },
  { num: "04", type: "AI Chatbot", title: "MuseMate", period: "2024",
    desc: "A WebSocket-driven chatbot for museum visitors enabling real-time exhibit exploration and ticket booking through an intelligent knowledge base.",
    tags: ["Python", "Flask", "Flask-SocketIO", "WebSocket", "AI Chatbot"] },
];

// ── Blog / Achievements ────────────────────────
export const posts: BlogPost[] = [
  { date: "2026", read: "Achievement",
    title: "Dev Summit 2026 — 2nd Runner-Up",
    excerpt: "Won Rs. 10,000 cash prize at a National Level Hackathon at Jagannath University, Jaipur. Competed against 500+ teams nationwide." },
  { date: "2025", read: "Recognition",
    title: "IBM GIFT City Recognition",
    excerpt: "Exclusively selected for IBM office visit at GIFT City, Gandhinagar for outstanding training performance during Full Stack Development program." },
  { date: "2025", read: "Achievement",
    title: "Unleash LLM Hackathon — Direct Finalist",
    excerpt: "Secured direct finals entry through excellence demonstrated during Flaunch internship. Built AI-powered solutions that stood out nationally." },
  { date: "2025", read: "Internship",
    title: "Flaunch — Top 20 & Level 2 Promotion",
    excerpt: "Earned Rs. 5,000 stipend for ranking among top performers nationally. Delivered CodeTalk as a top internship project." },
  { date: "2024", read: "Certification",
    title: "ITC Diploma in Programming Language",
    excerpt: "Certified in C, C++, Python, Web Design, SQL & Database Management from Information Technology Centre." },
];

// ── Testimonials / Experience ──────────────────
export const testimonials: Testimonial[] = [
  { avatar: "🤖", name: "Flaunch", role: "AI Technology Intern · Oct 2024 – Jan 2025",
    quote: "Designed and deployed conversational AI systems and LLM-powered applications serving real user workflows. Engineered seamless integrations between machine learning APIs and production-grade application pipelines." },
  { avatar: "💼", name: "IBM", role: "Full Stack Development Trainee · Aug 2025",
    quote: "Architected and shipped responsive full-stack web applications leveraging the MERN stack with RESTful API design. Designed and presented LibTrack as the program capstone." },
  { avatar: "🎓", name: "MBIT", role: "Chairperson, ISTE Student Branch · 2025 – Present",
    quote: "Spearheaded technical workshops and anchored large-scale college events as branch head. Leading a team of 50+ members in organizing hackathons and tech talks." },
  { avatar: "🎨", name: "MBIT", role: "Design Coordinator · 2024 – Present",
    quote: "Conceptualized and produced posters, banners & digital creatives; led visual identity for student initiatives across multiple departments." },
  { avatar: "📱", name: "NSS", role: "Social Media Coordinator · 2024 – 2025",
    quote: "Managed NSS social media presence: promoted community outreach drives and volunteer programs online, increasing engagement by 40%." },
  { avatar: "🤖", name: "CVM University", role: "Robotics Project Developer · Dec 2023 – Jan 2024",
    quote: "Developed and demonstrated an Arduino UNO robotics project at Gyanotsav 1.0; coordinated with a multidisciplinary team." },
];

// ── Nav sections for scroll tracking ───────────
export const navSections = ["hero", "about", "projects", "blog", "cta"] as const;
export const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#cta" },
] as const;
