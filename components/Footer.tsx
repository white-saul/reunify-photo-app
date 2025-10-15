
import React from 'react';
import { FacebookIcon } from './icons/FacebookIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { LogoIcon } from './icons/LogoIcon';

const Footer: React.FC = () => {
  const footerLinks = [
    { label: "About Us", url: "#info_section" },
    { label: "Contact", url: "mailto:contact@reunifyphoto.com" },
    { label: "Privacy Policy", url: "#" },
    { label: "Disclaimer", url: "#" },
    { label: "Terms", url: "#" },
    { label: "GDPR", url: "#" },
  ];

  return (
    <footer id="footer" className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
             <a href="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800 dark:text-white">
              <LogoIcon />
              <span>Reunify Photo</span>
            </a>
            <p className="text-gray-500 dark:text-gray-400 text-base">
              Bringing your past and present together with the magic of AI.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <FacebookIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <InstagramIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <TwitterIcon />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Quick Links</h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.slice(0, 3).map((link) => (
                    <li key={link.label}>
                      <a href={link.url} className="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.slice(3).map((link) => (
                    <li key={link.label}>
                      <a href={link.url} className="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} ReunifyPhoto.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;