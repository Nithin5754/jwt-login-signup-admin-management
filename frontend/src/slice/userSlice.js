import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const USERS_URL="http://localhost:3500/api/users"

export const loginUser=createAsyncThunk('user/login',async data=>{
  const response=await axios.post(`${USERS_URL}/auth`,data,{
    withCredentials:true
  })
  const user=response.data
  console.log(user);
  return user
})


export const registerUser=createAsyncThunk('user/register',async data=>{

  const response=await axios.post(`${USERS_URL}`,data,{
    withCredentials:true,
  })
  const user=response.data
  console.log(user,"register user async thunk");
  return user
})


export const logoutUser=createAsyncThunk('user/logout',async data=>{
  const response=await axios.post(`${USERS_URL}/logout`);
  return response.status===200
})


export const updateUser=createAsyncThunk('user/update',async data=>{
  const response=await axios.put(`${USERS_URL}/profile`,data,{
    withCredentials:true
  })
  const user=response.data
  console.log(user,"updated user");
  return user
})


const userSlice=createSlice({
  name:'user',
  initialState:{loading:'idle',error:''},
  reducer:{},
  extraReducers:builder=>{
    builder
    .addCase(loginUser.pending,(state,action)=>{
      state.loading='loading'
    })
    .addCase(loginUser.fulfilled,(state,action)=>{
      state.loading='idle'
    })
    .addCase(loginUser.rejected,(state,action)=>{
      state.loading='idle'
      state.error=action.error.message
    })
      .addCase(registerUser.pending,(state,action)=>{
        state.loading='loading'
      })
      .addCase(registerUser.fulfilled,(state,action)=>{
        state.loading='idle'

      })
      .addCase(registerUser.rejected,(state,action)=>{
        state.loading='idle',
        state.error=action.error.message
      })
      .addCase(logoutUser.pending,(state,action)=>{
        state.loading='loading'
      })
      .addCase(logoutUser.fulfilled,(state,action)=>{
        state.loading='idle'
      })
      .addCase(logoutUser.rejected,(state,action)=>{
        state.loading='idle'
        state.error=action.error.message
      })
      .addCase(updateUser.pending,(state,action)=>{
        state.loading='loading'
      })
      .addCase(updateUser.fulfilled,(state,action)=>{
        state.loading='idle'
      })
      .addCase(updateUser.rejected,(state,action)=>{
        state.loading='idle'
        console.log(action.error);
        state.error=action.error.message
      })

  }
})



export default userSlice.reducer