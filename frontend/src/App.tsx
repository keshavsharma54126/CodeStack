import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blogs from "./pages/Blogs";
import FullBlog from "./pages/FullBlog";
import NewBlog from "./pages/NewBlog";
import MyBlogs from "./pages/MyBlogs";
import Subscriptions from "./pages/Subscriptions";
import EditBlog from "./pages/EditBlog";

function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://source.unsplash.com/random/1920x1080')",
      }}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-60"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-extrabold text-white mb-6 tracking-wider drop-shadow-lg">
          Welcome to CodeStack
        </h1>
        <p className="text-2xl text-gray-200 mb-8 max-w-lg mx-auto drop-shadow-md">
          A platform for bloggers, journalists, and creators to share their
          thoughts and ideas with the world.
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <Link to="/signin">
            <button className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-md">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-8 py-4 bg-green-500 text-white text-lg font-semibold rounded-full hover:bg-green-600 transition-transform transform hover:scale-105 shadow-md">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/blog/:id" element={<FullBlog />} />
          <Route path="/newblog" element={<NewBlog />} />
          <Route path="/editblog/:id" element={<EditBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
