import React, { useState } from 'react';
import { SUB_TOOL_LINKS } from '../constants';

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

const SubTools: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTools = SUB_TOOL_LINKS.filter(tool =>
        tool.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <section id="sub_tools" className="py-12">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Explore More AI Reunion Tools
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
          Discover more AI-powered reunion styles below, all built under Reunify Photo’s creative ecosystem.
        </p>
      </div>

      <div className="mt-8 max-w-md mx-auto relative">
          <input
              type="text"
              placeholder="Search Reunify tools, poses, or guides…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"/>
      </div>

      <div className="mt-10 grid gap-6 max-w-lg mx-auto md:grid-cols-2 md:max-w-4xl">
        {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
            <a
                key={tool.label}
                href="#main_tool"
                className="group relative flex flex-col rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 flex-1 flex flex-col justify-between bg-white dark:bg-gray-800 m-0.5 rounded-lg">
                    <div>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {tool.label}
                        </p>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {tool.description}
                        </p>
                    </div>
                </div>
            </a>
            ))
        ) : (
            <div className="md:col-span-2 text-center py-10 text-gray-500 dark:text-gray-400">
                No matching tools found.
            </div>
        )}
      </div>
    </section>
  );
};

export default SubTools;