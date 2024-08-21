import React from 'react';
import Header from './common/Header';
import { Outlet } from 'react-router-dom';
import { Contact, Intro, Navigation, Search } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { refreshTokenFunc } from '../../features/authSlice';

const Home = () => {

   const dispatch = useDispatch()

   const { isLoggedIn, token, refresh_token } = useSelector(state => state.auth)
   if (token && token !== 'ul') {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (!decodedToken || !decodedToken.exp) {
         // Không thể giải mã token hoặc không có thông tin về thời gian hết hạn
         return true;
      }
      const expirationTime = decodedToken.exp * 1000; // Đổi từ giây sang mili-giây
      const currentTime = Date.now();
      console.log(expirationTime, currentTime)
      if (currentTime >= expirationTime) {
         dispatch(refreshTokenFunc(refresh_token))
      }
   }

   return (
      <div className='w-full flex flex-col items-center h-full'>
         <Header />
         <Navigation />
         {isLoggedIn && <Search />}
         <div className="w-5/7 mt-[10px] flex flex-col items-center">
            <Outlet />
         </div>
         <Intro />
         <Contact />
         <div className='mb-[200px]'></div>
      </div>
   )
}

export default Home