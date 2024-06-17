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
  const [isAuthor, setIsAuthor] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    setLiked(false);
  };

  const decodeJWT = (token: string): any => {
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) throw new Error("Invalid token format");

      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Failed to decode JWT:", e);
      return null;
    }
  };

  const getAuthorOrNot = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJWT(token);
      if (!decoded || !decoded.email) {
        console.error("Failed to decode token or missing email");
        return;
      }
      const email = decoded.email;
      
      try {
        
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog/authorornot`, {
          email,
          blogid
        }, {
          headers: { Authorization: localStorage.getItem('token') || "" }
        });

        
        setIsAuthor(response.data.message);
      } catch (error) {
       
      }
    }
  };

  useEffect(() => {
    getAuthorOrNot();
  }, []);

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
      {isAuthor && (
        <button className="relative inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all bg-cyan-500 rounded-xl group">
          <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-cyan-700 rounded group-hover:-mr-4 group-hover:-mt-4">
            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
          </span>
          <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-cyan-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Edit Blog</span>
        </button>
      )}
    </div>
  );
};

export default LikeDislikeButton;
