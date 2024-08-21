import React from 'react'
import { ProvinceBtn } from '../../../conponentItems/Public'
import { localtionCity } from '../../../utils/constant'

const Province = () => {
   return (
      <div className='flex items-center justify-center gap-5 my-4'>
         {
            localtionCity?.length > 0 && localtionCity.map((item, index) => (
               <ProvinceBtn
                  key={index}
                  name={item.name}
                  image={item.image}
                  provinceCode={item.provinceCode} />
            ))
         }
      </div>
   )
}

export default Province