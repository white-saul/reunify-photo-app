
import React, { useState, useCallback, useRef } from 'react';
import FileUpload from './FileUpload';
import StyleSelector from './StyleSelector';
import OutputPreview from './OutputPreview';
import GeneratingFrame from './GeneratingFrame';
import { REUNION_STYLES } from '../constants';
import { generateReunionPhoto } from '../services/geminiService';

const MainTool: React.FC = () => {
  const [oldPhoto, setOldPhoto] = useState<File | null>(null);
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>(REUNION_STYLES[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);

  const outputRef = useRef<HTMLDivElement>(null);

  const handleGenerate = useCallback(async () => {
    if (!oldPhoto || !newPhoto) {
      setError("Please upload both an old and a recent photo.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setOutputImage(null);
    
    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    try {
      const generatedImage = await generateReunionPhoto({
        oldPhoto,
        newPhoto,
        style: selectedStyle,
      });
      setOutputImage(generatedImage);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [oldPhoto, newPhoto, selectedStyle]);

  return (
    <section id="main_tool" className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        Reunify Photo
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
        Upload two photos and see your past and present self reunite through AI.
      </p>

      <div className="mt-10 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload label="Old Photo" onFileSelect={setOldPhoto} overlayEffect={selectedStyle === 'Mirror Reflection' ? 'mirror' : undefined} />
          <FileUpload label="Recent Photo" onFileSelect={setNewPhoto} overlayEffect={selectedStyle === 'Mirror Reflection' ? 'mirror' : undefined} />
        </div>
        
        {error && <div className="text-red-500 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-lg p-3 text-sm">{error}</div>}
        
        <StyleSelector
          styles={REUNION_STYLES}
          selectedStyle={selectedStyle}
          onSelectStyle={setSelectedStyle}
        />

        <button
          onClick={handleGenerate}
          disabled={!oldPhoto || !newPhoto || isLoading}
          className="w-full inline-flex justify-center items-center px-6 py-4 border border-transparent text-lg font-semibold rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800 transition-all duration-300"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Reunion Photo'
          )}
        </button>
        <div 
            className="mt-4 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg text-center text-xs text-gray-400 dark:text-gray-500"
            aria-label="Advertisement"
        >
            Ad Placeholder - In-Content
        </div>
      </div>
      
      <div ref={outputRef} className="scroll-mt-24">
        {isLoading && <GeneratingFrame />}
        {outputImage && !isLoading && <OutputPreview imageUrl={outputImage} style={selectedStyle} />}
      </div>
    </section>
  );
};

export default MainTool;
