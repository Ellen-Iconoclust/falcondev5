import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-dark flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-md">
        <div className="flex justify-between items-end mb-4">
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-light font-display text-4xl sm:text-6xl uppercase tracking-tighter"
          >
            Ellen.Dev
          </motion.h1>
          <span className="text-accent font-mono text-2xl sm:text-4xl font-bold">
            {Math.floor(progress)}%
          </span>
        </div>
        
        <div className="h-12 sm:h-16 w-full border-4 border-light p-1 bg-dark">
          <motion.div 
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        
        <div className="mt-6 flex justify-between font-mono text-xs sm:text-sm text-light/50 uppercase tracking-widest">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Initializing System...
          </motion.span>
          <span>v2.0.26</span>
        </div>
      </div>

      {/* Brutalist decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-accent/20 hidden sm:block" />
      <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-accent/20 hidden sm:block" />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-1/4 w-4 h-4 bg-accent hidden sm:block"
      />
    </motion.div>
  );
};

export default Loader;
