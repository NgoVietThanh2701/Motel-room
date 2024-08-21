import React from 'react'
import { Select, InputReadOnly, InputFormV2 } from './index'
import { useSelector } from 'react-redux'

const targets = [
   { code: 'Nam', value: 'Nam' },
   { code: 'Nữ', value: 'Nữ' }
]

const Overview = ({ payload, setPayload }) => {

   const { categories } = useSelector(state => state.app)
   const { currentUser } = useSelector(state => state.user)

   return (
      <div className='flex flex-col gap-5 mt-5'>
         <h2 className='text-xl font-medium text-color_222'>
            Thông tin mô tả
         </h2>
         <div className='flex flex-col gap-4'>
            <div className='w-1/2'>
               <Select name='categoryCode' value={payload.categoryCode} setValue={setPayload} options={categories} label='Loại chuyên mục' />
            </div>
            <InputFormV2 name='title' value={payload.title} setValue={setPayload} label='Tiêu đề' />
            <div>
               <label className='font-semibold text-color_222' htmlFor="over-des">Nội dung mô tả</label>
               <textarea type="text" id='over-des' rows="5"
                  className='w-full mt-2 rounded-sm outline-none border border-bbb px-2 py-[6px]'
                  value={payload.description}
                  onChange={(e) => setPayload(prev => ({ ...prev, description: e.target.value }))} />
            </div>
            <div className='w-1/2 flex flex-col gap-4'>
               <InputReadOnly label='Thông tin liên hệ' value={currentUser?.name} />
               <InputReadOnly label='Điện thoại' value={currentUser?.phone} />
               <InputFormV2
                  small='Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000'
                  name='priceNumber'
                  unit='đồng'
                  label='Giá cho thuê'
                  value={payload.priceNumber}
                  setValue={setPayload} />
               <InputFormV2
                  unit='m2'
                  label='Diện tích'
                  name='areaNumber'
                  value={payload.areaNumber}
                  setValue={setPayload} />
               <Select value={payload.target}
                  setValue={setPayload}
                  name='target'
                  options={targets}
                  label='Đối tượng cho thuê' />
            </div>
         </div>
      </div>
   )
}

export default Overview