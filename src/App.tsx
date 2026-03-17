/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue, useSpring } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { 
  Zap, 
  Shield, 
  Rocket, 
  Mail, 
  Github, 
  Twitter, 
  Linkedin, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Globe, 
  Smartphone,
  ArrowRight,
  Plus,
  Menu,
  X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import AboutPage from './pages/AboutPage';
import ProjectPage from './pages/ProjectPage';
import Loader from './components/Loader';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHeroActive, setIsHeroActive] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsHeroActive(false);
    } else {
      setIsHeroActive(true);
    }
  });

  const isExpanded = isHeroActive || isHovered;

  const navLinks = [
    { name: 'Work', href: '#work-section' },
    { name: 'Stack', href: '#stack-section' },
    { name: 'Contact', href: '#contact-section' },
    { name: 'About', href: '/about', isLink: true },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-8 pointer-events-none">
        {/* Desktop Navbar */}
        <motion.nav 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            width: isExpanded ? 'min(600px, 90vw)' : '100px',
          }}
          transition={{ 
            y: { duration: 0.8, delay: 0.5 },
            opacity: { duration: 0.8, delay: 0.5 },
            width: { type: 'spring', stiffness: 200, damping: 25 }
          }}
          className="hidden sm:flex bg-light text-dark border-2 border-dark items-center justify-between px-6 h-16 pointer-events-auto overflow-hidden"
        >
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-display text-2xl tracking-tighter">E.</span>
            {isExpanded && <span className="font-display text-2xl tracking-tighter">LLEN</span>}
          </div>

          {isExpanded && (
            <div className="flex items-center gap-8 font-display text-xl whitespace-nowrap">
              {navLinks.map((item) => (
                item.isLink ? (
                  <Link key={item.name} to={item.href} className="hover:text-accent active:text-accent transition-colors">
                    {item.name}
                  </Link>
                ) : (
                  <a key={item.name} href={item.href} className="hover:text-accent active:text-accent transition-colors">
                    {item.name}
                  </a>
                )
              ))}
            </div>
          )}

          {!isExpanded && <Plus className="text-accent" size={20} />}
        </motion.nav>

        {/* Mobile Navbar */}
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="sm:hidden w-64 flex items-center justify-between bg-light text-dark border-2 border-dark px-4 h-14 pointer-events-auto"
        >
          <span className="font-display text-xl tracking-tighter">ELLEN</span>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 hover:text-accent transition-colors"
          >
            <Menu size={24} />
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[60] bg-dark text-light sm:hidden flex flex-col p-8"
      >
        <div className="flex justify-between items-center mb-16">
          <span className="font-display text-3xl tracking-tighter text-accent">ELLEN</span>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 border-2 border-accent text-accent hover:bg-accent hover:text-dark transition-all"
          >
            <X size={32} />
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {navLinks.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0, 
                x: isMobileMenuOpen ? 0 : 20 
              }}
              transition={{ delay: i * 0.1 }}
            >
              {item.isLink ? (
                <Link 
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-6xl font-display hover:text-accent transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <a 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-6xl font-display hover:text-accent transition-colors"
                >
                  {item.name}
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-auto pt-8 border-t border-light/20">
          <p className="font-mono text-xs uppercase opacity-50 mb-4">Socials</p>
          <div className="flex gap-8">
            <a href="#" className="font-mono text-sm hover:text-accent">TW</a>
            <a href="#" className="font-mono text-sm hover:text-accent">GH</a>
            <a href="#" className="font-mono text-sm hover:text-accent">LI</a>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const InteractiveDataFlow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      life: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.color = Math.random() > 0.5 ? '#00FF00' : '#FFFFFF';
        this.life = Math.random() * 100;
      }

      update(w: number, h: number, mouse: { x: number; y: number; active: boolean }) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            const force = (150 - distance) / 150;
            this.speedX -= dx * force * 0.02;
            this.speedY -= dy * force * 0.02;
          }
        }

        // Friction
        this.speedX *= 0.98;
        this.speedY *= 0.98;

        // Bounce
        if (this.x < 0 || this.x > w) this.speedX *= -1;
        if (this.y < 0 || this.y > h) this.speedY *= -1;

        this.life -= 0.1;
        if (this.life <= 0) {
          this.x = Math.random() * w;
          this.y = Math.random() * h;
          this.life = Math.random() * 100;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.globalAlpha = this.life / 100;
        context.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.05)';
      ctx.lineWidth = 0.5;
      const gridSize = 30;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      particles.forEach(p => {
        p.update(canvas.width, canvas.height, mouseRef.current);
        p.draw(ctx);
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    };
  };

  return (
    <div 
      className="w-full h-full min-h-[400px] bg-dark relative overflow-hidden group cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => mouseRef.current.active = true}
      onMouseLeave={() => mouseRef.current.active = false}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-accent font-mono text-[10px] uppercase tracking-[0.5em] mb-4 opacity-20">Neural_Network_Active</div>
        <div className="w-32 h-32 border border-accent/10 rounded-full flex items-center justify-center">
          <div className="w-24 h-24 border border-accent/20 rounded-full animate-pulse flex items-center justify-center">
            <Cpu className="text-accent/40" size={32} />
          </div>
        </div>
      </div>

      {/* Interactive Label */}
      <div className="absolute bottom-6 left-6 font-mono text-[9px] text-accent/50 uppercase">
        // Data_Flow_Simulation_v1.0.4<br/>
        // Status: Operational
      </div>
    </div>
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section id="hero" ref={heroRef} className="min-h-screen flex flex-col items-center justify-center pt-24 sm:pt-32 pb-12 sm:pb-24 px-4 sm:px-6 bg-light">
      <div className="max-w-7xl w-full -translate-y-2 sm:-translate-y-3 lg:-translate-y-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-2 border-dark overflow-hidden">
          <div className="lg:col-span-8 p-6 sm:p-10 lg:py-12 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-dark bg-light relative z-10">
            <div className="space-y-6 sm:space-y-8">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="font-mono text-xs sm:text-sm uppercase tracking-widest bg-dark text-light px-2 py-1 inline-block"
              >
                18 • // Student
              </motion.span>
              <h1 className="text-[18vw] sm:text-[15vw] lg:text-[8vw] leading-[0.85] text-dark flex overflow-hidden">
                {"ELLEN".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.8 + (i * 0.1),
                      ease: [0.33, 1, 0.68, 1]
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-2xl sm:text-4xl lg:text-5xl text-dark/80"
              >
                FULL-STACK <span className="text-accent bg-dark px-2">ENGINEER</span>
              </motion.h2>
            </div>
            <div className="mt-12 sm:mt-20 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="max-w-md font-sans text-lg sm:text-xl font-medium leading-tight"
              >
                Building high-performance digital systems with brutalist precision and modern aesthetics.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <a href="#contact-section" className="brutalist-button w-fit sm:w-auto text-lg sm:text-2xl text-center whitespace-nowrap">Start Project</a>
              </motion.div>
            </div>
          </div>
          
          {/* Interactive Animation Area - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-4 bg-dark lg:min-h-full">
            <InteractiveDataFlow />
          </div>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 1.8 }}
    className="marquee-container"
  >
    <div className="marquee-content">
      {[...Array(10)].map((_, i) => (
        <span key={i} className="mx-8">
          Code Architect • CS Student • Full-Stack Engineer • Problem Solver • Open Source Contributor • 
        </span>
      ))}
    </div>
  </motion.div>
);

const Work = () => {
  const projects = [
    { title: "PHOEQUILLS", slug: "phoequills", category: "System Design", year: "2024" },
    { title: "CIVI-CONNECT", slug: "civi-connect", category: "UI/UX Architecture", year: "2023" },
    { title: "UNI-VERSE", slug: "uni-verse", category: "Web3 Infrastructure", year: "2024" },
    { title: "CODE RONINS", slug: "code-ronins", category: "Software Engineering", year: "2024" },
    { title: "PROMPTBUD", slug: "promptbud", category: "AI Integration", year: "2024" },
    { title: "XAMPLORE", slug: "xamplore", category: "Data Visualization", year: "2023" },
  ];

  return (
    <section id="work-section" className="py-16 sm:py-24 px-4 sm:px-6 bg-light">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-end mb-12 sm:mb-16"
        >
          <h2 className="text-6xl sm:text-8xl lg:text-[10rem]">WORK</h2>
          <span className="font-mono text-base sm:text-xl">01 — 06</span>
        </motion.div>
        <div className="space-y-0 border-t-2 border-dark">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link 
                to={`/project/${project.slug}`}
                className="group border-b-2 border-dark py-8 sm:py-12 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-dark hover:text-light active:bg-dark active:text-light transition-colors px-2 sm:px-4 cursor-pointer block"
              >
                <div className="flex items-center gap-4 sm:gap-8">
                  <span className="font-mono text-lg sm:text-xl opacity-50">0{i + 1}</span>
                  <h3 className="text-3xl sm:text-5xl lg:text-7xl">{project.title}</h3>
                </div>
                <div className="flex items-center gap-6 sm:gap-12 mt-4 md:mt-0">
                  <span className="font-mono text-xs sm:text-sm uppercase tracking-widest">{project.category}</span>
                  <span className="font-mono text-sm sm:text-base">{project.year}</span>
                  <ArrowRight className="group-hover:translate-x-2 group-active:translate-x-2 transition-transform w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stack = () => {
  const items = [
    { name: "React", level: "95%" },
    { name: "TypeScript", level: "90%" },
    { name: "Node.js", level: "85%" },
    { name: "PostgreSQL", level: "80%" },
  ];

  return (
    <section id="stack-section" className="py-16 sm:py-24 px-4 sm:px-6 bg-dark text-light">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-6xl sm:text-8xl lg:text-[10rem] mb-12 sm:mb-20 text-accent"
        >
          STACK
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20">
          <div className="space-y-8 sm:space-y-12">
            {items.map((item, i) => (
              <div key={i} className="space-y-3 sm:space-y-4">
                <div className="flex justify-between font-display text-2xl sm:text-3xl">
                  <span>{item.name}</span>
                  <span>{item.level}</span>
                </div>
                <div className="h-3 sm:h-4 bg-light/10 brutalist-border">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: item.level }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-accent"
                  />
                </div>
              </div>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="brutalist-card bg-accent text-dark flex flex-col justify-between p-8 sm:p-12"
          >
            <h3 className="text-4xl sm:text-6xl leading-none">ALWAYS <br />LEARNING. <br />ALWAYS <br />BUILDING.</h3>
            <div className="mt-6 sm:mt-8">
              <p className="font-mono text-lg sm:text-xl mb-6">
                I specialize in building scalable architectures that don't just work, but excel under pressure.
              </p>
              <Link to="/about" className="brutalist-button !bg-dark !text-accent !text-lg !py-2 !px-6 inline-block">
                More About Me
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact-section" className="py-16 sm:py-24 px-4 sm:px-6 bg-light">
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto border-2 border-dark p-8 sm:p-12 flex flex-col lg:flex-row justify-between items-center gap-10 sm:gap-12"
    >
      <h2 className="text-6xl sm:text-7xl lg:text-9xl leading-none text-center lg:text-left">LET'S <br />CONNECT</h2>
      <div className="space-y-6 sm:space-y-8 w-full lg:w-auto text-center lg:text-left">
        <div className="flex flex-col gap-2">
          <span className="font-mono uppercase text-xs sm:text-sm opacity-50">Email</span>
          <a href="mailto:ellen@dev.com" className="text-3xl sm:text-4xl lg:text-6xl hover:text-accent active:text-accent transition-colors break-all">ELLEN@DEV.COM</a>
        </div>
        <div className="flex gap-4 sm:gap-8 justify-center lg:justify-start">
          {[Github, Twitter, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="p-3 sm:p-4 border-2 border-dark hover:bg-dark hover:text-accent active:bg-dark active:text-accent transition-all">
              <Icon size={24} className="sm:w-8 sm:h-8" />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

const Footer = () => (
  <motion.footer 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="py-12 px-6 bg-dark text-light border-t-2 border-dark"
  >
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 font-mono">
      <span>© {new Date().getFullYear()} ELLEN.DEV</span>
      <div className="flex gap-12">
        <a href="#" className="hover:text-accent active:text-accent">TWITTER</a>
        <a href="#" className="hover:text-accent active:text-accent">GITHUB</a>
        <a href="#" className="hover:text-accent active:text-accent">LINKEDIN</a>
      </div>
      <span className="text-accent">BUILT WITH PRECISION</span>
    </div>
  </motion.footer>
);

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <Work />
      <Stack />
      <Contact />
      <Footer />
    </>
  );
};

export default function App() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    console.log("Loading complete, transitioning to content...");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("App mounted, isLoading:", isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    // Force scroll to top on initial load
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });

    // Small delay to ensure it sticks
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }, 100);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    // Handle anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.origin === window.location.origin && anchor.pathname === window.location.pathname) {
        e.preventDefault();
        lenis.scrollTo(anchor.hash);
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    if (location.hash && lenisRef.current) {
      // Small delay to ensure the DOM is ready if navigating between pages
      setTimeout(() => {
        lenisRef.current?.scrollTo(location.hash, { immediate: true });
      }, 100);
    } else if (lenisRef.current) {
      setTimeout(() => {
        lenisRef.current?.scrollTo(0, { immediate: true });
      }, 50);
    }
  }, [location.pathname, location.hash, isLoading]);

  return (
    <div className="min-h-screen selection:bg-accent selection:text-dark">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/project/:slug" element={<ProjectPage />} />
            </Routes>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
