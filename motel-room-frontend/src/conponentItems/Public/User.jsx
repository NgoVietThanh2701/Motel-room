import React from 'react'
import { useSelector } from 'react-redux'
import avatar from '../../assets/avatar-default.jpeg'

const User = () => {

   const { currentUser } = useSelector(state => state.user)

   return (
      <div className='flex items-center gap-2 text-color_333'>
         <img src={avatar} className='w-10 h-10 object-cover rounded-full border border-default' alt="img" />
         <div className='flex flex-col'>
            <span className='text-sm'>Xin chào,
               <span className='font-medium text-base'>
                  {currentUser.name ? ' ' + currentUser?.name : '...'}
               </span>
            </span>
            <span className='text-sm'>
               Mã tài khoản:
               <span className='font-medium'>
                  {currentUser.id ? ' ' + currentUser?.id?.slice(0, 8) : '...'}
               </span>
            </span>
         </div>
      </div>
   )
}

export default User