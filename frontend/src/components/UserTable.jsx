import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllusers } from "../slice/adminSlice";
// import { updateUser } from "../slice/userSlice";
import { editUser } from "../slice/adminSlice";

const UserTable = () => {
  const users = useSelector((store) => store.admin.users);
  const {userInfo}=useSelector((store)=>store.auth)
  const [searchQuery, setSearchQuery] = useState("");
  const [editedUserData, setEditedUserData] = useState({});
  const [editUserId, setEditUserId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllusers());
  }, [dispatch]);


  const handleEdit=async(userId,updateUserdata)=>{
    console.log(updateUserdata);
    dispatch(editUser({id:userId,data:updateUserdata})).then((res)=>{
   
      setEditUserId(null)
      setEditedUserData({})
      dispatch(getAllusers())
    })

  }

  const sortedUsers = [...users].sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">User Management</h1>
      <div className="flex justify-start w-full flex-col">
        <div className="m-auto my-4">
          <input
            value={searchQuery}
            type="search"
            name=""
            id=""
            className="px-4 py-2 border border-gray-300 rounded-md mr-4 focus:outline-none focus:border-blue-500"
            placeholder="Search users..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto m-auto">
          <table className="table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border border-gray-300">ID</th>
                <th className="px-4 py-2 border border-gray-300">Name</th>
                <th className="px-4 py-2 border border-gray-300">Email</th>
                <th className="px-4 py-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers
                .filter(
                  (user) =>
                    user.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((user, index) => (
                  <tr className="bg-gray-100" key={user._id}>
                    <td className="px-4 py-2 border border-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {editUserId===user?._id?(
                     <input type="text" defaultValue={editedUserData.name||user.name} onChange={(e)=>setEditedUserData(
                     { ...editedUserData,
                      name:e.target.value}
                     )}/>
                      ):(user.name)}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {editUserId===user?._id?(
                      <input defaultValue={editedUserData?.email||user?.email} type="email"  onChange={(e)=>{
                        setEditedUserData({
                          ...editedUserData,
                          email:e.target.value
                        })
                      }}/>
                      ):(user?.email)}
                    </td>

                    <td className="px-4 py-2 border border-gray-300">
                      {userInfo._id===user._id?(<p>online</p>):(
                        editUserId === user._id ? (
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={()=>handleEdit(user._id,editedUserData)}
                          >
                            save
                          </button>
                        ) : (
                          <>
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              onClick={() => setEditUserId(user._id)}
                              disabled={userInfo._id===user._id}
                            >
                              Edit
                            </button>
  
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2" onClick={()=>dispatch(deleteUser(user?._id))}>
                              Delete
                            </button>
                          </>
                        )
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default UserTable;
