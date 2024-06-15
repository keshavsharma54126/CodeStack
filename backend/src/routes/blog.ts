import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify} from 'hono/jwt'
import { createBlogInput,updateBlogInput } from 'keshavsharma-blog';


export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL : string
      JWT_SECRET : string
      
    },
    Variables: {
      userId:string;
    }
  }>()


  blogRouter.use(async(c,next)=>{
    
    const authheader = c.req.header("authorization")||"";
    if(!authheader){
      c.status(401)
      return c.json({
        message:"unauthorized accesss"
      })
    }
    try{
      const user = await verify(authheader,c.env.JWT_SECRET);
      if(user){
        
        console.log("user found")
        //@ts-ignore
        c.set("userId",user.id);
        console.log("going to the main route")
       await  next();
      }else{
        c.status(403);
        return c.json({
          message: "You are not logged in"
        })
      }
    }catch(e){
      c.status(403)
      return c.json({
        message:"you are not logged in"
      })
    }

    
  });

  blogRouter.post('/new',async(c)=>{
    
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body)
    if(!success){
      c.status(411);
      return   c.json({
        message: "incorrect title or content type "
      })
    }
    const authorId = c.get("userId")
    try{
      const blog = await prisma.post.create({
        data:{
          title :body.title,
          content : body.content,
          authorId: authorId
        }
      })
      return c.json({
        id:blog.id
      })
    }catch(e){
      c.status(411)
      console.log(e)
      return c.json({message:"error while uploading post"})
    }

  })

  blogRouter.put('/update',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({message:"incorrect updated title or content type"})
    }

    try{
      const blog = await prisma.post.update({
        where:{
          id:body.id
        },
        data:{
          title :body.title,
          content : body.content
        }
      })
      return c.json({
        id:blog.id
      })
    }catch(e){
      c.status(411)
      console.log(e)
      return c.json({message:"error while uploading post"})
    }
  })

  blogRouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())


    try{
      const blogs= await prisma.post.findMany(
        {
          select:{
            content:true,
            title:true,
            id:true,
            publishedDate:true,
            author:{
              select:{
                name:true
              }
            }
          }
        }
      )
      return c.json({
        blogs
      })
    }catch(e){
      c.status(411)
      console.log(e)
      return c.json({message:"error while uploading post"})
    }
  })

  blogRouter.get('/myblogs',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const authorId = c.get("userId");

    try{
      const blogs = await prisma.post.findMany({
        where:{
          authorId
        },select:{
          id:true,
          title:true,
          content:true,
          publishedDate:true,
          author:{
            select:{
              name:true
            }
          }
        }
      })
      return c.json({
        blogs
      })
    }catch(e){
      c.status(411)
      console.log(e)
      return c.json({message:"error while uploading post"})
    }
  })

  blogRouter.get('/:id',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const blogid = c.req.param('id');

    try{
      const blog = await prisma.post.findFirst({
        where:{
          id:blogid
        },select:{
          id:true,
          title:true,
          content:true,
          publishedDate:true,
          author:{
            select:{
              name:true
            }
          }
        }
      })
      return c.json({
        blog
      })
    }catch(e){
      c.status(411)
      console.log(e)
      return c.json({message:"error while uploading post"})
    }
  })

 