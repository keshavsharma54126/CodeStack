import { useBlog } from '../hooks';
import { useParams } from 'react-router-dom';
import AppBar from '../components/Appbar';
import FullBlogSkeleton from '../components/FullBlogSkeleton';
import LikeDislikeButton from '../components/LikeDislikeButton';
import FeedButtons from '../components/FeedButtons';

const FullBlog = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, blog } = useBlog({ id: id || "" });
  
  if (loading) {
    return (
      <div className="pt-16">
        <AppBar />
        <div className="flex items-center justify-center min-h-screen">
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
    <div className="pt-16 bg-gray-100 min-h-screen mt-10">
      <AppBar />
      <div className="relative">
        <div className="fixed top-16 left-0 right-0 bg-white shadow-md z-10 pt-2 pb-8">
          <FeedButtons />
        </div>
        <div className="container mx-auto px-4 py-6 pt-20">
          <div className="max-w-6xl mx-auto bg-white p-8 shadow-md rounded-md flex flex-col lg:flex-row">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4 text-center lg:text-left" dangerouslySetInnerHTML={{ __html: blog.title }}></h1>
              <div className="text-sm text-gray-600 mb-6 text-center lg:text-left">{blog.publishedDate}</div>
              <div className="mt-2 mb-4">
                <LikeDislikeButton blogid={blog.id}/>
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
              <div className="">
                  <button 
                  type="button" 
                  className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition transform hover:scale-105 ml-4"
                >
                  Subscribe
                </button>
                  </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullBlog;
