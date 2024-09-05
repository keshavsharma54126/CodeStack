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
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-gray-300">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">
          Welcome to CodeStack
        </h1>
        <p className="text-lg mb-6 text-gray-600">
          A platform for bloggers, journalists, and creators to share their
          thoughts and ideas with the world.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/signin">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">
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
