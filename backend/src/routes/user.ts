import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode,sign,verify} from 'hono/jwt'
import {signupInput,signinInput} from 'keshavsharma-blog';


export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL : string
      JWT_SECRET : string
    }
  }>()

userRouter.post('/signup',async(c)=>{
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({
        message: "incorrect email or password type"
      })
    }
    try{
      const user =  await prisma.user.create({
        data:{
          email:body.email,
          password:body.password,
          name:body.name
        },
      })
    
    
      const token = await sign({id:user.id,email:user.email},c.env.JWT_SECRET)
      return c.json({token})
    }catch(e){
      c.status(403)
      return c.json({error:"error while signing up"})
    }
  
    
  })
  
  
  userRouter.post('/signin',async(c)=>{
    const durl = c.env.DATABASE_URL;
    const prisma = new PrismaClient({
      datasourceUrl: durl,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body)
    if(!success){
      c.status(411);
      return c.json({
        message:"incorrect email or password type"
      })
    }
  
    try{
      
    const user = await prisma.user.findUnique({
      where:{
        email:body.email,
      }
    })
    if(!user){
      c.status(403)
      return c.json({error:"user not found"})
    }
    if(user.password != body.password){
      c.status(403)
      return c.json({error:"password is not correct"})
    }
  
  
    const token = await sign({id:user.id,email:user.email},c.env.JWT_SECRET)
    return c.json({token})
    }catch(e){
      console.log(e)
      c.status(403)
      return c.json({error:"error while signing in"})
    }
   
  
  })

  userRouter.post('/getuserinfo',async(c)=>{
    const durl = c.env.DATABASE_URL;
    const prisma = new PrismaClient({
      datasourceUrl: durl,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body)
    if(!success){
      c.status(411);
      return c.json({
        message:"incorrect email or password type"
      })
    }
  
    try{
      
    const user = await prisma.user.findUnique({
      where:{
        email:body.email,
      }
    })
    if(!user){
      c.status(403)
      return c.json({error:"user not found"})
    }
    if(user.password != body.password){
      c.status(403)
      return c.json({error:"password is not correct"})
    }
  
  
    const token = await sign({id:user.id,email:user.email},c.env.JWT_SECRET)
    return c.json({token})
    }catch(e){
      console.log(e)
      c.status(403)
      return c.json({error:"error while signing in"})
    }
   
  
  })