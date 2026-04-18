'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Disable on mobile/touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted || ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return <></>;
  }

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300 pointer-events-none mix-blend-multiply opacity-50"
      style={{
        background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(146, 64, 14, 0.08), transparent 60%)`
      }}
    />
  );
}
