import React from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Error from '../pages/Error'

import RequireAuth from './RequireAuth'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/' element={<RequireAuth><Dashboard/></RequireAuth>}/>
    </>
  )
)

const Router: React.FC = () => {
  return (
    <RouterProvider router={router}/>
  )
} 

export default Router
