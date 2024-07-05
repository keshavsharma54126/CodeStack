import Appbar from '../components/Appbar';
import BlogCard from '../components/BlogCard';
import { useMyBlogs } from '../hooks';
import BlogSkeleton from '../components/BlogSkeleton';
import FeedButtons from '../components/FeedButtons';

const MyBlogs = () => {
    const[loading,blogs] = useMyBlogs()


    if (loading) {
      return (
        <div className="pt-16">
          <Appbar />
         <div className="relative">
         <div className="fixed top-16 left-0 right-0 bg-white shadow-md z-10 pt-2 pb-8">
            <FeedButtons />
          </div>
          <div className=' mt-50 md:mt-32 flex flex-col justify-center items-center min-h-screen gap-6  '>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
         </div>
        </div>
      );
    }
  if(blogs.length>0){
    return (
      <div className="mt-32 md:mt-5 pt-16 bg-gray-100 min-h-screen">
        <Appbar />
        <div className="relative ">
          <div className="fixed top-16 left-0 right-0 bg-white shadow-md z-10 pt-2 pb-8">
            <FeedButtons />
          </div>
          <div className="container mx-auto px-4 py-6 pt-20">
            <div className="flex flex-col items-center space-y-6 mt-10">
              {blogs.map((blog) => (
                <div key={blog.id} className="w-full ">
                  <BlogCard
                    authorName={blog.author.name}
                    title={blog.title}
                    content={blog.content}
                    blogid={blog.id}
                    publishedDate={blog.publishedDate}
                    like= {blog.like}
                    dislike = {blog.dislike}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
    else{
      return (
        <div className="mt-32 md:mt-1 pt-16 bg-gray-100 min-h-screen">
        <Appbar />
        <div className="relative ">
          <div className="fixed top-16 left-0 right-0 bg-white shadow-md z-10 pt-2 pb-8">
            <FeedButtons />
          </div>
          <div className="container mx-auto px-4 py-6 pt-20">
            <div className="flex flex-col items-center space-y-6 mt-10">
                    You have not published any Blogs.
            </div>
          </div>
        </div>
      </div>
      )
    }
  
  
}

export default MyBlogs