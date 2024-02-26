import { useState } from "react";
import { UserTable } from "../components/index"
import { AddNewUserAdmin } from "../components/index";


const AdminDashBoard = () => {
  const [isCreatePageOpen,setPageOpen]=useState(false)

  return (
<>
<h1 className="text-3xl font-bold m-4 text-gray-600">Admin DashBoard</h1>
<button onClick={()=>setPageOpen(!isCreatePageOpen)} className="bg-blue-800 px-4 py-2 rounded ml-6 text-white ">{!isCreatePageOpen?'new user':'x'}</button>
{isCreatePageOpen&&<AddNewUserAdmin close={setPageOpen}/>}
    <UserTable/>

</>



  )
}
export default AdminDashBoard