import React from 'react'
import { Navigation } from '../../Public'

const Header = () => {
   return (
      <div className='w-full flex min-h-[48px] h-[48px]'>
         <div className='bg-bg_blue1 flex items-center justify-center text-white
            text-lg font-bold w-[256px] h-full'>
            Phongtro123.com
         </div>
         <div className='flex-auto text-start'>
            <Navigation isSystem={true} />
         </div>
      </div>
   )
}

export default Header