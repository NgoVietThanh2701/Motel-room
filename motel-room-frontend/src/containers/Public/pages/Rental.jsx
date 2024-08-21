import React, { useEffect, useState } from 'react'
import { Province, ListPost, Pagination, RelatedPost } from '../index'
import { useSelector } from 'react-redux'
import { ItemSidebar } from '../../../conponentItems/Public'
import { useLocation } from 'react-router-dom'
import { convertStringtoURL } from '../../../utils/function'

const Rental = () => {

   const { prices, areas, categories } = useSelector(state => state.app)
   const [categoryCode, setCategoryCode] = useState('none')
   const [categoryCurrent, setCategoryCurrent] = useState({})
   const localtion = useLocation()

   useEffect(() => {
      const category = categories?.find(item => `/${convertStringtoURL(item.value)}` === localtion.pathname)
      setCategoryCurrent(category)
      if (category) {
         setCategoryCode(category.code)
      }
   }, [localtion, categories])

   return (
      <div className='flex flex-col'>
         <div>
            <h1 className='text-[28px] leading-normal font-bold text-color_333'>
               {categoryCurrent?.header}
            </h1>
            <p className='text-sm text-color_gary_1'>
               {categoryCurrent?.subheader}
            </p>
         </div>
         <Province />
         <div className='flex gap-3 mt-3'>
            <div className='w-[67%]'>
               <ListPost categoryCode={categoryCode} />
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

export default Rental