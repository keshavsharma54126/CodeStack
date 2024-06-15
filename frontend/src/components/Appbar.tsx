
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
    
      
        <nav className="fixed top-0 left-0 w-full bg-gray-900 p-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Codestack Logo"
              className="h-8 w-auto"
            />
            <Link to="/blogs">
              <span className="ml-3 text-white text-xl font-semibold">Codestack</span>
            </Link>
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
