import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../slice/userSlice"
import { setCredentials } from "../slice/authSlice"
import { EMAIL_REGEX } from "../utils/constant"

const SignUpForm = () => {

const [name,setname]=useState('')
const [password,setPassword]=useState('')
const [email,setEmail]=useState('')
const [confirmPassword,setConfirmPassword]=useState('')
const [newErrors,setErrors]=useState('')


const {userInfo}=useSelector((store)=>store.auth)

const dispatch=useDispatch()
const navigate=useNavigate()
useEffect(() => {
  if (userInfo) {
    navigate("/", { replace: true });
  }
}, [navigate, userInfo]);


const handleSubmit=(e)=>{
  e.preventDefault()
  console.log(name,password,email,confirmPassword);

  if(!password.trim())return setErrors("empty password")
  if(!email.trim())return setErrors("empty email")
  if(!EMAIL_REGEX.test(email))return setErrors("invalid email") 
  if(password!==confirmPassword){
    return setErrors("password not match")
  }else{
    dispatch(registerUser({name,email,password})).then((res)=>{
      if(res.meta.requestStatus==='rejected')return setErrors("invalid user name");
      console.log(res,"comming from backend creating a user");
      dispatch(setCredentials(res.payload));
    })
  }


}


  return (
    <div className="min-h-screen bg-gray-600 text-white py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
       <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
         <div className="max-w-md mx-auto">
           <div>
             <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>
           </div>
           <form onSubmit={handleSubmit} className="space-y-6">
             <div>
               <input
                 onChange={e => setname(e.target.value)}
                 autoComplete="off"
                 id="name"
                 name="name"
                 type="text"
                 className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                 placeholder="Full Name"
               />
             </div>
             <div>
               <input
                 onChange={e => setEmail(e.target.value)}
                 autoComplete="off"
                 id="email"
                 name="email"
                 type="email"
                 className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                 placeholder="Email address"
               />
             </div>
             <div>
               <input
                 onChange={e => setPassword(e.target.value)}
                 autoComplete="off"
                 id="password"
                 name="password"
                 type="password"
                 className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                 placeholder="Password"
               />
             </div>
             <div>
               <input
                 onChange={e => setConfirmPassword(e.target.value)}
                 autoComplete="off"
                 id="ConfirmPassword"
                 name="ConfirmPassword"
                 type="password"
                 className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                 placeholder="Confirm Password"
               />
             </div>
             <div>
               <button type="submit" className="w-full py-2 px-4 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-50">
                 Submit
               </button>
             </div>
           </form>
           <div className="text-center mt-4">
             <p className="text-red-700">{newErrors}</p>
             <p className="text-sm">
               Already have an account? <Link to={"/login"} className="text-cyan-500 hover:text-cyan-600">Login</Link>
             </p>
           </div>
         </div>
       </div>
    </div>
   </div>
   
  )
}
export default SignUpForm