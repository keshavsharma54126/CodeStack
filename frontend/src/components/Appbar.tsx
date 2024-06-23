
import LogoutButton from './LogoutButton';
import {  useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import PublishButton from './PublishButton';



const AppBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [name,setName] = useState("");


  const navigate=useNavigate()

  const handleLogout = () => {
    // Handle the logout logic here
    localStorage.removeItem("token")
    navigate('/signup')
  };
  const decodeJWT = (token: string): any => {
    try {
      const base64Url = token.split('.')[1]; // Get the payload part
      if (!base64Url) throw new Error("Invalid token format");
      
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Failed to decode JWT:", e);
      return null;
    }
  };
useEffect(() => {
  const token = localStorage.getItem("token")||"";
  if (token) {
    const decoded = decodeJWT(token);
    if (decoded && decoded.email) {
      setName(decoded.email.toUpperCase());
    } else {
      console.error("No email found in token");
    }
  }
}, []);


 


const handlePublish = ()=>{
  navigate('/newblog')
}


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    
      
        <nav className="fixed top-0 left-0 w-full bg-black p-4 z-50 ">
        <div className="container mx-auto flex justify-between items-center gap-16">
          <div className="flex items-center">
            <img
              src="https://freepngdownload.com/image/thumb/feather-clipart-logo-image-download.png"
              className="h-20 w-auto"
            />
            <Link to="/blogs">
              <span className="ml-3 text-white text-3xl font-monospace font-mono font-bold">FinalDraft</span>
            </Link>
          </div>
          <div className="flex-grow-0 lg:flex-grow">
              
              <form className="max-w-xl mx-auto">
                  <div className="flex">
                      <label  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                      <button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg></button>
                      <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                          <li>
                              <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Title</button>
                          </li>
                          <li>
                              <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Author</button>
                          </li>
                         
                          </ul>
                      </div>
                      <div className="relative w-full">
                          <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                          <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                              </svg>
                              <span className="sr-only">Search</span>
                          </button>
                      </div>
                  </div>
              </form>

          </div>
          
          <div className="flex items-center space-x-4">
            
            <button
              onClick={toggleDarkMode}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isDarkMode ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m8.36-8.36h-1M4.64 12h-1m15.07-7.07l-.7.7M6.34 18.34l-.7.7m12.02 0l-.7-.7M6.34 5.66l-.7-.7M12 5a7 7 0 017 7H5a7 7 0 017-7z"
                  />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3a9 9 0 100 18 9 9 0 000-18z"
                  />
                </svg>
              )}
            </button>
            <div className="relative">
              <AvatarComponent name={name} />
            </div>
            <PublishButton onClick={handlePublish} />
            <div className="mt-3">
            <LogoutButton buttonText="Log out" onClick={handleLogout} />
            </div>
          </div>
        </div>
            
      </nav>
        
  
    
  );
};
function AvatarComponent({name}:{name:string}){
 
    return (
         <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
    )
}
export default AppBar;
