import React, { useState, useEffect } from 'react';

const loadingTexts = [
    "Your reunion image is being created…",
    "Blending timelines… hold tight 💫",
    "Harmonizing expressions and lighting…",
    "AI is adding the final touches…",
];

const GeneratingFrame: React.FC = () => {
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mt-10 max-w-xl mx-auto animate-fadeIn">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden p-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 shadow-2xl shadow-indigo-500/20">
                <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-[#AAB4FF]/80 to-[#6B73FF]/80 flex flex-col items-center justify-center text-center p-4">
                     <div 
                        className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:30px_30px] opacity-30 animate-pulse">
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%] animate-shimmer"></div>
                    
                    <div className="relative z-10">
                        <div key={textIndex} className="text-white font-semibold text-lg animate-fadeIn">
                           {loadingTexts[textIndex]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneratingFrame;