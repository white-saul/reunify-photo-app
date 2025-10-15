
import React from 'react';

const InfoSection: React.FC = () => {
  return (
    <section id="info_section" className="py-12 bg-gray-100 dark:bg-gray-800 rounded-2xl px-6 sm:px-10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          About Reunify Photo
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Reunify Photo is more than an editing tool — it’s a bridge between timelines. Using the Nano Banana AI model, it harmonizes lighting, poses, and facial emotions between your old and new photos. Perfect for nostalgic keepsakes, family albums, and creative projects.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="https://example.com/nano-banana"
            target="_blank"
            rel="noopener noreferrer dofollow"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            Learn about Nano Banana Model
          </a>
          <span className="text-gray-400 dark:text-gray-600">|</span>
          <a
            href="https://en.wikipedia.org/wiki/Artificial_intelligence"
            target="_blank"
            rel="noopener noreferrer dofollow"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            AI Technology (Wikipedia)
          </a>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
