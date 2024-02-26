import { useState } from "react"
import { useDispatch } from "react-redux"
import { createUser, getAllusers } from "../slice/adminSlice"







const AddNewUserAdmin = ({close}) => {
const [name,setName]=useState('')
const [password,setPassword]=useState('')
const [confirmPassword,setConfirmPassword]=useState('')
const [email,setEmail]=useState('')
const dispatch=useDispatch()



const handleSubmit=(e)=>{
  e.preventDefault()
  console.log(name,password,email,confirmPassword);
  if(password!==confirmPassword){
    return console.log("password not match");
  }else{
    dispatch(createUser({name,email,password})).then((res)=>{
      if(res.meta.requestStatus==='rejected')return console.log("invalid user name");
      console.log(res,"comming from backend creating a user");
      dispatch(getAllusers())
     
    
    }) .catch((error) => {
      setError('An error occurred while registering');
      console.error(error);
     
    });
    setName('')
    setPassword('')
    setConfirmPassword('')
    close(false)
  }
}

  return (
 <div className="mx-10 border p-4 my-6">
     <form onSubmit={handleSubmit}>
    <div className="divide-y divide-gray-200">
      <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
        <div className="relative">
          <input
          value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="off"
            id="name"
            name="name"
            type="text"
            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
            placeholder="Full Name"
          />
          <label
            htmlFor="name"
            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
          >
            FUll Name
          </label>
        </div>
        <div className="relative">
          <input
          value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="off"
            id="email"
            name="email"
            type="email"
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
          value={password}
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
          <input
          value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            autoComplete="off"
            id="ConfirmPassword"
            name="ConfirmPassword"
            type="text"
            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
            placeholder="ConfirmPassword"
          />
          <label
            htmlFor="ConfirmPassword"
            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
          >
            Confirm Password
          </label>
        </div>
        <div className="relative">
          <button className="bg-cyan-500 text-white rounded-md px-2 py-1">
            Submit
          </button>
        </div>
      </div>
    </div>
  </form>
 </div>
  )
}
export default AddNewUserAdmin