import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MainTool from './components/MainTool';
import SubTools from './components/SubTools';
import InfoSection from './components/InfoSection';
import FaqSection from './components/FaqSection';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme = localStorage.getItem('theme');
    if (initialTheme === 'dark' || (!initialTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
      setIsDarkMode(true);
    } else {
      root.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      localStorage.setItem('theme', 'light');
      root.classList.remove('dark');
    } else {
      localStorage.setItem('theme', 'dark');
      root.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MainTool />
        <div className="my-8 border-t border-gray-200 dark:border-gray-700"></div>
        <div 
            className="my-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center text-gray-500 dark:text-gray-400"
            aria-label="Advertisement"
        >
            Ad Placeholder - Between Output &amp; Sub-Tools
        </div>
        <SubTools />
        <div className="my-8 border-t border-gray-200 dark:border-gray-700"></div>
        <InfoSection />
        <div className="my-8 border-t border-gray-200 dark:border-gray-700"></div>
        <FaqSection />
        <div 
            className="my-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center text-gray-500 dark:text-gray-400"
            aria-label="Advertisement"
        >
            Ad Placeholder - Multiplex (Above Footer)
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;