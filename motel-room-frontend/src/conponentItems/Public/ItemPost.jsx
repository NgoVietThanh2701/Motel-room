import React, { memo, useState } from 'react'
import icons from '../../utils/icons'
import avatarDefault from '../../assets/avatar-default.jpeg'
import { Link } from 'react-router-dom'
import { convertStringtoURL } from '../../utils/function'

const { BsHeart, BsHeartFill, FaStar } = icons

const Item = ({ user, title, star, description, attributes, address, image, countImage, id }) => {

   const [isClicked, setIsClicked] = useState(false)

   return (
      <div className='px-4 py-2 flex gap-2 border-t border-orange-600'>
         <Link
            to={`chi-tiet/${convertStringtoURL(title)}/${id}`}
            className='w-2/5 h-[240px] py-2 relative cursor-pointer'>
            <img src={image} alt="" className='w-full h-full object-cover' />
            <span className='bg-bg_overlay60 absolute left-2 bottom-4 text-white px-1 text-[14px] rounded-sm'>
               {countImage} ảnh
            </span>
            <button
               onClick={() => setIsClicked(!isClicked)}
               className='absolute right-4 bottom-4 text-white'>
               {isClicked ? <BsHeartFill size={20} color='#E13427' /> : <BsHeart size={20} />}
            </button>
         </Link>
         <div className='w-3/5 pl-2'>
            <div className='line-clamp-2'>
               {Array.from({ length: star }, (value, index) => (
                  <FaStar key={index} size={13.8} className='inline-block mb-[3px]' color='#e6e600' />
               ))}
               <h3 className='inline pl-[6px] text-color_red font-bold text-[15px]'>
                  {title}
               </h3>
            </div>
            <span className='mt-2 line-clamp-1 text-color_666 font-medium text-sm'>
               {address.split(':')[1]}
            </span>
            <div className='mt-2 flex items-center justify-between'>
               <span className='font-bold text-[16px] text-color_green'>{attributes?.price}</span>
               <span className='text-color_666 font-medium text-[15px]'>{attributes?.acreage}</span>
               <span className='text-gray_3 text-sm'>{attributes?.published}</span>
            </div>
            <p className='mt-2 text-gray_2 text-[15px] line-clamp-3'>
               {description}
            </p>
            <div className='flex items-center mt-3 justify-between'>
               <div className='flex items-center gap-2'>
                  <img className='w-[27px] h-[27px] object-cover rounded-full' src={avatarDefault} alt="" />
                  <p className='text-gray_2 text-sm font-medium'>{user.name}</p>
               </div>
               <div className='flex items-center gap-1'>
                  <a type='button' className='text-white text-sm bg-bg_blue1 
                     rounded-[5px] px-[7px] py-[2px]'
                     href='/'>
                     Gọi {user?.phone}
                  </a>
                  <a type='button' className='border text-sm text-blue-900 border-blue-900 
                     rounded-[5px] px-[7px] py-[2px]'
                     href={`https://zalo.me/${user.zalo}`}
                     target='_blank'>
                     Nhắn Zalo
                  </a>
               </div>
            </div>
         </div>
      </div>
   )
}

export default memo(Item)