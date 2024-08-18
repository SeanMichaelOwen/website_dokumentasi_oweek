"use client"

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Jumbotron() {
  const [isVisible, setIsVisible] = useState(false);
  const jumbotronRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after the element becomes visible
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (jumbotronRef.current) {
      observer.observe(jumbotronRef.current);
    }

    return () => {
      if (jumbotronRef.current) {
        observer.unobserve(jumbotronRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={jumbotronRef}
      className="w-screen h-screen relative bg-cover bg-center bg-no-repeat text-white px-8"
      style={{ backgroundImage: "url('/banner.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 flex flex-col items-start justify-center h-full px-4 md:px-8">
        <div className="max-w-3xl">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            FRIDTJOF 27
          </motion.h1>
          <motion.p
            className="text-base md:text-lg lg:text-xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          >
            The esgata gate is watered by a freestyle smile. But the latest but most interesting thing is my lack of interest in the valley and the timing of the shooting.
          </motion.p>
          <a href="#MemberPhoto">
          <motion.button
            className="px-6 py-3 bg-[#EF4413] hover:bg-orange-700 rounded text-base md:text-lg font-semibold transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
          >
            More
          </motion.button>
          </a>
        </div>
      </div>
    </div>
  );
}
