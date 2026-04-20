'use client';

import { motion } from 'motion/react';

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-stone-50">
      <div className="relative">
        {/* Animated Logo Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.1, 1],
            opacity: [0, 1, 1] 
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="relative flex items-center justify-center"
        >
          {/* Logo Background Pulse */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute h-24 w-24 rounded-2xl bg-amber-800/20"
          />
          
          {/* Main Logo Square */}
          <div className="z-10 flex h-16 w-16 items-center justify-center rounded-xl bg-amber-800 shadow-xl shadow-amber-900/20">
            <span className="text-2xl font-bold tracking-tighter text-white">LK</span>
          </div>
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <h2 className="text-sm font-semibold tracking-widest text-stone-400 uppercase">
          Ledger Knox
        </h2>
        <div className="mt-4 flex space-x-1 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="h-1.5 w-1.5 rounded-full bg-amber-800"
            />
          ))}
        </div>
      </motion.div>
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-stone-100/50 to-transparent pointer-events-none" />
    </div>
  );
}
