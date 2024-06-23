import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify} from 'hono/jwt'
import { createBlogInput,updateBlogInput,createCommentInput,updateCommentInput } from 'keshavsharma-blog';



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
    }finally{
      await prisma.$disconnect()
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
    }finally{
      await prisma.$disconnect()
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
            like:true,
            dislike:true,
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
    }finally{
      await prisma.$disconnect()
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
          like:true,
          dislike:true,
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
    }finally{
      await prisma.$disconnect()
    }
  })

  blogRouter.post('/authorornot',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const authorId = await c.get('userId')
    try{
      
      const blog = await prisma.post.findFirst({
        where:{
          id:body.id,
          authorId:authorId
        }
      })
      if(blog){
        return c.json({
          message:true
        })
      }else{
        return c.json({
          message:false
        })
      }
    }catch(e){
      c.status(411)
      console.log(e)
      return c.json({message:"error while uploading post"})
    } finally{
      await prisma.$disconnect()
    }
  })


//   const { PrismaClient } = require('@prisma/client');
// const { withAccelerate } = require('@prisma/accelerate');

blogRouter.put('/likedislike', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get("userId");

  try {
    const blog = await prisma.post.update({
      where: {
        id: body.blogid,
      },
      data: {
        like: body.likeno,
        dislike: body.dislikeno,
      },
    });

    await prisma.postLike.upsert({
      where: {
        user_post_unique: {
          userId: userId,
          postId: body.blogid,
        },
      },
      update: {
        liked: body.liked,
        disliked: body.disliked,
      },
      create: {
        userId: userId,
        postId: body.blogid,
        liked: body.liked,
        disliked: body.disliked,
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch (e) {
    c.status(411);
    console.log(e);
    return c.json({ message: "error while liking/disliking post" });
  } finally {
    await prisma.$disconnect();
  }
});

  blogRouter.post('/newcomment',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const userId= await c.get('userId')
    const body = await c.req.json()
    const {success} = createCommentInput.safeParse(body)
    if(!success){
      c.status(411);
      return   c.json({
        message: "incorrect title or content type "
      })
    }
    try{
      const comment = await prisma.comments.create({
        data:{
          content:body.content,
          postId:body.blogid,
          authorId:userId,

        }
      })
      return c.json({
        message:"comment created successfully",
        id:comment.id
      })
    }catch(e){
      c.status(411);
      console.error(e)
      return c.json({
        message:"error while creating comment"
      })
    }finally{
      await prisma.$disconnect();
    }
  }) 
  blogRouter.get('/comment/:blogid', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const blogId = c.req.param('blogid');
  
    try {
      const comments = await prisma.comments.findMany({
        where: {
          postId: blogId,
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      });
  
      return c.json({
        comments,
      });
    } catch (e) {
      c.status(500);
      console.error(e);
      return c.json({
        message: 'error while fetching comments',
      });
    } finally {
      await prisma.$disconnect();
    }
  });

  blogRouter.put('/editcomment/:commentid',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const commentId= c.req.param('commentid')
    const userId= await c.get('userId')
    const body = await c.req.json()
    const {success} = updateCommentInput.safeParse(body)
    if(!success){
      c.status(411);
      return   c.json({
        message: "incorrect title or content type "
      })
    }
    try{
      const updatedComment = await prisma.comments.update({
        where:{
          id:commentId
        },
        data:{
          content:body.content,
        }
      })
      return c.json({
        message:"comment created successfully",
        updatedComment
      })
    }catch(e){
      c.status(411);
      console.error(e)
      return c.json({
        message:"error while updating comment"
      })
    }finally{
      await prisma.$disconnect();
    }
  })

  blogRouter.get('/:id',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const blogid = c.req.param('id');
    const userId = c.get('userId')

    try{
      const blog = await prisma.post.findFirst({
        where:{
          id:blogid
        },select:{
          id:true,
          title:true,
          content:true,
          publishedDate:true,
          like:true,
          dislike:true,
          author:{
            select:{
              name:true
            }
          },
          postLikes:{
              where:{userId:userId},
              select:{liked:true,disliked:true},
          },
        },
      })
      return c.json({
        blog
      })
    }catch(e){
      c.status(411)
      console.log(e)
      return c.json({message:"error while uploading post"})
    }finally{
      await prisma.$disconnect()
    }
  })
  blogRouter.delete('/delete/:id', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const blogid = c.req.param('id');
  
    try {
      const blog = await prisma.post.delete({
        where: {
          id: blogid,
        },
      });
      return c.json({
        blog,
      });
    } catch (e) {
      c.status(500);
      console.error("Error while deleting post:", e);
      return c.json({ message: "Error while deleting post" });
    } finally {
      await prisma.$disconnect();
    }
  });