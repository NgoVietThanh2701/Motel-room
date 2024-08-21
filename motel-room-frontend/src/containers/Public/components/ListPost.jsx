import React, { useEffect, useState } from 'react'
import { ItemPost } from '../../../conponentItems/Public'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsLimit } from '../../../features/postSlice'
import { useSearchParams } from 'react-router-dom'

const ListPost = ({ categoryCode }) => {

   const [searchParams] = useSearchParams()
   const dispatch = useDispatch()
   const { posts, count } = useSelector(state => state.post)
   const [sort, setSort] = useState(false)

   useEffect(() => {
      let params = []
      for (let entry of searchParams.entries()) {
         params.push(entry)
      }
      let searchParamsObj = {}
      params?.forEach(i => {
         if (Object.keys(searchParamsObj)?.some(item => item === i[0])) {
            searchParamsObj[i[0]] = [...searchParamsObj[i[0]], i[1]]
         } else {
            searchParamsObj = { ...searchParamsObj, [i[0]]: [i[1]] }
         }
      })
      if (categoryCode) {
         searchParamsObj.categoryCode = categoryCode
      }
      dispatch(getPostsLimit(searchParamsObj))
   }, [dispatch, searchParams, categoryCode])

   return (
      <div className='rounded-lg border border-default py-3 bg-white flex flex-col gap-3'>
         <h4 className='text-[22px] px-4 font-bold text-color_333 opacity-95'>
            {count} tin cho thuê tại Phongtro123.com
         </h4>
         <div className='px-4 flex items-center gap-[5px]'>
            <span className='text-[14px] mr-3'>Sắp xếp:</span>
            <span className={`text-sm p-2 rounded-md cursor-pointer hover:text-color_red
             hover:underline bg-gray-200 ${!sort && 'underline text-color_red'} `}>Mặc định</span>
            <span className={`text-sm p-2 rounded-md cursor-pointer hover:text-color_red
             hover:underline bg-gray-200 ${sort && 'underline'}`}>Mới nhất</span>
         </div>
         <div className='items'>
            {posts?.length > 0 && posts.map((item, index) => (
               <ItemPost
                  key={index}
                  address={item?.address}
                  attributes={item?.attributes}
                  description={JSON.parse(item?.description)}
                  image={JSON.parse(item?.images.image)[0]}
                  star={item?.star}
                  title={item?.title}
                  user={item?.user}
                  countImage={JSON.parse(item?.images.image).length}
                  id={item?.id}
               />
            ))}
         </div>
      </div>
   )
}

export default ListPost