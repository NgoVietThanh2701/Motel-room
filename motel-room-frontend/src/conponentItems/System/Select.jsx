import React, { memo } from 'react'

const Select = ({ reset, label, options, value, setValue, type, name }) => {

   return (
      <div className='w-full flex flex-col gap-2'>
         <label htmlFor={type} className='font-semibold text-color_222'>
            {label}
         </label>
         <select
            value={reset ? '' : (value ?? '')} id={type}
            onChange={(e) => !name ? setValue(e.target.value)
               : setValue(prev => ({ ...prev, [name]: e.target.value }))}
            className='outline-none border border-bbb p-[6px] rounded-sm'>
            <option value="">{`-- Chọn ${label}`}</option>
            {options?.map((item, index) => (
               <option className='block p-4'
                  key={index}
                  value={type === 'province' ? item.province_id : (type === 'district' ? item.district_id : item.code)}>
                  {type === 'province' ? item.province_name : (type === 'district' ? item.district_name : item.value)}
               </option>
            ))}
         </select>
      </div>
   )
}

export default memo(Select)