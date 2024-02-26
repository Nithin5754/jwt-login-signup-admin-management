import { useState } from "react"
import { FaHamburger } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../slice/userSlice";
import { logOut } from "../slice/authSlice";


const NavBar = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [ismenu,setMenu]=useState(false)
  console.log(ismenu);
  const dispatch=useDispatch()
  const navigate=useNavigate()

const handleLogout=()=>{
dispatch(logoutUser()).then(res=>{
  dispatch(logOut())
  navigate('/login')
  
})
}

  return (
   <>
<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
 <div>
   <h2 className="text-white ">nithin.com</h2>
 </div>
    <button onClick={()=>setMenu(!ismenu)}  type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
      <FaHamburger/> 
    </button>
   {
    ismenu?(
      <div className=" w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li>
          <div href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
        <Link to={'/profile'}>profile</Link>
       
          </div>
        </li>
        {
        userInfo?.isAdmin&&(
          <li>
          <div className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
            <Link to={'/admin/dashboard'}>dashboard</Link>
          </div>
        </li>
        )
       }
  <>
  {
    userInfo&&(
      <li>
      <button className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={handleLogout} >logout</button>
    </li>
    )
  
  }
  </>
      </ul>
    </div>
    ):(
      <div className="sm:hidden  w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li>
          <div href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
        <Link to={'/profile'}>profile</Link>
          </div>
        </li>
       {
        userInfo?.isAdmin&&(
          <li>
          <div className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
            <Link to={'/admin/dashboard'}>dashboard</Link>
          </div>
        </li>
        )
       }
      
      <>
  {
    userInfo&&(
      <li>
      <button className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={handleLogout} >logout</button>
    </li>
    )
  
  }
  </>
      </ul>
    </div>
    )
   }
  </div>
</nav>

   </>
  )
}
export default NavBar