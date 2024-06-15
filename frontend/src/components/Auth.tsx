import { ChangeEvent, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Button from './Button';
import { signupInput } from 'keshavsharma-blog';
import axios from 'axios';
import { BACKEND_URL } from '../config';
const Auth = ({type}:{type:"signup"|"signin"}) => {

  const [postInput,setPostInput]= useState<signupInput>({
    name:"",
    email:"",
    password:""
  } )

  const navigate = useNavigate()

 async function sendRequest(){
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInput)
      const jwt = response.data;
      
      localStorage.setItem("token",jwt.token);
      navigate("/blogs")
    }catch(e){
      alert("Error while signing up")
    }
  }
  return (
<div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center p-4 bg-white rounded-md">
        <div className="text-3xl font-bold p-2">
          Create an account
        </div>
        <div className="mb-4">
          {type==="signin"?"Don't have an account?":"Already have an account?"}
          <Link className="text-blue-500 underline" to={type==="signin"?'/signup':'/signin'}>{type==="signin"?"Sign up":"Sign in"}</Link>
        </div>
      </div>
        <div className="w-96">
          
         {type==="signup"? <LabelledInput label="Username" placeholder="enter your name" type="text" onChange={(e)=>{setPostInput({
          ...postInput,
          name:e.target.value
        })}}/>: null}
          
        <LabelledInput label="Email" placeholder="johnDoe@gmail.com" type="text" onChange={(e)=>{setPostInput({
          ...postInput,
          email:e.target.value
        })}}/>
        <LabelledInput label="Password" placeholder="enter your password" type="password"onChange={(e)=>{setPostInput({
          ...postInput,
          password:e.target.value
        })}}/>
        </div>
        <div>
          <Button buttonText={type} onClick= {sendRequest} />
        </div>
      
    </div>
  )
}
interface LabelledInputType{
  label:string;
  placeholder:string;
  type:string
  onChange:(e: ChangeEvent<HTMLInputElement>) => void;
}
const LabelledInput = ({label,placeholder,type,onChange}:LabelledInputType)=>{
  return  (         <div>
    <label className="block m-2 text-xl font-bold text-gray-900 ">{label}</label>
    <input type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  placeholder={placeholder} onChange={onChange} />
  </div>)

}


export default Auth