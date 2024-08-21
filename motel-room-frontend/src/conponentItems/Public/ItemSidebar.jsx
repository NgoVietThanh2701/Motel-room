import React, { memo } from 'react'
import icons from '../../utils/icons'
import { convertStringtoURL } from '../../utils/function'
import { Link, createSearchParams, useLocation, useNavigate } from 'react-router-dom'

const { BsChevronRight } = icons
const styleItem = `py-1 flex gap-2 items-center cursor-pointer 
hover:text-color_red border-b border-gray-200 border-dashed`

const ItemSidebar = ({ title, content, isDouble, type }) => {

   const localtion = useLocation()
   const navigate = useNavigate()

   const handleFilterPost = (code) => {
      navigate({
         pathname: localtion.pathname,
         search: createSearchParams({
            [type]: code
         }).toString()
      })
   }

   return (
      <div className='px-5 py-3 pb-5 bg-white border border-default rounded-lg w-full'>
         <h3 className='font-bold text-[17px] text-color_333 opacicty-95'>{title}</h3>
         {!isDouble &&
            <div className='mt-3 flex flex-col gap-1'>
               {content?.length > 0 &&
                  content.map(item => (
                     <Link to={convertStringtoURL(item.value)} key={item.code} className={styleItem}>
                        <BsChevronRight size={10} className='text-gray_2' />
                        <p className='text-color_222 text-[15px] hover:text-color_red'>
                           {item.value}
                        </p>
                     </Link>
                  ))}
            </div>}
         {isDouble &&
            <div className='mt-3 flex flex-col gap-1'>
               {content?.length > 0 &&
                  content.map((__, index) => {
                     if (index % 2 === 0) {
                        return (
                           <div key={index} className='flex items-center'>
                              <div onClick={() => handleFilterPost(content[index]?.code)}
                                 className={`flex-1 ${styleItem}`}>
                                 <BsChevronRight size={10} className='text-gray_2' />
                                 <p className='text-color_222 text-[15px] hover:text-color_red'>{content[index]?.value}</p>
                              </div>
                              {content[index + 1] &&
                                 <div onClick={() => handleFilterPost(content[index + 1]?.code)}
                                    className={`flex-1 ${styleItem}`}>
                                    <BsChevronRight size={10} className='text-gray_2' />
                                    <p className='text-color_222 text-[15px] hover:text-color_red'>{content[index + 1]?.value}</p>
                                 </div>}
                           </div>
                        )
                     }
                     return null
                  }
                  )}
            </div>}
      </div>
   )
}

export default memo(ItemSidebar)