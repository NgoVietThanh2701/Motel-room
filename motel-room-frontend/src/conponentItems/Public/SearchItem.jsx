import React, { memo } from 'react'

const SearchItem = ({ IconBefore, IconAfter, text, fontWeight }) => {

   return (
      <div className='bg-white py-[7px] px-3 text-gray-500
         rounded-md text-[13.5px] flex items-center justify-between'>
         <div className='flex items-center gap-1 w-full'>
            {IconBefore}
            <span className={`${fontWeight && 'font-semibold text-gray-800'} 
               whitespace-nowrap`}>
               {text}
            </span>
         </div>
         {IconAfter}
      </div>
   )
}

export default memo(SearchItem) /*memo prevent render if no change input*/