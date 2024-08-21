import { Routes, Route } from "react-router-dom";
import React, { useEffect } from 'react';
import { Home, Login, HomePage, Rental, DetailPost, SearchDetail } from './containers/Public'
import { path } from './utils/constant';
import System from './containers/System/System'
import CreatePost from "./containers/System/components/CreatePost";
import { getCurrentUser } from './features/userSlice';
import { useDispatch, useSelector } from "react-redux";
import { getAreas, getPrices, getProvinces } from "./features/appSlice";
import ManagePost from "./containers/System/components/ManagePost";

function App() {

   const dispatch = useDispatch()
   const { isLoggedIn } = useSelector(state => state.auth)
   const { refreshUser } = useSelector(state => state.user)

   useEffect(() => {
      setTimeout(() => {
         isLoggedIn && dispatch(getCurrentUser())
      }, 700);
   }, [isLoggedIn, dispatch, refreshUser])

   useEffect(() => {
      dispatch(getPrices())
      dispatch(getAreas())
      dispatch(getProvinces())
   }, [dispatch])

   return (
      <div className="bg-bg_primary">
         <Routes>
            <Route path={path.HOME} element={<Home />}>
               <Route path="*" element={<HomePage />} />
               <Route path={path.LOGIN} element={<Login />} />
               <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
               <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
               <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
               <Route path={path.NHA_CHO_THUE} element={<Rental />} />
               <Route path={path.SEARCH} element={<SearchDetail />} />
               <Route path={path.DETAIL_POST_TITLE_POSTID} element={<DetailPost />} />
            </Route>
            <Route path={path.SYSTEM} element={<System />}>
               <Route path={path.CREATE_POST} element={<CreatePost />} />
               <Route path={path.MANAGE_POST} element={<ManagePost />} />
            </Route>
         </Routes>
      </div>
   );
}

export default App;
