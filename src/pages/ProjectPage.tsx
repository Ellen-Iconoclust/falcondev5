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
        {/* Title Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 sm:mb-16">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl sm:text-8xl lg:text-[10rem] leading-none break-words"
          >
            {project.title}
          </motion.h1>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-xl sm:text-3xl opacity-50"
          >
            {project.year}
          </motion.span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content: Image & Description */}
          <div className="lg:col-span-8 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="brutalist-card p-0 overflow-hidden aspect-video relative group"
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 border-4 border-dark pointer-events-none" />
            </motion.div>

            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <span className="font-mono text-sm uppercase tracking-widest bg-dark text-light px-2 py-1">
                  {project.category}
                </span>
                <p className="text-xl sm:text-3xl leading-tight font-medium max-w-3xl">
                  {project.description}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <h3 className="font-display text-2xl uppercase border-b-2 border-dark pb-2">Technologies</h3>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="font-mono text-sm border-2 border-dark px-3 py-1 bg-gray">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Sidebar/Actions */}
          <div className="lg:col-span-4 flex flex-col justify-end">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-8 border-t-2 lg:border-t-0 lg:border-l-2 border-dark lg:pl-8 flex flex-col gap-6"
            >
              <a 
                href={project.visitUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="brutalist-button flex items-center justify-center gap-2 text-xl sm:text-2xl w-full py-4 sm:py-6"
              >
                VISIT PROJECT <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <div className="flex gap-4 justify-center lg:justify-start">
                <button className="flex-1 p-4 sm:p-6 border-2 border-dark hover:bg-dark hover:text-accent transition-all flex justify-center">
                  <Github className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
                <button className="flex-1 p-4 sm:p-6 border-2 border-dark hover:bg-dark hover:text-accent transition-all flex justify-center">
                  <Globe className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
              </div>
            </motion.div>
          </div>
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
