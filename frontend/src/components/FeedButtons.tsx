import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const FeedButtons = React.memo(() => {
  const location = useLocation();

  const getButtonClass = (path: string) => {
    return location.pathname === path ?"relative text-white group-hover:bg-white group-hover:text-black":"relative text-black group-hover:text-white"
  };
  const getButtonClasss = (path:string)=>{
      return location.pathname === path ?"absolute inset-0 w-full h-full bg-black border-2 border-black group-hover:bg-white":"absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"
  }

  return (
    <div className="mt-48 md:mt-20 flex flex-row items-center justify-center">
      <div className="fixed flex flex-row gap-10 p-2">
        <div>
          <Link to="/blogs">
              <button className="relative inline-block px-4 py-2 font-medium group">
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className={getButtonClasss('/blogs')}></span>
                  <span className={getButtonClass('/blogs')}>My Feed</span>
              </button>
          </Link>
        </div>
        <div>
          <Link to="/subscriptions">
            
              <button className="relative inline-block px-4 py-2 font-medium group">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className={getButtonClasss('/subscriptions')}></span>
              <span className={getButtonClass('/subscriptions')}>Subscriptions</span>
              </button>
           
          </Link>
        </div>
        <div>
          <Link to="/myblogs">
              <button className="relative inline-block px-4 py-2 font-medium group">
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className={getButtonClasss('/myblogs')}></span>
                  <span className={getButtonClass('/myblogs')}>My Blogs</span>
              </button>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default FeedButtons;