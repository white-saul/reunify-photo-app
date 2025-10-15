import React from 'react';

export const ShareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 8.5L18 4m0 0v5.5m0-5.5H12.5M4 18h5.5m0 0V12.5m0 5.5L4 18m14.5-5.5H18m0 0V7m0 5.5L12.5 18"/>
    </svg>
);