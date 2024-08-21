import React from 'react'
import anonAvatar from '../../../assets/avatar-default.jpeg'
import { useSelector } from 'react-redux'
import { menuSidebar } from '../../../utils/constant'
import { NavLink } from 'react-router-dom'
import icons from '../../../utils/icons'
import { resetAuth } from '../../../features/authSlice'
import { resetCurrentUser } from '../../../features/userSlice'
import { useDispatch } from 'react-redux'

/* use NavLink to keep state click*/

const activeStyle = `border-b border-dashed border-default mb-1 flex items-center rounded-sm px-1 text-color_222 py-2 gap-2 font-semibold hover:text-color_111`
const notActiveStyle = `border-b border-dashed border-default mb-1 flex items-center rounded-sm px-1 text-color_111 py-2 hover:bg-gray-200 gap-2`

const SideBar = () => {

   const { CiLogout } = icons
   const { currentUser } = useSelector(state => state.user)
   const dispatch = useDispatch()

   const goLogout = () => {
      dispatch(resetAuth())
      dispatch(resetCurrentUser())
   }

   return (
      <div className='w-[256px] min-w-[256px] p-4 flex flex-col gap-3'>
         <div>
            <div className='flex items-center gap-3'>
               <img src={anonAvatar} className='w-12 h-12 border border-default object-cover rounded-full' alt="" />
               <div className='flex flex-col justify-center'>
                  <span className='font-bold text-color_111'>{`${currentUser?.name}`}</span>
                  <small className='text-sm text-color_333'>{currentUser?.phone}</small>
               </div>
            </div>
            <div className='mt-2 text-color-111'>
               Mã thành viên:
               <span className='font-semibold text-color-333'>
                  {` ${currentUser?.id?.match(/\d+/g).join('').slice(0, 6)}`}
               </span>
            </div>
            <div className='mt-1 text-color-111'>
               TK chính:
               <span className='font-semibold text-color-333'> 0đ</span>
            </div>
         </div>
         <div>
            {menuSidebar?.map(item => (
               <NavLink className={({ isActive }) => isActive ? activeStyle : notActiveStyle}
                  key={item.id} to={item.path}>
                  {item?.icon}
                  {item.text}
               </NavLink>
            ))}
            <span className='flex items-center gap-2 pt-1 px-1 cursor-pointer hover:text-color_red'
               onClick={goLogout}>
               <CiLogout />
               Đăng xuất
            </span>
         </div>
      </div>
   )
}

export default SideBar