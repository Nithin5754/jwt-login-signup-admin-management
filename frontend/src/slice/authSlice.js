
import { createSlice } from "@reduxjs/toolkit";


const initialState={
  userInfo:localStorage.getItem('userInfo')
  ?JSON.parse(localStorage.getItem('userInfo'))
  :null
}


const authSlice=createSlice({
  name:"auth",
  initialState,
  reducers:{
    setCredentials:(state,action)=>{
      console.log(action,"action.payload");
      state.userInfo=action.payload
      localStorage.setItem('userInfo',JSON.stringify(action.payload))
    },
    updateImage:(state,action)=>{
      const updateUserInfo={
        ...state.userInfo,
        image:action.payload
      }
      state.userInfo=updateUserInfo
      localStorage.setItem('userInfo',JSON.stringify(updateUserInfo))
    },
    logOut:(state,action)=>{
      state.userInfo=null
      localStorage.removeItem('userInfo')
    },

  }
})


export const {setCredentials,logOut,updateImage}=authSlice.actions
export default authSlice.reducer