import React, { memo } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { path } from '../../utils/constant'

const ProvinceBtn = ({ name, image, provinceCode }) => {

   const navigate = useNavigate()

   const handleOnClick = () => {
      const titleSearch = `Cho thuê ${name}, phòng trọ giá rẻ`
      navigate({
         pathname: `/${path.SEARCH}`,
         search: createSearchParams({ provinceCode }).toString(),
      }, { state: { titleSearch } })
   }
   return (
      <div className='bg-white rounded-lg overflow-hidden shadow-md cursor-pointer
      text-blue-700 hover:text-red-500'
         onClick={handleOnClick}>
         <img src={image} alt="" className='w-[190px] h-[110px] object-cover' />
         <div className='font-semibold text-center my-[6px] text-base'>{name}</div>
      </div>
   )
}

export default memo(ProvinceBtn)