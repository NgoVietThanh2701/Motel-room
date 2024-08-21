import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { convertStringtoURL } from '../../../utils/function'
import { getCategories } from '../../../features/appSlice'
import { useDispatch, useSelector } from 'react-redux'

const Navigation = ({ isSystem }) => {

   const dispatch = useDispatch();
   const { categories } = useSelector(state => state.app)

   useEffect(() => {
      dispatch(getCategories())
   }, [dispatch])

   return (
      <div className={`w-full ${isSystem ? 'h-full' : 'h-[40px]'} flex items-center bg-bg_blue1 text-white ${!isSystem && 'justify-center'}`}>
         <div className='w-5/7 h-full flex items-center text-sm font-medium'>
            <NavLink
               to='/'
               className={({ isActive }) => `px-3 h-full flex items-center hover:bg-bg_red ${isActive && 'bg-bg_red'}`}>
               Trang chủ
            </NavLink>
            {categories?.length > 0 &&
               categories.map((item, index) => (
                  <NavLink
                     to={`/${convertStringtoURL(item.value)}`}
                     key={index}
                     className={({ isActive }) => `px-3 h-full text-13 leading-[18px] flex items-center hover:bg-bg_red ${isActive && 'bg-bg_red'}`}>
                     {item.value}
                  </NavLink>
               ))}
         </div>
      </div>
   )
}

export default Navigation