import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../slice/userSlice"
import { setCredentials, updateImage } from "../slice/authSlice"

const Profile = () => {
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState();
  const dispatch=useDispatch()
  const {userInfo}=useSelector(store=>store.auth)


  const handleUpdateProfile=async(e)=>{
    e.preventDefault()
    if(password !==confirmPassword){
      return console.log("invalid password")
    }else{
      let imageUrl;
      if(image){
        const formData=new FormData();
        formData.append("avatar",image)
        console.log(formData,"formdata-image");

        const imageResponse=await fetch("http://localhost:3500/api/users/uploads",{
          method:'POST',
          body:formData
        })
        if(!imageResponse)return
        setPreview('')

        imageUrl=await imageResponse.text();
        console.log(imageUrl,"imageurl");
        formData.append('imageUrl',imageUrl)
      }



      dispatch(updateUser({name,password,imageUrl})).then(res=>{
        if(res.meta.requestStatus==='rejected'){
          const errMessage="some error occured while updating"
          return 
        }else{
          dispatch(setCredentials(res.payload))
        }
      })
    }
  }

  const handleFileChange = event => {
    setImage(event.target.files[0]);

    let reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    event.target.value = "";
  };
  const handleDelete = () => {
    dispatch(updateImage(""))
    };

    const src = preview
    ? preview
    : userInfo.image
    ? "http://localhost:3500/" + userInfo.image
    : "https://avatar.iran.liara.run/public/boy?username=Ash";

  return (
    <>
   <main className="w-screen pt-5 flex justify-center min-h-screen">
  <div className="p-2 md:p-4">
    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
      <h2 className="pl-6 text-2xl font-bold sm:text-xl">Update Profile</h2>


      <div className="grid max-w-2xl mx-auto mt-8 border-2 shadow-lg w-[600px] rounded-lg">
  <form onSubmit={handleUpdateProfile} className="space-y-6 flex flex-col mx-auto max-w-md m-5">

    <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
      {src && (
        <img
          src={src}
          alt="chosen"
          className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
        />
      )}
      <div className="flex flex-row ml-4">
        <input
          onChange={handleFileChange}
          type="file"
          name="avatar"
          id="file-input"
          className="sr-only"
        />
        <label
          htmlFor="file-input"
          className="cursor-pointer px-2 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
        >
          Change Your Picture
        </label>

        <button
          onClick={handleDelete}
          type="button"
          className="ml-2 px-2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700  text-sm"
        >
          Delete picture
        </button>
      </div>
    </div>

    <div className="flex flex-col mb-6 mt-4">
      <label htmlFor="fullname" className="text-gray-700 mr-2">Name:</label>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        id="fullname"
        className="input-field border p-2 rounded-md"
        placeholder="Your full name"
        defaultValue={userInfo.name}
      />
    </div>

    <div className="flex flex-col mb-6">
      <label htmlFor="email" className="text-gray-700 mr-2">Email:</label>
      <input
        type="email"
        id="email"
        className="input-field border p-2 rounded-md"
        placeholder="your.email@mail.com"
        value={userInfo.email}
        readOnly
      />
    </div>

    <div className="flex flex-col mb-6">
      <label htmlFor="password" className="text-gray-700 mr-2">Password:</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        id="password"
        className="input-field border p-2 rounded-md"
        placeholder="Password"
      />
    </div>

    <div className="flex flex-col mb-6">
      <label htmlFor="confirmPassword" className="text-gray-700 mr-2">Confirm Password:</label>
      <input
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        id="confirmPassword"
        className="input-field border p-2 rounded-md"
        placeholder="Confirm Password"
      />
    </div>

    <div className="flex justify-end">
      <button
        type="submit"
        className="btn-submit bg-blue-800 text-white font-bold rounded-md p-2"
      >
        Save
      </button>
    </div>

  </form>
</div>

    </div>
  </div>
</main>

  </>
  )
}
export default Profile