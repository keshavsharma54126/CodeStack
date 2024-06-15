import axios from 'axios';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/Appbar';
import { BACKEND_URL } from '../config';


const customColors = [
  '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff',
  '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff',
  '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff',
  '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2',
  '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'
];

const modules = {
  toolbar: [
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],  // Custom dropdown
    ['bold', 'italic', 'underline', 'strike'],        // Toggled buttons
    [{ 'color': customColors }, { 'background': customColors }],  // Custom color dropdowns
    [{ 'script': 'sub'}, { 'script': 'super' }],      // Superscript/Subscript
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // Custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // Outdent/Indent
    [{ 'direction': 'rtl' }],                         // Text direction
    [{ 'align': [] }],                                // Alignment options
    ['link', 'image', 'video'],
    ['clean']                                         // Remove formatting
  ]
};

const formats = [
  'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'script',
  'blockquote', 'code-block',
  'header',
  'list', 'bullet', 'indent',
  'direction', 'align',
  'link', 'image', 'video'
];

const NewBlog = () => {
    const [title,setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('');
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
    <AppBar />
    <div className="container mx-auto my-auto p-4 sm:p-8">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl min-h-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-center">Create New Blog</h1>
        
        <div className="mb-20">
          <label className="block text-gray-700 text-xl font-bold mb-4" htmlFor="title">
            Title
          </label>
          <ReactQuill 
            id="title"
            modules={modules} 
            formats={formats} 
            value={title} 
            onChange={(value:string)=>{
                setTitle(value);
            }}
            placeholder="Enter blog title"
            className="h-20 mb-4"
          />
        </div>
        
        <div  >
          <label className="block text-gray-700 text-xl font-bold mb-4 " htmlFor="content">
            Blog Content
          </label>
          <ReactQuill 
            id="content"
            modules={modules} 
            formats={formats} 
            value={content} 
            onChange={(value:string)=>{
                setContent(value)
            }}
            placeholder="Write your blog content here..."
            className="h-96 mb-4"
          />
        </div>
        <div className='mt-20'>
            <button onClick={async()=>{
              
                try{
                    const token = localStorage.getItem('token')
                    if(!token){
                        navigate('/signup')
                    }

                    if(title.trim()==""){
                      alert("Title of the blog can not be Empty")
                      return;
                    }
                    if(content.trim()==""){
                      alert("Content of the blog can not be empty")
                      return;
                    }
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog/new`,{
                        title,
                        content
    
                    },{
                        headers:{
                            Authorization:localStorage.getItem('token')
                        }
                    })
                    const id = response.data.id;
                    navigate(`/blog/${id}`)
                    
                   
                }catch(error){
                    console.log("Error adding blog:",error)
                }
            }
                
            }type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >Add Blog</button>
      </div>
      </div>
      
      
    </div>
  </div>
  );
}

export default NewBlog;