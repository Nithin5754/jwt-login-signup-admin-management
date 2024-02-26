import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route,  RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Login,SignUp,Home, Profile, AdminDashBoard } from "../src/pages/index.jsx";

import { Provider } from 'react-redux'
import store from './app/store.js'
import PrivateRoutes from './components/PrivateRoutes.jsx'
import AuthorizedAdminRoutes from './components/AuthorizedAdminRoutes.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={ <Login/> }/>
      <Route path='/register' element={ <SignUp/> }/>
      <Route path='/' element={<App/>}>
        <Route index={true} path='/' element={<Home/>}/>
        {/* commom user routes start here */}
        <Route path=""  element={<PrivateRoutes/>}>
        <Route path='/profile' element={<Profile/>}/>
        </Route>
        {/* admin routes start here */}
        <Route path='/admin'  element={<AuthorizedAdminRoutes/>}>
           <Route path='dashboard' element={<AdminDashBoard/>}/>
        </Route>
          
      </Route>
    </>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
       <React.StrictMode>
   
   <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>

)
