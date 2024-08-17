"use client"; // Menandai file ini sebagai Client Component

import { useState } from 'react';

import Homes from './home';
import LogoAnimation from './components/Logoanimation';
import TextAnimation from './components/Textanimation';


export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showTextAnimation, setShowTextAnimation] = useState(false);

  const handleLogoAnimationComplete = () => {
    setShowTextAnimation(true);
    console.log('Logo animation complete');
    setTimeout(() => {
      setShowSplash(false); // Sembunyikan splash screen setelah animasi selesai
      console.log('Splash screen hidden');
    }, 10000); // Match this duration with the text animation duration plus welcome display time
  };

  const handleTextAnimationComplete = () => {
    setShowSplash(false); // Ensure the splash screen is hidden
    console.log('Text animation complete');
  };

  return (
    <>
      {showSplash && !showTextAnimation && <LogoAnimation onComplete={handleLogoAnimationComplete} />}
      {showSplash && showTextAnimation && <TextAnimation onComplete={handleTextAnimationComplete} />}
      <main style={{ transition: 'opacity 0.5s ease-out', opacity: showSplash ? 0 : 1 }}>
        <Homes />
      </main>
    </>
  );
}
