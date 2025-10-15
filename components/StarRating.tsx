
import React, { useState } from 'react';

interface StarRatingProps {
  count?: number;
  rating: number;
  onRating: (rate: number) => void;
  color?: {
    filled: string;
    unfilled: string;
  };
}

const Star: React.FC<{ filled: boolean; onClick: () => void }> = ({ filled, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={`w-8 h-8 cursor-pointer transition-transform transform hover:scale-110 ${filled ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.539 1.118l-3.368-2.446a1 1 0 00-1.175 0l-3.368 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.24 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
    </svg>
  );
};

const StarRating: React.FC<StarRatingProps> = ({ count = 5, rating = 0, onRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} onMouseEnter={() => setHoverRating(i + 1)}>
          <Star filled={(hoverRating || rating) > i} onClick={() => onRating(i + 1)} />
        </div>
      ))}
    </div>
  );
};

export default StarRating;
