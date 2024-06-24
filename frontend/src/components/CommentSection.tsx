import axios from 'axios';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

interface Comment{
  id:string;
  content:string;
  createdAt:string;
  author:{
    name:string;
  }
}


const CommentSection = ({ blogId }:{blogId:string}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  const[isOpen,setIsopen]=useState(false);

  const openModal=()=>{
    setIsopen(true);
  }
  const closedModal = ()=>{
    setIsopen(false)
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/comment/${blogId}`, {
          headers: { Authorization: localStorage.getItem('token') || "" }
        });
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [blogId]);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/api/v1/blog/newcomment`, {
        content: newComment,
        blogid: blogId
      }, {
        headers: { Authorization: localStorage.getItem('token') || "" }
      });
      setNewComment('');
      
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/comment/${blogId}`, {
        headers: { Authorization: localStorage.getItem('token') || "" }
      });
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="">
    <button className="relative inline-block text-lg group" onClick={openModal}>
      <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
        <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
        <span className="relative">Comments ({comments.length})</span>
      </span>
      <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
    </button>

    {isOpen && (
      <div className="mt-52 md:mt-24 fixed  h-full z-10 overflow-y-auto inset-0 infinite-scroll">
        <div className="flex items-center justify-end min-h-screen px-4 text-center">
          <div className="fixed inset-0 bg-black opacity-30"></div>
          <div className="w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg z-20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({comments.length})</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closedModal}
              >
                Close
              </button>
            </div>
            <form className="mb-6" onSubmit={handleCommentSubmit}>
              <div className="py-2 px-4 mb-4 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea
                  id="comment"
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..."
                  required
                  onChange={handleCommentChange}
                  value={newComment}
                ></textarea>
              </div>
              <button
                type="submit"
               
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                Post comment
              </button>
            </form>
           
              {comments.map((comment, index) => (
                <article key={index} className="p-6 mb-3 bg-white rounded-lg dark:bg-gray-900">
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <AvatarComponent name={comment.author.name}/>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time dateTime={comment.createdAt}>
                          {(comment.createdAt)}
                        </time>
                      </p>
                    </div>
                    <button
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      type="button"
                    >
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                      </svg>
                      <span className="sr-only">Comment settings</span>
                    </button>
                  </footer>
                  <p className="text-gray-500 dark:text-gray-400">{comment.content}</p>
                  <div className="flex items-center mt-4 space-x-4">
                    <button
                      type="button"
                      className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                    >
                      <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                      </svg>
                      Reply
                    </button>
                  </div>
                </article>
              ))
              }
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

function AvatarComponent({ name }:{name:string}) {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>
  );
}

export default CommentSection;
