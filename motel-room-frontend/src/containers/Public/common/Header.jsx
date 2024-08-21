import React, { useCallback, useEffect, useRef, useState } from 'react';
import logo from '../../../assets/logo.png';
import { Button, User } from '../../../conponentItems/Public'
import icons from '../../../utils/icons.js'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { path } from '../../../utils/constant.js'
import { useDispatch, useSelector } from 'react-redux';
import { resetAuth } from '../../../features/authSlice';
import { resetCurrentUser } from '../../../features/userSlice'
import { menuManager } from '../../../utils/constant'

const { PiPlusCircle, CiLogout, RxDashboard } = icons

const Header = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch()
   const headerRef = useRef()
   const [searchParams] = useSearchParams()
   let page = searchParams.get('page')
   const { isLoggedIn, refresh_token, refresh_expired } = useSelector(state => state.auth)
   const { currentUser, refreshUser } = useSelector(state => state.user)
   const [isShowMenu, setIsShowMenu] = useState(false)

   /* */
   const goLogin = useCallback((flag) => {
      navigate(path.LOGIN, { state: { flag } })
   }, [navigate])

   const goLogout = useCallback(() => {
      dispatch(resetAuth())
      dispatch(resetCurrentUser())
   }, [dispatch])

   useEffect(() => {
      if (refresh_expired) {
         goLogout()
      }
   }, [refresh_expired])

   // useEffect(() => {
   //    if (refreshUser) {
   //       dispatch(refreshToken(refresh_token))
   //    }
   // }, [refreshUser, dispatch, refresh_token])

   /* move view to start component */
   useEffect(() => {
      headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
   }, [page])


   return (
      <div ref={headerRef} className='w-5/7 flex items-center justify-between'>
         <Link to={'/'}>
            <img src={logo} alt='logo' className='w-[240px] h-[70px] object-contain' />
         </Link>
         <div>
            {!isLoggedIn ?
               <div className='flex items-center gap-2'>
                  <small>Phongtro123.com xin chào!</small>
                  <Button text='Đăng nhập'
                     textColor='text-white'
                     bgColor='bg-bg_blue2'
                     fontSize={'text-[15px]'}
                     onClick={() => goLogin(false)}
                  />
                  <Button text='Đăng ký'
                     textColor='text-white'
                     bgColor='bg-bg_blue2'
                     fontSize={'text-[15px]'}
                     onClick={() => goLogin(true)}
                  />
                  <Button text='Đăng tin mới'
                     textColor='text-white'
                     bgColor='bg-bg_red'
                     fontSize={'text-[15px]'}
                     IcAfter={PiPlusCircle}
                  />
               </div> :
               <div className='flex items-center gap-2'>
                  {currentUser && <User />}
                  <div className='relative'>
                     <Button text='Quản lý tài khoản'
                        IcBefore={RxDashboard}
                        textColor='text-color_333'
                        fontSize={'text-[15px]'}
                        onClick={() => setIsShowMenu(prev => !prev)}
                     />
                     {isShowMenu &&
                        <div className='absolute min-w-200 top-full left-0 bg-white shadow-md rounded-md
                           flex flex-col px-4 py-3 text-color_blue'>
                           {menuManager?.map(item => (
                              <Link className='flex items-center gap-2 border-b py-[10px]
                               border-default hover:text-color_red'
                                 key={item.id} to={item.path}>
                                 {item?.icon}
                                 {item.text}
                              </Link>
                           ))}
                           <span className='flex items-center gap-2 pt-2 cursor-pointer hover:text-color_red'
                              onClick={() => {
                                 goLogout();
                                 setIsShowMenu(false)
                              }}>
                              <CiLogout />
                              Đăng xuất
                           </span>
                        </div>}
                  </div>
                  <Button text='Đăng tin mới'
                     fontSize={'text-[15px]'}
                     textColor='text-white'
                     bgColor='bg-bg_red'
                     IcAfter={PiPlusCircle}
                  />
               </div>
            }
         </div>
      </div>
   )
}

export default Header