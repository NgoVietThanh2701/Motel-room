import React from 'react'
import { introMotel } from '../../../utils/constant'
import icons from '../../../utils/icons'
import { Button } from '../../../conponentItems/Public'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { convertStringtoURL } from '../../../utils/function'

const { FaStar } = icons

const Intro = () => {

   const { categories } = useSelector(state => state.app)
   return (
      <div className='w-5/7 px-[80px] pt-9 pb-14 mt-5 bg-white rounded-lg 
      shadow-sm p-4 border border-default flex flex-col items-center gap-[10px]'>
         <h3 className='text-color_222 text-lg font-semibold'>
            {introMotel.title}
         </h3>
         <p className='text-color_111 text-sm text-center'>
            {introMotel.description}
            <span>
               {categories.length > 0 && categories?.map((cate, index) => (
                  <Link to={convertStringtoURL(cate.value)}
                     key={index}
                     className='text-color_blue font-bold text-sm hover:text-color_red'>
                     {` ${cate.value.toLowerCase()},`}
                  </Link>
               ))}
            </span>
            {introMotel.description_sub}
         </p>
         <div className='w-full flex items-center justify-evenly'>
            {introMotel.statistical.map((item, index) => (
               <div key={index} className='flex flex-col items-center'>
                  <h4 className='text-color_333 font-bold text-xl'>{item.value}</h4>
                  <p className='text-color_222 text-sm'>{item.name}</p>
               </div>
            ))}
         </div>
         <h3 className='mt-4 text-color_222 text-lg font-semibold'>{introMotel.price}</h3>
         <div className='flex items-center'>
            {[1, 2, 3, 4, 5].map(item => (
               <span key={item}>
                  <FaStar size={22} color='#e6e600' />
               </span>
            ))}
         </div>
         <p className='text-color_111 italic text-sm text-center'>
            {introMotel.feelback}
         </p>
         <span className='text-color_111 text-sm'>{introMotel.auth}</span>
         <h3 className='mt-3 text-color_222 text-lg font-semibold'>{introMotel.question}</h3>
         <p className='text-color_333 text-sm mb-2'>{introMotel.answer}</p>
         <Button text='Đăng tin ngay'
            bgColor='bg-bg_red'
            textColor='text-white'
            px='px-6' />
      </div>
   )
}

export default Intro