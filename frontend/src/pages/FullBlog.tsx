
import { useBlog } from '../hooks'
import { useParams} from 'react-router-dom'
import AppBar from '../components/Appbar'
import FullBlogSkeleton from '../components/FullBlogSkeleton';
import LikeDislikeButton from '../components/LikeDislikeButton';


const FullBlog = () => {
  const {id} = useParams<{id:string}>();
    

    const{loading,blog} = useBlog({id:id||""})
    if(loading){
        return(
            <div className="pt-16">
              <AppBar/>
                <div className="felx items-center justify-center ">
                  <FullBlogSkeleton/>
                </div>
            </div>
        )
    }
    if(!blog){
      return(
        <div>
          no blog found
        </div>
      )
    }
  return (
    <div className="pt-16 ">
    <AppBar />
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center w-full">
      <div className="max-w-6xl bg-white p-8 shadow-md rounded-md flex">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: blog.title }}></h1>
          <div className="text-sm text-gray-600 mb-6">{blog.publishedDate}</div>
          <div className="text-lg text-gray-800 mb-6" dangerouslySetInnerHTML={{ __html: blog.content }}>
            {/* <p>{blog.content}</p> */}
          </div>
        </div>
        <div className="w-1/3 pl-8">
          <div className="text-xl font-bold mb-4">Author</div>
          <div className="flex items-center mb-4">
            <div className="w-24 h-12 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center">
              {blog.author.name[0]}
            </div>
            <div className="ml-4">
              <div className="font-bold text-gray-900">{blog.author.name}</div>
              <div className="text-sm text-gray-600">Master of mirth, purveyor of puns, and the funniest person in the kingdom.</div>
            </div>
          </div>
          <div className="flex flex-row gap-1 items-center justify-center">
              <div>
                <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Subscribe</button>
              </div>
              <div className="mb-2 mr-4">
                 <LikeDislikeButton/>
              </div>
          </div>
        
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default FullBlog

