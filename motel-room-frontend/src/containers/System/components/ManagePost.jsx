import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsLimitAdmin } from '../../../features/postSlice'
import moment from 'moment'
import { Button } from '../../../conponentItems/Public'
import { apiDeletePostsLimitAdmin } from '../../../services/postService'
import Swal from 'sweetalert2'

export const formatDate = 'DD/MM/YYYY'

const ManagePost = () => {

   const dispatch = useDispatch()
   const { postsOfCurrentUser } = useSelector(state => state.post)
   const [updateDate, setUpdateData] = useState(false)
   useEffect(() => {
      dispatch(getPostsLimitAdmin())
   }, [dispatch, updateDate])

   const checkStatus = (dataString) => {
      return moment(dataString.formatDate).isSameOrAfter(new Date().toDateString())
   }

   const handleDeletePost = async (postId) => {
      const response = await apiDeletePostsLimitAdmin(postId)
      if (!response.data.err) {
         setUpdateData(!updateDate)
      } else {
         Swal.fire('Opps!', 'Xóa tin đăng thất bại', 'error')
      }
   }

   return (
      <div>
         <div className=' py-4 border-b border-default flex items-center justify-between'>
            <h1 className='text-3xl font-medium text-color_222'>
               Quản lý tin đăng
            </h1>
            <select className='outline-none p-2 border border-bbb rounded-md' name="">
               <option value="">Lọc theo trạng thái</option>
            </select>
         </div>
         <table className='w-full table-auto mt-5'>
            <thead>
               <tr className='text-[#444]'>
                  <th className='border p-2'>Mã tin</th>
                  <th className='border p-2'>Ảnh</th>
                  <th className='border p-2'>Tiêu đề</th>
                  <th className='border p-2'>Giá</th>
                  <th className='border p-2'>Ngày bắt đầu</th>
                  <th className='border p-2'>Ngày hết hạn</th>
                  <th className='border p-2'>Trạng thái</th>
                  <th className='border p-2'>Tùy chọn</th>
               </tr>
            </thead>
            <tbody>
               {postsOfCurrentUser ?
                  postsOfCurrentUser?.map((post, index) => (
                     <tr key={index} className='border p-2'>
                        <td className='border p-2 text-center'>{post.overviews?.code}</td>
                        <td className='border p-1 flex flex-col items-center justify-center'>
                           <img className='w-12 h-12 rounded-sm object-cover' src={JSON.parse(post.images.image)[0]} alt="" />
                        </td>
                        <td className='border p-2'>{post.title}</td>
                        <td className='border p-2'>{post.attributes?.price}</td>
                        <td className='border p-2'>{post.overviews?.created}</td>
                        <td className='border p-2'>{post.overviews?.expired}</td>
                        <td className='border p-2'>
                           {checkStatus(post?.overviews?.expired?.split(' ')[3]) ?
                              'Đang hoạt động' : 'Đã hết hạn'}
                        </td>
                        <td className='text-center'>
                           <div className='flex items-center justify-center'>
                              <Button onClick={() => handleDeletePost(post.id)} text='Xóa' bgColor='bg-red-500' textColor='text-white' />
                           </div>
                        </td>
                     </tr>
                  )) :
                  <tr>
                     Bạn chưa có tin nào, Đăng ngay
                  </tr>
               }
            </tbody>
         </table>
      </div>
   )
}

export default ManagePost