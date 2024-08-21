import React, { useState } from 'react'
import { Overview, Address } from '../../../conponentItems/System/index'
import icons from '../../../utils/icons'
import Loading from '../../../conponentItems/Loading'
import { Button } from '../../../conponentItems/Public'
import { getCodePrice, getCodeArea } from '../../../utils/function'
import { useSelector } from 'react-redux'
import { apiCreatePost } from '../../../services/postService'
import Swal from 'sweetalert2'

const CreatePost = () => {

   const { BsCamera, CiSquareRemove } = icons

   const [payload, setPayload] = useState({
      categoryCode: '',
      title: '',
      priceNumber: 0,
      areaNumber: 0,
      address: '',
      priceCode: '',
      areaCode: '',
      description: '',
      target: '',
      province: ''
   })
   const [previews, setPreviews] = useState([])
   const [files, setFiles] = useState([])
   const [isLoading, setIsLoading] = useState(false)
   const { prices, areas, categories } = useSelector(state => state.app)
   const { currentUser } = useSelector(state => state.user)

   /* handle show image when choose */
   const handlePreview = (e) => {
      const selectedFile = []
      const files = e.target.files;
      setFiles(prev => [...prev, ...files])
      for (let file of files) {
         selectedFile.push(URL.createObjectURL(file))
      }
      setPreviews(prev => [...prev, ...selectedFile])
   }

   /* */
   const handleDeleteImage = (id) => {
      setPreviews(previews.filter((__, index) => index !== id))
      setFiles(files?.filter((__, index) => index !== id))
   }

   /* handle submit for post */
   const handleSubmit = async () => {
      let priceCode = getCodePrice(+payload.priceNumber / (10 ** 6), prices, 1, 15)[0]?.code
      let areaCode = getCodeArea(+payload.areaNumber, areas, 0, 90)[0]?.code
      let finalPayload = {
         ...payload,
         priceCode,
         areaCode,
         userId: currentUser?.id,
         priceNumber: payload.priceNumber / (10 ** 6),
         target: payload.target ?? 'Tất cả',
         label: `${categories?.find(item => item.code === payload.categoryCode)?.value} ${payload.address.split(',')[0]}`,
      }
      const formData = new FormData()
      Object.entries(finalPayload).forEach(([key, value]) => {
         formData.append(key, value);
      });
      Array.from(files).forEach(file => {
         formData.append('images', file)
      });
      const response = await apiCreatePost(formData)
      setIsLoading(false)
      if (!response.data.err) {
         Swal.fire('Thành công', 'Đã thêm bài đăng mới', 'success').then(() => {
            setPayload({
               categoryCode: '',
               title: '',
               priceNumber: 0,
               areaNumber: 0,
               address: '',
               priceCode: '',
               areaCode: '',
               description: '',
               target: '',
               province: ''
            })
            setFiles([])
            setPreviews([])
         })
      } else {
         Swal.fire('Opps!', 'Có lỗi xảy ra!', 'error')
      }

   }

   return (
      <div className='px-6'>
         <h1 className='text-3xl font-medium text-color_222 py-4 border-b border-default'>
            Đăng tin mới
         </h1>
         <p className='text-sm text-[#721c24] bg-[#f8d7da] p-3 my-3 rounded-sm'>
            Nếu bạn đã từng đăng tin trên Phongtro123.com, hãy sử dụng chức năng ĐẨY TIN / GIA HẠN / NÂNG CẤP VIP
            trong mục QUẢN LÝ TIN ĐĂNG để làm mới, đẩy tin lên cao thay vì đăng tin mới. Tin đăng trùng nhau sẽ không được duyệt.
         </p>
         <div className='flex gap-8'>
            <div className='flex-auto py-4 mb-[100px]'>
               <Address setPayload={setPayload} />
               <Overview payload={payload} setPayload={setPayload} />
               <div className='my-8'>
                  <h2 className='text-xl font-medium text-color_222'> Hình ảnh</h2>
                  <small className='mt-1 block text-sm'>Cập nhập hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
                  <div className=''>
                     <label className='my-4 w-full flex border border-dashed border-bbb h-[200px]
                     rounded-md items-center justify-center flex-col text-color_222' htmlFor="file">
                        <BsCamera className='text-color_blue_2' size={50} />
                        Thêm ảnh
                     </label>
                     <input
                        onChange={(e) => handlePreview(e)} hidden
                        type="file" id='file' multiple />
                     <div className='flex flex-wrap gap-3 items-center'>
                        {previews?.map((item, index) => (
                           <div key={item} className='relative w-[165px] h-[165px]'>
                              <img key={index} src={item} alt="" className='w-full h-full object-cover rounded-sm' />
                              <span title='Xóa'
                                 onClick={() => handleDeleteImage(index)}
                                 className='absolute text-[#444] bg-gray-200 hover:text-color_red top-[-2px] right-[-2px] cursor-pointer'>
                                 <CiSquareRemove size={34} />
                              </span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
               {!isLoading ?
                  <Button
                     onClick={handleSubmit}
                     fullWidth text='Đăng bài'
                     fontSize='text-lg' font='font-semibold'
                     bgColor='bg-bg_green'
                     textColor='text-white' /> :
                  <Loading />}
            </div>
            <div className='w-[30%] min-w-[30%]'>

            </div>
         </div>
      </div>
   )
}

export default CreatePost