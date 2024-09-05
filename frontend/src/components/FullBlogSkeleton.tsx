import FeedButtons from "./FeedButtons";

const FullBlogSkeleton = () => {
  return (
    <div className=" w-full h-full">
      <div className="fixed md:top-10 left-0 right-0 bg-white shadow-md z-10  ">
        <FeedButtons />
      </div>
      <div className="pt-16 min-h-screen mt-20 animate-pulse">
        <div className="h-full w-full bg-gray-200 mb-4"></div>
        <div className="relative">
          <div className="fixed top-16 left-0 right-0 h-12 bg-gray-200 shadow-md z-10"></div>
          <div className="md:-mt-24 container mx-auto px-2 py-6 pt-20 ">
            <div className="max-w-12xl mx-auto rounded-md flex flex-col lg:flex-row">
              <div className="flex-1">
                <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="flex flex-row mt-2 mb-4 gap-8">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="h-24 bg-gray-200 rounded mb-6"></div>
              </div>
              <div className="lg:w-1/3 lg:pl-8 flex flex-col items-center lg:items-start">
                <div className="h-6 bg-gray-200 rounded w-3/4 ml-4 mb-4"></div>
                <div className="flex items-center mb-4 w-full">
                  <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
                  <div className="ml-4 flex-1">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlogSkeleton;
