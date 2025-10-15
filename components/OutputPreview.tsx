import React, { useState } from 'react';
import StarRating from './StarRating';
import ShareModal from './ShareModal';
import { DownloadIcon } from './icons/DownloadIcon';
import { ShareIcon } from './icons/ShareIcon';
import { dataUrlToFile } from '../utils/fileUtils';

interface OutputPreviewProps {
  imageUrl: string;
  style: string;
}

const OutputPreview: React.FC<OutputPreviewProps> = ({ imageUrl, style }) => {
  const [rating, setRating] = useState(Number(localStorage.getItem('reunify-rating')) || 0);
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const handleRating = (newRating: number) => {
    setRating(newRating);
    localStorage.setItem('reunify-rating', String(newRating));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `reunify-photo-${style.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    const fileName = `reunify-photo-${style.toLowerCase().replace(/\s+/g, '-')}.png`;
    const shareText = `Just met my younger self in a "${style}" photo! ✨ Try your own AI-powered reunion at ReunifyPhoto.com! #ReunifyPhoto #AITimeTravel #Nostalgia`;
    
    try {
      const file = await dataUrlToFile(imageUrl, fileName);
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'My AI Reunion Photo!',
          text: shareText,
          files: [file],
        });
      } else {
        setShareModalOpen(true);
      }
    } catch (error) {
      console.error('Error sharing file, falling back to modal:', error);
      setShareModalOpen(true);
    }
  };

  return (
    <>
      <div id="output_preview" className="mt-10 max-w-xl mx-auto flex flex-col items-center space-y-6 animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Reunion Photo is Ready!</h2>
          <div className="w-full aspect-square rounded-2xl shadow-lg overflow-hidden">
              <img src={imageUrl} alt="Generated reunion" className="w-full h-full object-cover" />
          </div>
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={handleDownload} className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                  <DownloadIcon />
                  Download
              </button>
              <button onClick={handleShare} className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  <ShareIcon />
                  Share
              </button>
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 w-full flex flex-col items-center gap-2">
              <p className="text-gray-600 dark:text-gray-400 font-medium">Rate your result:</p>
              <StarRating count={5} rating={rating} onRating={handleRating} />
          </div>
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setShareModalOpen(false)}
        imageUrl={imageUrl}
        style={style}
      />
    </>
  );
};

export default OutputPreview;