import { useEffect, useState } from 'react';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface BlogidInterface {
  blogid: string;
  like: number;
  likedd:boolean,
  dislikedd:boolean
  dislike: number;
}

const LikeDislikeButton = ({ blogid, likedd,dislikedd, like, dislike }: BlogidInterface) => {
  const [liked, setLiked] = useState(likedd);
  const [disliked, setDisliked] = useState(dislikedd);
  const [likeno, setLikeno] = useState(like);
  const [dislikeno, setDislikeno] = useState(dislike);

  useEffect(() => {
    setLiked(likedd);
    setDisliked(dislikedd);
    setLikeno(like);
    setDislikeno(dislike);
  }, [likedd, dislikedd, like, dislike]);



  const updateLikesDislikes = async (newLiked: boolean, newDisliked: boolean, newLikeno: number, newDislikeno: number) => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/blog/likedislike`,
        {
          blogid,
          liked: newLiked,
          disliked: newDisliked,
          likeno: newLikeno,
          dislikeno: newDislikeno,
        },
        {
          headers: { Authorization: localStorage.getItem('token') || '' },
        }
      );
    } catch (error) {
      console.error('Error updating like/dislike:', error);
    }
  };

  const handleLike = () => {
    const newLiked = !liked;
    const newLikeno = likeno + (newLiked ? 1 : -1);
    const newDisliked = false;
    const newDislikeno = disliked ? dislikeno - 1 : dislikeno;

    setLiked(newLiked);
    setLikeno(newLikeno);
    setDisliked(newDisliked);
    setDislikeno(newDislikeno);

    updateLikesDislikes(newLiked, newDisliked, newLikeno, newDislikeno);
  };

  const handleDislike = () => {
    const newDisliked = !disliked;
    const newDislikeno = dislikeno + (newDisliked ? 1 : -1);
    const newLiked = false;
    const newLikeno = liked ? likeno - 1 : likeno;

    setDisliked(newDisliked);
    setDislikeno(newDislikeno);
    setLiked(newLiked);
    setLikeno(newLikeno);

    updateLikesDislikes(newLiked, newDisliked, newLikeno, newDislikeno);
  };
  
  return (
    <div className="flex space-x-2 md:space-x-4">
      <button
        onClick={handleLike}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium focus:outline-none ${
          liked ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
      >
        <HandThumbUpIcon className={`h-5 w-5 ${liked ? 'text-white' : 'text-gray-600'}`} />
        <span>{likeno}</span>
      </button>

      <button
        onClick={handleDislike}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium focus:outline-none ${
          disliked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
      >
        <HandThumbDownIcon className={`h-5 w-5 ${disliked ? 'text-white' : 'text-gray-600'}`} />
        <span>{dislikeno}</span>
      </button>
    </div>
  );
};

export default LikeDislikeButton;
