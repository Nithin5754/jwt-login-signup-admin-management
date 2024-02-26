
import { configureStore } from "@reduxjs/toolkit";

import userSlice from "../slice/userSlice";
import authSlice from "../slice/authSlice";
import adminReducer from '../slice/adminSlice'



const store=configureStore({
  reducer:{
    user:userSlice,
    auth:authSlice,
    admin:adminReducer
  }
})



export default store