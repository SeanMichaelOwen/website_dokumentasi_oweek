"use client"; // Menandai file ini sebagai Client Component

import { useState } from 'react';

import Homes from './home';
import SplashScreen from './components/splashscreen';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashAnimationComplete = () => {
    setShowSplash(false); // Sembunyikan splash screen setelah animasi selesai
  };

  return (
    <>
      {showSplash && <SplashScreen onAnimationComplete={handleSplashAnimationComplete} />}
      <main style={{ transition: 'opacity 0.5s ease-out', opacity: showSplash ? 0 : 1 }}>
        <Homes />
      </main>
    </>
  );
}
