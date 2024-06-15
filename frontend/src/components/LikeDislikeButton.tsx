import { useState } from 'react';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/solid';

const LikeDislikeButton: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      setDisliked(false);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      setLiked(false);
    }
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={handleLike}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium focus:outline-none ${
          liked ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
      >
        <HandThumbUpIcon className={`h-5 w-5 ${liked ? 'text-white' : 'text-gray-600'}`} />
        <span>223</span>
      </button>

      <button
        onClick={handleDislike}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium focus:outline-none ${
          disliked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
      >
        <HandThumbDownIcon className={`h-5 w-5 ${disliked ? 'text-white' : 'text-gray-600'}`} />
        <span>2</span>
      </button>
    </div>
  );
};

export default LikeDislikeButton;