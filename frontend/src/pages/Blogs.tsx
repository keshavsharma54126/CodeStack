import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";
import BlogSkeleton from "../components/BlogSkeleton";
import FeedButtons from "../components/FeedButtons";
import AppBar from "../components/Appbar";

const Blogs = () => {
  const [loading, blogs] = useBlogs();

  if (loading) {
    return (
      <div className="mt-24 md:mt-5 pt-16">
        <AppBar />
        <div className="relative">
          <div className="fixed md:top-10 mt-4 lg:mt-2 left-0 right-0 bg-white shadow-md z-10 ">
            <FeedButtons />
          </div>
          <div className="container mx-auto px-4 py-6 pt-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-24 md:mt-16">
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-24 md:mt-5 pt-8 bg-gray-100 min-h-screen">
      <AppBar />
      <div className="relative">
        <div className="fixed md:top-10 mt-4 lg:mt-2 left-0 right-0 bg-white shadow-md z-10 ">
          <FeedButtons />
        </div>
        <div className="container mx-auto px-4 py-6 pt-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-24 md:mt-16">
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

export default Blogs;
