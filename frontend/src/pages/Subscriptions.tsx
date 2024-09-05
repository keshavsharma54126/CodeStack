import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import FeedButtons from "../components/FeedButtons";
import { useBlogs } from "../hooks";

const Subscriptions = () => {
  const [loading, blogs] = useBlogs();

  if (loading) {
    return (
      <div className="mt-32 md:mt-1 pt-16">
        <Appbar />
        <div className="relative">
          <div className="fixed md:top-10 left-0 right-0 bg-white shadow-md z-10 ">
            <FeedButtons />
          </div>
          <div className="flex flex-col justify-center items-center min-h-screen gap-6 mt-32">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-32 md:mt-5 pt-16 bg-gray-100 min-h-screen">
      <Appbar />
      <div className="relative ">
        <div className="fixed md:top-10 left-0 right-0 bg-white shadow-md z-10 ">
          <FeedButtons />
        </div>
        <div className="container mx-auto px-4 py-6 pt-20">
          <div className="flex flex-col items-center space-y-6 mt-10">
            {blogs.map((blog) => (
              <div key={blog.id} className="w-full">
                <BlogCard
                  authorName={blog.author.name}
                  title={blog.title}
                  content={blog.content}
                  blogid={blog.id}
                  publishedDate={blog.publishedDate}
                  like={blog.like}
                  dislike={blog.dislike}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
