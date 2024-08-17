import { useState, useEffect } from 'react';

const languages = [
  "Hallo", "Hello", "Hola", "Bonjour", "Ciao", "こんにちは", "안녕하세요", "Привет", "Merhaba", "Olá", "שלום", "नमस्ते", "Sawubona", "สวัสดี", "Selam", "γειά σου", "Kamusta", "Xin chào", "Salut"
];

export default function TextAnimation({ onLoadingComplete }) {
  const [currentLang, setCurrentLang] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLang((prev) => (prev + 1) % languages.length);
    }, 2000); // Change language every 2 seconds

    const timer = setTimeout(() => {
      clearInterval(interval);
      if (typeof onLoadingComplete === 'function') {
        onLoadingComplete(); // Notify when loading is complete
      }
    }, 10000); // Duration of loading

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-animate"></div>
      <div className="relative text-center">
        <div
          className="text-4xl font-semibold text-gray-800"
          style={{
            animation: 'fadeScale 2s ease-in-out infinite',
            opacity: 0,
            transition: 'opacity 1s ease-in-out',
          }}
        >
          {languages[currentLang]}
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.9);
          }
        }

        @keyframes gradientAnimate {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }

        .bg-gradient-animate {
          background: linear-gradient(45deg, #ffffff, #f0f0f0);
          background-size: 400% 400%;
          animation: gradientAnimate 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
