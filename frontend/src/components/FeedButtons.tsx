import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const FeedButtons = React.memo(() => {
  const location = useLocation();

  const getButtonClass = (path: string) => {
    return location.pathname === path ?"py-2.5 px-5 me-2 mb-2 text-sm font-medium text-red bg-white focus:outline-none  rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
      :'py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white bg-black focus:outline-none bg-black rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700';
  };

  return (
    <div className="mt-16 flex flex-row items-center justify-center">
      <div className="fixed flex flex-row gap-4 p-2">
        <div>
          <Link to="/blogs">
            <button type="button" className={getButtonClass('/blogs')}>
              Blogs Feed
            </button>
          </Link>
        </div>
        <div>
          <Link to="/subscriptions">
            <button type="button" className={getButtonClass('/subscriptions')}>
              Subscriptions
            </button>
          </Link>
        </div>
        <div>
          <Link to="/myblogs">
            <button type="button" className={getButtonClass('/myblogs')}>
              My Blogs
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default FeedButtons;