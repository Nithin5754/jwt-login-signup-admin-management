import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../slice/userSlice"
import { setCredentials } from "../slice/authSlice"

import { EMAIL_REGEX } from "../utils/constant"
const LoginForm = () => {
const [password, setPassword]=useState('')
const [email,setEmail]=useState('hello')
const [isError,setError]=useState('')
const {userInfo}=useSelector(store=>store.auth)
const {error}=useSelector(store=>store.user)

const navigate=useNavigate()
const dispatch=useDispatch()

useEffect(()=>{
if(userInfo){
  navigate('/')
}
},[navigate,userInfo])


const handleSubmit=(e)=>{
 e.preventDefault()


 if (email.trim() === '' || password.trim() === '') {
  setError("empty  Space is invalid. Please provide valid credentials.");
 
  return; 
}
if(!EMAIL_REGEX.test(email))return setError("invalid email")

 dispatch(loginUser({ email, password })).then(res=>{

if(res.payload){
  dispatch(setCredentials(res.payload))
}
setError("not found")
  
 })
 
}



  return (
    <div className="min-h-screen bg-gray-600 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
   
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-semibold">Login</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <button className="bg-cyan-500 text-white rounded-md px-2 py-1">
                    Submit
                  </button>
                  <p className="text-red-800">{isError}</p>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div>
          <p>
            New here ? <Link to={"/register"}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}
export default LoginForm