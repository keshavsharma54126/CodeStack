import { useBlog } from '../hooks';
import {  useNavigate, useParams } from 'react-router-dom';
import AppBar from '../components/Appbar';
import FullBlogSkeleton from '../components/FullBlogSkeleton';
import LikeDislikeButton from '../components/LikeDislikeButton';
import FeedButtons from '../components/FeedButtons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import Modal from '../components/Modal';
import CommentSection from '../components/CommentSection';


const FullBlog = () => {
  const { id } = useParams<{ id: string }>();
  const [isAuthor, setIsAuthor] = useState(false);
  const { loading, blog } = useBlog({ id: id || "" });
  const [isModal, setIsModal] = useState(false)



  const getAuthorOrNot = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog/authorornot`, {
          id
        }, {
          headers: { Authorization: localStorage.getItem('token') || "" }
        });

        
        setIsAuthor(response.data.message);
      } catch (error) {
        console.error("Error checking the author Status:",error)
      }
    }
  };

  useEffect(() => {
    setIsAuthor(false)
    getAuthorOrNot();
  }, [id]);
  
  const navigate = useNavigate()

  const handleOnclick = ()=>{
      navigate(`/editblog/${id}`);

  }

  const handleDeleteClick=()=>{
    setIsModal(true)
  }
  const handleCloseModal=()=>{
    setIsModal(false)
  }

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${id}`, {
        headers: { Authorization: localStorage.getItem('token') || '' }
      });
      setIsModal(false);
      
      navigate('/myblogs'); 
    } catch (error) {
      console.error("Error deleting the blog:", error);
      setIsModal(false);
    }
  };
  const handleSubscribe = async()=>{
    try{
      
    }catch(e){
      console.error("error while subscribing:",e)
    }
  }

  if (loading) {
    return (
      <div className="pt-16">
        <AppBar />
        <div className="mt-32 md:mt-1 flex items-center justify-center min-h-screen">
          <FullBlogSkeleton />
        </div>
      </div>
    );
  }
  
  if (!blog) {
    return (
      <div className="pt-16">
        <AppBar />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg text-gray-600">No blog found</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-16 bg-gray-100 min-h-screen mt-40">
      <AppBar />
      <div className="relative">
        <div className="fixed top-16 left-0 right-0 bg-white shadow-md z-10 pt-2 pb-8">
          <FeedButtons />
        </div>
        <div className="md:-mt-28 container mx-auto px-2 py-6 pt-20 ">
          <div className="max-w-6xl mx-auto bg-white p-8 shadow-md rounded-md flex flex-col lg:flex-row">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4 text-center lg:text-left" dangerouslySetInnerHTML={{ __html: blog.title }}></h1>
              <div className="text-sm text-gray-600 mb-6 text-center lg:text-left">{blog.publishedDate}</div>
              <div className="flex flex-row mt-2 mb-4 gap-8">
                <LikeDislikeButton blogid={blog.id} likedd={blog.postLikes[0]?.liked ?? false} dislikedd={blog.postLikes[0]?.disliked?? false} like={blog.like} dislike={blog.dislike}/>
                {isAuthor && (
                  <div className="flex flex-row gap-3">
                    <button className="relative inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all bg-cyan-500 rounded-xl group" onClick={handleOnclick}>
                      <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-cyan-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-cyan-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                      <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Edit Blog</span>
                  </button>

                  <button className="relative inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group" onClick={handleDeleteClick}>
                      <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                      <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                      <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Delete Blog</span>
                  </button>
                  </div>
                  
                )}
              </div>
              <div className="text-lg text-gray-800 mb-6" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            </div>
            <div className="lg:w-1/3 lg:pl-8 flex flex-col items-center lg:items-start">
              <div className="text-xl font-bold mb-4">Author</div>
              <div className="flex items-center mb-4 w-full">
                <div className="w-16 h-16 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center text-2xl font-semibold">
                  {blog.author.name[0]}
                </div>
                <div className="ml-4 flex-1">
                  <div>
                    <div className="font-bold text-xl text-gray-900">{blog.author.name}</div>
                 
                  </div>
                  <div className="text-sm text-gray-600">Master of mirth, purveyor of puns, and the funniest person in the kingdom.</div>
                  
                </div>
                
              </div>
             
              <div className="flex justify-center w-full mt-4">
              <div className="flex flex-col gap-10">
                  <button 
                  onClick={handleSubscribe}
                  type="button" 
                  className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition transform hover:scale-105 ml-4"
                  >
                    Subscribe
                  </button>
        
                    <div className="">
                      <CommentSection blogId={blog.id}/>
                    </div>
              
               </div>
               
               
              </div>

             
              <div>
                
              </div>
            </div>
            
          </div>
          
          
        </div>
       

      </div>
              <Modal
                isOpen={isModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this blog?"
              />
              
              
     
    </div>
  );
}

export default FullBlog;
