import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '../../utils/constant'
import Header from './common/Header'
import SideBar from './common/SideBar'

const System = () => {

   const { isLoggedIn } = useSelector(state => state.auth)

   if (!isLoggedIn) {
      return <Navigate to={`/${path.LOGIN}`} replace={true} />
   }

   return (
      <div className='w-full h-screen overflow-hidden flex flex-col items-center'>
         <Header />
         <div className='flex h-full w-full flex-auto'>
            <SideBar />
            <div className='flex-auto h-full bg-white p-4 overflow-y-scroll'>
               <Outlet />
            </div>
         </div>
      </div>
   )
}

export default System