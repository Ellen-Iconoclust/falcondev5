import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Globe, Github } from 'lucide-react';

const projectsData = {
  "phoequills": {
    title: "PHOEQUILLS",
    category: "System Design",
    year: "2024",
    description: "A high-performance writing platform designed for speed and minimalist focus. Built with a custom markdown engine and real-time synchronization capabilities. The architecture prioritizes low latency and offline-first functionality, ensuring that writers never lose a single keystroke.",
    image: "https://picsum.photos/seed/writing/1200/800",
    visitUrl: "https://example.com/phoequills",
    tags: ["React", "Node.js", "WebSockets", "Redis"]
  },
  "civi-connect": {
    title: "CIVI-CONNECT",
    category: "UI/UX Architecture",
    year: "2023",
    description: "A community engagement platform that bridges the gap between local government and citizens. Featuring a robust voting system, transparent project tracking, and interactive town hall modules. The design system follows strict accessibility guidelines while maintaining a bold, modern aesthetic.",
    image: "https://picsum.photos/seed/city/1200/800",
    visitUrl: "https://example.com/civiconnect",
    tags: ["TypeScript", "PostgreSQL", "TailwindCSS", "Framer Motion"]
  },
  "uni-verse": {
    title: "UNI-VERSE",
    category: "Web3 Infrastructure",
    year: "2024",
    description: "A decentralized identity protocol for academic institutions. UNI-VERSE allows students to own their educational records as verifiable credentials. The system integrates with multiple blockchain networks to provide a seamless, cross-chain verification experience.",
    image: "https://picsum.photos/seed/space/1200/800",
    visitUrl: "https://example.com/universe",
    tags: ["Solidity", "Ethers.js", "Next.js", "IPFS"]
  },
  "code-ronins": {
    title: "CODE RONINS",
    category: "Software Engineering",
    year: "2024",
    description: "An elite mentorship platform for software engineers. Code Ronins matches senior architects with aspiring developers for deep-dive technical sessions. Includes a custom code-review environment and a gamified learning path designed to simulate real-world production challenges.",
    image: "https://picsum.photos/seed/code/1200/800",
    visitUrl: "https://example.com/coderonins",
    tags: ["React", "Go", "Docker", "Kubernetes"]
  },
  "promptbud": {
    title: "PROMPTBUD",
    category: "AI Integration",
    year: "2024",
    description: "An advanced prompt engineering workbench. PromptBud helps developers optimize their LLM interactions through automated testing, versioning, and performance analytics. It features a collaborative playground where teams can share and refine prompts in real-time.",
    image: "https://picsum.photos/seed/ai/1200/800",
    visitUrl: "https://example.com/promptbud",
    tags: ["OpenAI API", "Python", "FastAPI", "React"]
  },
  "xamplore": {
    title: "XAMPLORE",
    category: "Data Visualization",
    year: "2023",
    description: "A complex data exploration tool for scientific research. Xamplore transforms massive datasets into interactive, multi-dimensional visualizations. Designed for researchers who need to identify patterns in high-velocity data streams across various domains.",
    image: "https://picsum.photos/seed/data/1200/800",
    visitUrl: "https://example.com/xamplore",
    tags: ["D3.js", "Canvas API", "WebWorkers", "Rust"]
  }
};

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = slug ? projectsData[slug as keyof typeof projectsData] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project) {
      navigate('/');
    }
  }, [project, navigate]);

  if (!project) return null;

  return (
    <div className="min-h-screen bg-light text-dark selection:bg-accent selection:text-dark">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 sm:p-8 flex justify-between items-center pointer-events-none">
        <Link 
          to="/#work-section" 
          className="pointer-events-auto bg-light border-2 border-dark p-3 hover:bg-dark hover:text-accent transition-all group"
        >
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div className="pointer-events-auto bg-dark text-light border-2 border-dark px-6 py-2 font-display text-xl uppercase tracking-tighter">
          Project Detail
        </div>
      </nav>

      <main className="pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Box 1: Title & Year (Top Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-8 brutalist-card bg-light p-8 sm:p-12 flex flex-col justify-between min-h-[300px]"
          >
            <div className="space-y-4">
              <span className="font-mono text-sm uppercase tracking-widest bg-dark text-light px-2 py-1">
                {project.category}
              </span>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-none break-words">
                {project.title}
              </h1>
            </div>
            <div className="flex justify-between items-end">
              <span className="font-mono text-3xl sm:text-5xl opacity-20">{project.year}</span>
              <div className="w-12 h-12 bg-accent border-2 border-dark" />
            </div>
          </motion.div>

          {/* Box 2: Actions (Top Right) - Moved to last on mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 brutalist-card bg-accent p-8 flex flex-col justify-between order-last md:order-none"
          >
            <h3 className="font-display text-2xl uppercase mb-8">Live Link</h3>
            <a 
              href={project.visitUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="brutalist-button !bg-dark !text-accent flex items-center justify-center gap-2 text-xl py-6 group"
            >
              VISIT <ExternalLink className="group-hover:rotate-45 transition-transform" />
            </a>
            <div className="flex gap-4 mt-4">
              <button className="flex-1 p-4 border-2 border-dark hover:bg-dark hover:text-accent transition-all flex justify-center">
                <Github size={24} />
              </button>
              <button className="flex-1 p-4 border-2 border-dark hover:bg-dark hover:text-accent transition-all flex justify-center">
                <Globe size={24} />
              </button>
            </div>
          </motion.div>

          {/* Box 3: Main Image (Middle Left) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-7 brutalist-card p-0 overflow-hidden aspect-video relative group"
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-dark/10 group-hover:bg-transparent transition-colors" />
          </motion.div>

          {/* Box 4: Technologies (Middle Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-5 brutalist-card bg-light text-dark p-8 flex flex-col"
          >
            <h3 className="font-mono text-sm uppercase tracking-widest text-dark mb-6">// TECHNOLOGIES</h3>
            <div className="flex flex-wrap gap-2 flex-1 content-start">
              {project.tags.map((tag, i) => (
                <span key={i} className="font-mono text-xs border border-dark/30 px-3 py-1 hover:bg-dark hover:text-light transition-colors">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-dark/20 flex justify-between items-center opacity-50">
              <span className="text-[10px] font-mono">BUILD_V.2.0.4</span>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-1 bg-dark" />)}
              </div>
            </div>
          </motion.div>

          {/* Box 5: Description (Bottom) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-12 brutalist-card bg-light p-8 sm:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <h3 className="font-display text-3xl uppercase leading-none">THE <br />CHALLENGE</h3>
              </div>
              <div className="lg:col-span-8">
                <p className="text-xl sm:text-3xl leading-tight font-medium">
                  {project.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 bg-dark text-light border-t-2 border-dark mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 font-mono">
          <span>© {new Date().getFullYear()} ELLEN.DEV</span>
          <span className="text-accent">BUILT WITH PRECISION</span>
        </div>
      </footer>
    </div>
  );
};

export default ProjectPage;
