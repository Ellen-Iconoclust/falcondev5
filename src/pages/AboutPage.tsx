import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, Twitter, Linkedin, Mail, Code2, Cpu, Globe, Zap, Music } from 'lucide-react';

const BentoItem = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`brutalist-card ${className}`}
  >
    {children}
  </motion.div>
);

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-light p-4 sm:p-8 selection:bg-accent selection:text-dark">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <Link to="/" className="brutalist-button flex items-center gap-2 !py-2 !px-4 text-lg">
            <ArrowLeft size={20} /> Back
          </Link>
          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-tighter">About Me</h1>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Profile Photo & Intro */}
          <BentoItem className="md:col-span-2 md:row-span-2 flex flex-col items-center justify-center text-center p-12 bg-light text-dark">
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-accent overflow-hidden mb-8">
              <img 
                src="https://picsum.photos/seed/ellen-profile/500/500" 
                alt="Ellen" 
                className="w-full h-full object-cover grayscale contrast-125"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-4xl sm:text-5xl font-display mb-4 text-dark">ELLEN</h2>
            <p className="font-mono text-lg sm:text-xl text-dark">
              Full-Stack Engineer & Digital Architect based in the digital void.
            </p>
          </BentoItem>

          {/* Bio */}
          <BentoItem className="md:col-span-2 bg-accent text-dark p-8 sm:p-12" delay={0.1}>
            <h3 className="text-3xl font-display mb-6 uppercase">The Story</h3>
            <p className="font-sans text-xl leading-tight font-medium">
              I've spent the last decade navigating the complexities of the web. From crafting pixel-perfect interfaces to architecting robust backends, my mission is to build digital products that are as resilient as they are beautiful. While I'm not coding, I might be planning my next trip, sipping some coffee, or maybe listening to some Pop songs that makes my day great.
            </p>
          </BentoItem>

          {/* Stats/Quick Info */}
          <BentoItem className="bg-light border-2 border-dark p-8" delay={0.2}>
            <div className="flex flex-col h-full justify-between">
              <Zap className="text-accent mb-4" size={32} />
              <div>
                <span className="block text-4xl font-display">50+</span>
                <span className="font-mono uppercase text-sm opacity-60">Projects Delivered</span>
              </div>
            </div>
          </BentoItem>

          <BentoItem className="bg-light border-2 border-dark p-8" delay={0.3}>
            <div className="flex flex-col h-full justify-between">
              <Code2 className="text-accent mb-4" size={32} />
              <div>
                <span className="block text-4xl font-display">1M+</span>
                <span className="font-mono uppercase text-sm opacity-60">Lines of Code</span>
              </div>
            </div>
          </BentoItem>

          {/* Skills/Tools Bento */}
          <BentoItem className="md:col-span-2 bg-accent text-dark p-8" delay={0.4}>
            <h3 className="text-2xl font-display mb-6 text-dark uppercase">Core Philosophy</h3>
            <ul className="space-y-4 font-mono text-lg">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-dark" /> Performance is a Feature
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-dark" /> Accessibility is Mandatory
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-dark" /> Code is for Humans
              </li>
            </ul>
          </BentoItem>

          {/* Socials */}
          <BentoItem className="md:col-span-2 bg-light border-2 border-dark p-8 flex items-center justify-around" delay={0.5}>
            {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
              <a key={i} href="#" className="p-4 border-2 border-dark hover:bg-dark hover:text-accent active:bg-dark active:text-accent transition-all">
                <Icon size={32} />
              </a>
            ))}
          </BentoItem>

          {/* Tech Stack */}
          <BentoItem className="md:col-span-4 bg-accent text-dark p-8" delay={0.6}>
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl font-display uppercase text-dark">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {['HTML', 'CSS', 'JS', 'TS', 'React Native', 'Flask', 'AWS', 'Framer', 'GSAP', 'PostgreSQL'].map((tech) => (
                  <span key={tech} className="bg-dark text-light px-4 py-2 font-mono uppercase text-sm border-2 border-dark hover:bg-light hover:text-dark active:bg-light active:text-dark transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </BentoItem>

          {/* My Vibe */}
          <BentoItem className="md:col-span-4 bg-light border-2 border-dark p-8" delay={0.7}>
            <a 
              href="https://open.spotify.com/track/5YfS98fI68H9L6v9676676" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row items-center justify-between gap-6 group"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-dark flex items-center justify-center group-hover:bg-accent group-active:bg-accent transition-colors">
                  <Music className="text-light group-hover:text-dark group-active:text-dark" size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-display uppercase text-dark">My Vibe</h3>
                  <p className="font-mono text-xl uppercase">Night Changes — One Direction</p>
                </div>
              </div>
              <div className="brutalist-button !text-lg !py-2 !px-6 group-hover:bg-dark group-hover:text-accent group-active:bg-dark group-active:text-accent">
                Listen on Spotify
              </div>
            </a>
          </BentoItem>

          {/* Interests */}
          <BentoItem className="md:col-span-4 bg-accent text-dark p-8" delay={0.8}>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
              <h3 className="text-3xl font-display uppercase">Beyond the Screen</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {['Generative Art', 'Mechanical Keyboards', 'Cybersecurity', 'Minimalism', 'Coffee'].map((tag) => (
                  <span key={tag} className="bg-dark text-light px-4 py-2 font-mono uppercase text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </BentoItem>

        </div>

        {/* Footer */}
        <div className="mt-12 text-center font-mono opacity-50">
          <p>© 2026 ELLEN.DEV — BUILT WITH BRUTALIST PRECISION</p>
        </div>
      </div>
    </div>
  );
}
