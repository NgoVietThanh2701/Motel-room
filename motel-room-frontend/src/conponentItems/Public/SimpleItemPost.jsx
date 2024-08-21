import React, { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'

const SimpleItemPost = ({ title, price, image, createdAt }) => {

   const formatTime = (createdAt) => {
      moment.locale('vi');
      return moment(createdAt).fromNow()
   }

   return (
      <div className='border-b pb-3 border-default flex items-center gap-3'>
         <img alt="" className='w-[65px] h-[65px] flex-none object-cover rounded-sm'
            src={image} />
         <div className='h-[65px] flex-auto flex flex-col justify-between'>
            <h4 className='text-[#055699] text-sm line-clamp-2'>
               {`${title?.slice(0, 57)}...`}
            </h4>
            <div className='flex items-center justify-between'>
               <span className='font-medium text-sm text-color_green'>{price}</span>
               <span className='text-13 text-gray_2'>
                  {formatTime(createdAt)}
                  { }
               </span>
            </div>
         </div>
      </div>
   )
}

export default memo(SimpleItemPost)