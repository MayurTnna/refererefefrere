import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {
  /* Checking if the user is logged in or not. */
    let users=JSON.parse( localStorage.getItem('Users'))
    let auth = users.some((user)=>user.isLogin === true)
  return (
    <>
{auth ? <Outlet/> : <Navigate to={'/login'}/>}
    </>
  )
}

export default PrivateRoutes