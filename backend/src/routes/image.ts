import { metadata } from './../../../../nextjs2/app/layout';
import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify} from 'hono/jwt'
import * as AWS from 'aws-sdk'
import multer,{Multer} from 'multer'
import multerS3 from 'multer-s3'



export const imageRouter = new Hono<{
    Bindings:{
      AWS_ACCESS_KEY_ID:string
      AWS_SECRET_ACCESS_KEY:string
      AWS_REGION:string
      S3_BUCKET_NAME:string  
      DATABASE_URL : string
      JWT_SECRET : string
      
    },
    Variables: {
      userId:string;
    }
  }>()

  interface RequestWithFile extends Request{
    file:Express.MulterS3.File
  }


AWS.config.update({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    region:process.env.AWS_REGION
})

const s3 = new AWS.S3();


const upload: Multer = multer({
    storage: multerS3({
        //@ts-ignore
      s3: s3,
      //@ts-ignore
      bucket: process.env.S3_BUCKET_NAME,
      acl: 'public-read',
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, Date.now().toString() + '-' + file.originalname);
      },
    }),
  });

  imageRouter.use(async(c,next)=>{
    const authheader = c.req.header("authorization")||""
    if(!authheader){
        c.status(401);
        return c.json({
            message:"unauthorized access"
        })
    }
    try{
        const user = await verify(authheader,c.env.JWT_SECRET);
        if(user){
            //@ts-ignore
            c.set("userId",user.id);
            await next()
        }else{
            c.status(403)
            return c.json({
                message:"you are not logged in"
            })
        }

    }catch(e){
        c.status(403);
        return c.json({message:"you are not logged in"})
    }
  });

  imageRouter.post('/upload',upload.single('image') as any,async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const reqWithFile = c.req as unknown as RequestWithFile;
    const imageUrl = reqWithFile.file.location

    return c.json({
      imageUrl:imageUrl
    })

  })



