

const FullBlogSkeleton = () => {
  return (
    <div className="w-full">
    <div className="min-h-screen w-full bg-gray-100 py-10 flex justify-center animate-pulse">
      <div className="w-full bg-white p-8 shadow-md rounded-md flex max-w-screen-xl">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="w-1/3 pl-8">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="flex items-center mb-4">
            <div className="w-24 h-12 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center mr-4"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default FullBlogSkeleton