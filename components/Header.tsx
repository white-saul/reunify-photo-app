import React, { useState } from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { TwitterIcon } from './icons/TwitterIcon';

const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);


interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800 dark:text-white">
              <LogoIcon />
              <span className="hidden sm:inline">Reunify Photo</span>
            </a>
          </div>

          {/* Desktop Nav & Search */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#main_tool" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">AI Photo</a>
            <a href="#main_tool" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Hugging Pose</a>
             <div className="relative">
                <input type="text" placeholder="Search tools..." className="w-48 pl-4 pr-10 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
             <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
              aria-label="Open menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
          <div className="absolute inset-0 bg-black/30" onClick={() => setIsMenuOpen(false)}></div>
          <div className="absolute top-0 right-0 h-full w-72 bg-gray-100 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                  <h2 className="font-bold text-xl">Menu</h2>
                  <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2" aria-label="Close menu"><CloseIcon className="w-6 h-6"/></button>
              </div>
              
              <div className="relative mb-6">
                <input type="text" placeholder="Search..." className="w-full pl-4 pr-10 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
              </div>

              <nav className="flex flex-col space-y-4 text-lg">
                  <a href="/" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600">Home</a>
                  <a href="#main_tool" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600">AI Photo</a>
                  <a href="#main_tool" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600">Hugging Pose</a>
                  <a href="mailto:contact@reunifyphoto.com" className="text-gray-700 dark:text-gray-200 hover:text-indigo-600">Contact</a>
              </nav>

              <div className="mt-auto">
                 <div className="flex justify-center space-x-6 my-6">
                    <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><FacebookIcon /></a>
                    <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><InstagramIcon /></a>
                    <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><TwitterIcon /></a>
                 </div>
              </div>
          </div>
      </div>
    </header>
  );
};

export default Header;