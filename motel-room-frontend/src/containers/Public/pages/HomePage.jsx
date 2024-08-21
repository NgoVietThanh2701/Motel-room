import React from 'react'
import { infoMotel } from '../../../utils/constant'
import { Province, ListPost, Pagination, RelatedPost } from '../index'
import { ItemSidebar } from '../../../conponentItems/Public'
import { useSelector } from 'react-redux'

const HomePage = () => {

   const { categories, prices, areas } = useSelector(state => state.app)

   return (
      <div className='flex flex-col'>
         <div>
            <h1 className='text-[28px] leading-normal font-bold text-color_333'>{infoMotel.HOME_TITLE}</h1>
            <p className='text-sm text-color_gary_1'>{infoMotel.HOME_DESCRIPTION}</p>
         </div>
         <Province />
         <div className='flex gap-3 mt-3'>
            <div className='w-[67%]'>
               <ListPost />
               <Pagination />
            </div>
            <div className='w-[33%] flex flex-col gap-4 items-center'>
               <ItemSidebar content={categories} title='Danh mục cho thuê' />
               <ItemSidebar type='priceCode' isDouble content={prices} title='Xem theo giá' />
               <ItemSidebar type='areaCode' isDouble content={areas} title='Xem theo diện tích' />
               <RelatedPost />
            </div>
         </div>
      </div>
   )
}

export default HomePage