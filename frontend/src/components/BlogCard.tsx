import { Link } from "react-router-dom";
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/solid';

interface BlogCardInterface {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  blogid: string;
  like:number;
  dislike:number

}

const BlogCard = ({ authorName, title, content, publishedDate, blogid,like,dislike }: BlogCardInterface) => {
  
                    const parser = new DOMParser();
                    const doc1 = parser.parseFromString(title,'text/html')
                    const doc2 = parser.parseFromString(content,'text/html')
                     const titleText = doc1.body.textContent||""
                    const contentText = doc2.body.textContent||""

                    
  return (
    <Link to={`/blog/${blogid}`} className="block transform transition-transform hover:scale-105">
     <div>
           <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center mb-4">
          <AvatarComponent name={authorName} />
          
          <div className="ml-4 text-gray-700">
            <div className="flex flex-row gap-10">
                <div>
                      <span className="font-semibold text-lg">{authorName}</span>
                      <div className="text-sm text-gray-500">
                        {publishedDate} · <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Member-only</span>
                      </div>
                </div>
                <div className="flex flex-row gap-10 ">
                    <div className="flex flex-row gap-3">
                        <HandThumbUpIcon className={`h-5 w-5 'text-gray-600'}`} />
                         <span >{like}</span>
                    </div>
                        <div className="flex flex-row gap-3">
                            <HandThumbDownIcon className={`h-5 w-5 text-gray-600`} />
                            <span>{dislike}</span>
                        </div>
                </div>
              
            </div> 
            
          </div>
          <div className="ml-32">
            
          </div>
        </div>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 leading-snug" >{titleText}</h1>
        </div>
        <div className="text-gray-700 mb-4 line-clamp-3" >{contentText}
        </div>
        <div className="text-gray-500 text-sm">
          {`${Math.ceil(content.length / 60)} minute read`}
        </div>
        <div className="bg-gray-100 h-px w-full mt-4"></div>
      </div>
     </div>
      
    </Link>
  );
};

function AvatarComponent({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300 text-lg">{name[0]}</span>
    </div>
  );
}

export default BlogCard;
