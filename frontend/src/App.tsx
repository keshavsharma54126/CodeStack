import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blogs from './pages/Blogs'
import FullBlog from './pages/FullBlog'
import NewBlog from './pages/NewBlog'
import MyBlogs from './pages/MyBlogs'
import Subscriptions from './pages/Subscriptions'
import EditBlog from './pages/EditBlog'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/myblogs" element={<MyBlogs/>}/>
          <Route path="/subscriptions"  element={<Subscriptions/>}/>
          <Route path="/blog/:id" element={<FullBlog/>}/>
          <Route path="/newblog" element = {<NewBlog/>}/>
          <Route path="/editblog/:id" element={<EditBlog/>}/>
          
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
