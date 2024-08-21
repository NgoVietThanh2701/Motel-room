import React, { useEffect } from 'react'
import { SimpleItemPost } from '../../../conponentItems/Public'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsNew } from '../../../features/postSlice'

const RelatedPost = () => {

   const dispatch = useDispatch()
   const { newPosts } = useSelector(state => state.post)

   useEffect(() => {
      dispatch(getPostsNew())
   }, [dispatch])
   return (
      <div className='w-full px-5 py-3 pb-5 bg-white border border-default rounded-lg'>
         <h3 className='mb-4 font-bold text-[17px] text-color_333 opacity-95'>Tin mới đăng</h3>
         <div className='flex flex-col gap-3'>
            {newPosts.length > 0 &&
               newPosts.map((post, index) => (
                  <SimpleItemPost key={index}
                     price={post.attributes?.price}
                     image={JSON.parse(post?.images.image)[0]}
                     createdAt={post.createdAt}
                     title={post.title}
                  />
               ))}
         </div>
      </div>
   )
}

export default RelatedPost