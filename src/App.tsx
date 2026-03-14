/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
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
import AboutPage from './pages/AboutPage';
import ProjectPage from './pages/ProjectPage';

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
          animate={{
            width: isExpanded ? 'min(600px, 90vw)' : '100px',
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
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
        <div className="sm:hidden w-64 flex items-center justify-between bg-light text-dark border-2 border-dark px-4 h-14 pointer-events-auto">
          <span className="font-display text-xl tracking-tighter">ELLEN</span>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 hover:text-accent transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
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

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section id="hero" ref={heroRef} className="min-h-screen flex flex-col items-center justify-center pt-24 sm:pt-32 pb-12 sm:pb-24 px-4 sm:px-6 bg-light">
      <div className="max-w-7xl w-full -translate-y-2 sm:-translate-y-3 lg:-translate-y-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-2 border-dark">
          <div className="lg:col-span-12 p-6 sm:p-10 lg:py-12 flex flex-col justify-between">
            <div className="space-y-6 sm:space-y-8">
              <span className="font-mono text-xs sm:text-sm uppercase tracking-widest bg-dark text-light px-2 py-1">18 • // Student</span>
              <h1 className="text-[18vw] sm:text-[15vw] lg:text-[12vw] leading-[0.85] text-dark flex overflow-hidden">
                {"ELLEN".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: [0.33, 1, 0.68, 1]
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
              <h2 className="text-2xl sm:text-4xl lg:text-6xl text-dark/80">
                FULL-STACK <span className="text-accent bg-dark px-2">ENGINEER</span>
              </h2>
            </div>
            <div className="mt-12 sm:mt-20 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center">
              <p className="max-w-md font-sans text-lg sm:text-xl font-medium leading-tight">
                Building high-performance digital systems with brutalist precision and modern aesthetics.
              </p>
              <a href="#contact-section" className="brutalist-button w-fit sm:w-auto text-lg sm:text-2xl text-center whitespace-nowrap">Start Project</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => (
  <div className="marquee-container">
    <div className="marquee-content">
      {[...Array(10)].map((_, i) => (
        <span key={i} className="mx-8">
          Code Architect • CS Student • Full-Stack Engineer • Problem Solver • Open Source Contributor • 
        </span>
      ))}
    </div>
  </div>
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
        <div className="flex justify-between items-end mb-12 sm:mb-16">
          <h2 className="text-6xl sm:text-8xl lg:text-[10rem]">WORK</h2>
          <span className="font-mono text-base sm:text-xl">01 — 06</span>
        </div>
        <div className="space-y-0 border-t-2 border-dark">
          {projects.map((project, i) => (
            <Link 
              key={i} 
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
        <h2 className="text-6xl sm:text-8xl lg:text-[10rem] mb-12 sm:mb-20 text-accent">STACK</h2>
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
          <div className="brutalist-card bg-accent text-dark flex flex-col justify-between p-8 sm:p-12">
            <h3 className="text-4xl sm:text-6xl leading-none">ALWAYS <br />LEARNING. <br />ALWAYS <br />BUILDING.</h3>
            <div className="mt-6 sm:mt-8">
              <p className="font-mono text-lg sm:text-xl mb-6">
                I specialize in building scalable architectures that don't just work, but excel under pressure.
              </p>
              <Link to="/about" className="brutalist-button !bg-dark !text-accent !text-lg !py-2 !px-6 inline-block">
                More About Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact-section" className="py-16 sm:py-24 px-4 sm:px-6 bg-light">
    <div className="max-w-7xl mx-auto border-2 border-dark p-8 sm:p-12 flex flex-col lg:flex-row justify-between items-center gap-10 sm:gap-12">
      <h2 className="text-6xl sm:text-7xl lg:text-9xl leading-none text-center lg:text-left">LET'S <br />CONNECT</h2>
      <div className="space-y-6 sm:space-y-8 w-full lg:w-auto text-center lg:text-left">
        <div className="flex flex-col gap-2">
          <span className="font-mono uppercase text-xs sm:text-sm opacity-50">Email</span>
          <a href="mailto:ellen@dev.com" className="text-3xl sm:text-4xl lg:text-6xl hover:text-accent active:text-accent transition-colors break-all">elisapravin@gmail.com</a>
        </div>
        <div className="flex gap-4 sm:gap-8 justify-center lg:justify-start">
          {[Github, Twitter, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="p-3 sm:p-4 border-2 border-dark hover:bg-dark hover:text-accent active:bg-dark active:text-accent transition-all">
              <Icon size={24} className="sm:w-8 sm:h-8" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-6 bg-dark text-light border-t-2 border-dark">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 font-mono">
      <span>© {new Date().getFullYear()} ELLEN.DEV</span>
      <div className="flex gap-12">
        <a href="#" className="hover:text-accent active:text-accent">TWITTER</a>
        <a href="#" className="hover:text-accent active:text-accent">GITHUB</a>
        <a href="#" className="hover:text-accent active:text-accent">LINKEDIN</a>
      </div>
      <span className="text-accent">BUILT WITH PRECISION</span>
    </div>
  </footer>
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

  useEffect(() => {
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
  }, []);

  useEffect(() => {
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
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen selection:bg-accent selection:text-dark">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
      </Routes>
    </div>
  );
}
