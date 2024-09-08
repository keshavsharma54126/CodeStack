const BlogSkeleton = () => {
  return (
    <div className=" w-full max-w-2xl animate-pulse mx-auto my-auto">
      {/* <div className="fixed md:top-10 left-0 right-0 bg-white shadow-md z-10  ">
        <FeedButtons />
      </div> */}
      <div className=" max-w-2xl mx-auto p-6 bg-gray-200 shadow-md rounded-md border border-gray-200">
        <div className="flex items-center mb-2">
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              &nbsp;
            </span>
          </div>
          <div className="ml-3 text-gray-700">
            <span className="font-semibold bg-gray-300 h-4 w-24 rounded block"></span>
            <span className="text-sm text-gray-500 block h-3 w-32 rounded bg-gray-300 mt-1"></span>
          </div>
        </div>
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight bg-gray-300 h-6 w-full mt-4 rounded"></h2>
        </div>
        <div className="text-gray-700 mb-4">
          <div className="bg-gray-300 rounded h-4 w-full mt-2"></div>
          <div className="bg-gray-300 rounded h-4 w-3/4 mt-2"></div>
        </div>
        <div className="text-gray-500 text-sm bg-gray-300 rounded h-3 w-16"></div>
        <div className="bg-gray-300 h-1 w-full mt-4 rounded"></div>
      </div>
    </div>
  );
};

export default BlogSkeleton;
