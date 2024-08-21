import React from 'react'
import { ListPost, Pagination, RelatedPost } from '../index'
import { useSelector } from 'react-redux'
import { ItemSidebar } from '../../../conponentItems/Public'
import { useLocation } from 'react-router-dom'
const SearchDetail = () => {

   const { prices, areas } = useSelector(state => state.app)
   const localtion = useLocation()

   return (
      <div className='flex flex-col'>
         <div className='mt-1 mb-3'>
            <h1 className='text-[28px] leading-normal font-bold text-color_333'>
               {localtion.state?.titleSearch ?? 'Kết quả tìm kiếm'}
            </h1>
            <p className='text-sm text-color_gary_1 mt-1'>
               {localtion.state?.titleSearch ?? ''} phòng mới xây, chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.
            </p>
         </div>
         <div className='flex gap-3 mt-3'>
            <div className='w-[67%]'>
               <ListPost />
               <Pagination />
            </div>
            <div className='w-[33%] flex flex-col gap-4 items-center'>
               <ItemSidebar type='priceCode' isDouble content={prices} title='Xem theo giá' />
               <ItemSidebar type='areaCode' isDouble content={areas} title='Xem theo diện tích' />
               <RelatedPost />
            </div>
         </div>
      </div>
   )
}

export default SearchDetail