import { useEffect, useState } from 'react';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface BlogidInterface {
  blogid: string;
}

const LikeDislikeButton = ({ blogid }: BlogidInterface) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
 

  const handleLike = () => {
    setLiked(!liked);
    setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    setLiked(false);
  };

 

  useEffect(() => {
    if (liked) {
      axios.post(`${BACKEND_URL}/like`, { blogid }, {
        headers: { Authorization: localStorage.getItem('token') || "" }
      }).catch((error) => {
        console.error('Error liking the post:', error);
      });
    }
  }, [liked, blogid]);

  useEffect(() => {
    if (disliked) {
      axios.post(`${BACKEND_URL}/dislike`, { blogid }, {
        headers: { Authorization: localStorage.getItem('token') || "" }
      }).catch((error) => {
        console.error('Error disliking the post:', error);
      });
    }
  }, [disliked, blogid]);

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
