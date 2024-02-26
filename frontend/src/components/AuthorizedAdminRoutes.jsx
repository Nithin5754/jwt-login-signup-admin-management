import { useSelector } from "react-redux"
import {AdminDashBoard  } from "../pages/index";
import { Navigate } from "react-router-dom";
  
  




const AuthorizedAdminRoutes = () => {
  const {userInfo}=useSelector((state)=>state.auth)
  return userInfo?.isAdmin?<AdminDashBoard/>:<Navigate to={'/' }replace/>
 
  
}
export default AuthorizedAdminRoutes