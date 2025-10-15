import React, { useState, useCallback } from 'react';

// In-component icon definitions to reduce file count
const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
);
const CopyLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
);
// Simplified social icons for brevity
const SocialIcon = ({ path, ...props }: { path: string } & React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d={path} /></svg>
);

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  style: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, imageUrl, style }) => {
  const [copied, setCopied] = useState(false);
  const pageUrl = "https://reunifyphoto.com";
  const caption = `Just met my younger self in a "${style}" photo! ✨ Try your own AI-powered reunion at ReunifyPhoto.com! #ReunifyPhoto #AITimeTravel #Nostalgia`;

  const socialPlatforms = [
    { name: 'Facebook', iconPath: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(caption)}` },
    { name: 'Twitter', iconPath: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(caption)}` },
    { name: 'WhatsApp', iconPath: 'M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.52-6.13c-.25-.12-1.47-.72-1.7-.8s-.39-.12-.56.12c-.17.25-.64.8-.79.96s-.3.19-.56.06c-.25-.12-1.07-.39-2.04-1.26s-1.47-1.9-1.64-2.22c-.17-.31-.02-.48.11-.61s.25-.3.37-.44.17-.25.25-.41.13-.31.06-.56c-.06-.25-.56-1.34-.76-1.84s-.4-.42-.56-.42h-.5c-.17 0-.44.06-.68.31s-.92.9-.92 2.2c0 1.3.95 2.55 1.07 2.74s1.85 2.81 4.48 3.92c.62.26 1.1.42 1.48.53.59.19 1.13.16 1.56.1.48-.06 1.47-.6 1.68-1.18s.21-.01.15-1.3z', href: `https://api.whatsapp.com/send?text=${encodeURIComponent(caption + ' ' + pageUrl)}` },
    { name: 'Telegram', iconPath: 'M21.95 2.27c.43-.19.9-.03 1.12.39.22.42.1.92-.23 1.22l-4.14 3.69-5.1 1.7-4.4-1.46c-.52-.17-.89-.66-.89-1.22 0-.41.22-.79.57-1L20.82 2.4c.04-.01.07-.02.11-.03.35-.1.71-.05 1.02-.1zM4.1 10.15l-1.3 4.38c-.24.8.52 1.56 1.32 1.32l4.38-1.3-4.4-4.4zm9.32 1.95c-.32.32-.84.32-1.17 0l-3-3c-.32-.32-.32-.84 0-1.17l7-7c.32-.32.84-.32 1.17 0l3 3c.32.32.32.84 0 1.17l-7 7z', href: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(caption)}` },
    { name: 'Reddit', iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v2h-2zm0 4h2v6h-2zm-4-4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm8-8h2v2h-2zm0 4h2v2h-2z', href: `https://www.reddit.com/submit?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent('My AI Reunion Photo!')}` },
    { name: 'Pinterest', iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.48 11.23c-.15.45-.52.77-1 .77h-3.96c-.48 0-.85-.32-1-.77l-1.48-4.45c-.15-.45.17-.93.65-.93h7.64c.48 0 .8.48.65.93l-1.48 4.45z', href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(caption)}` },
  ];

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [pageUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md m-4 p-6 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Share your creation!</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><CloseIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" /></button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 text-center">
            {socialPlatforms.map(p => (
                <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 space-y-2">
                    <SocialIcon path={p.iconPath} className="w-10 h-10 text-gray-700 dark:text-gray-300"/>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{p.name}</span>
                </a>
            ))}
        </div>
        
        <div className="mt-6">
            <div className="relative">
                <input type="text" readOnly value={pageUrl} className="w-full bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-lg p-3 pr-24 text-sm" />
                <button onClick={handleCopy} className="absolute right-1 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-indigo-700">
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
        </div>

        <p className="mt-4 text-xs text-center text-gray-400 dark:text-gray-500">Created using ReunifyPhoto.com 💜</p>
      </div>
    </div>
  );
};

export default ShareModal;
