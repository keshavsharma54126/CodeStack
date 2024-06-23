import { BACKEND_URL } from './../config';
import { useEffect, useState } from "react";
import axios from 'axios';

export interface Blog {
  like: any;
  dislike: any;
  content: string;
  title: string;
  id: string;
  publishedDate: string;
  author: {
    name: string;
  };
  postLikes:Array<{
    liked?:boolean,
    disliked?:boolean
  }>
}
export interface Comment{
  content:string;
  createdAt:string;
  author:{
    name:string
  }
}
const formatDate = (dateString: string): string => {
    
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      return date.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return "Invalid Date";
    }
  };
  


export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token") || ""
      }
    })
      .then(response => {
        const blogData = response.data.blog;
        blogData.publishedDate = formatDate(blogData.publishedDate)
        setBlog(blogData);
        setLoading(false);
      }).catch(e => {
        console.log(e);
        setLoading(false);
      });
  }, [id]);

  return {
    loading, blog
  };
};

export const useBlogs = (): [boolean, Blog[]] => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: localStorage.getItem("token") || ""
      }
    })
      .then(response => {
        const blogData = response.data.blogs.map((blog: Blog) => ({
          ...blog,
          publishedDate: formatDate(blog.publishedDate)
        }));
        setBlogs(blogData);
        setLoading(false);
      }).catch(e => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return [loading, blogs];
};

export const useMyBlogs = (): [boolean, Blog[]] => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/myblogs`, {
      headers: {
        Authorization: localStorage.getItem("token") || ""
      }
    })
      .then(response => {
        const blogData = response.data.blogs.map((blog: Blog) => ({
          ...blog,
          publishedDate: formatDate(blog.publishedDate)
        }));
        setBlogs(blogData);
        setLoading(false);
      }).catch(e => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return [loading, blogs];
};


export const useComments = ({id}:{id:string}):[boolean,Comment[]]=>{
    const[loading,setLoading] = useState(true);
    const[comments,setComments] = useState<Comment[]>([])
    useEffect(()=>{
      axios.get(`${BACKEND_URL}/api/v1/blog/comment/${id}`,{
        headers: {
          Authorization: localStorage.getItem("token") || ""
        }
      }).then(response=>{
        const comments = response.data.comments.map((comment:Comment)=>({
          ...comment,
          createdAt:formatDate(comment.createdAt)
        }))
        setLoading(false)
        setComments(comments)
      }).catch(e=>{
        console.error(e)
        setLoading(false)
      })
    },[]);
    return [loading,comments]
}