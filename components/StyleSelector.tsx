
import React from 'react';

interface StyleSelectorProps {
  styles: string[];
  selectedStyle: string;
  onSelectStyle: (style: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onSelectStyle }) => {
  return (
    <div className="flex flex-col space-y-3">
        <label className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-left">Choose a Style</label>
        <div className="relative">
            <div className="flex space-x-3 overflow-x-auto pb-4 -mb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {styles.map((style) => (
                <button
                    key={style}
                    onClick={() => onSelectStyle(style)}
                    className={`px-4 py-2 text-sm font-medium rounded-full shrink-0 transition-all duration-200 border
                    ${
                    selectedStyle === style
                        ? 'bg-indigo-600 text-white border-transparent shadow'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }
                    `}
                >
                    {style}
                </button>
                ))}
            </div>
        </div>
    </div>
  );
};

export default StyleSelector;
