import React, { memo } from 'react'

const InputFormV2 = ({ label, value, setValue, name, unit, small }) => {
   return (
      <div>
         <label className='font-semibold text-color_222' htmlFor={name}>{label}</label>
         <div className='flex items-center'>
            <input name={name} type={name === 'title' ? 'text' : 'number'} id={name} value={value ?? ''}
               onChange={(e) => setValue(prev => ({ ...prev, [name]: e.target.value }))}
               className='flex-auto rounded-sm outline-none border border-bbb px-2 py-[6px]' />
            {unit && <span className='p-[6px] rounded-tr-sm rounded-br-sm border-b border-r border-t
            border-bbb w-14 bg-bg_input flex items-center justify-center'>{unit}</span>}
         </div>
         {small && <small className='text-color_666'>{small}</small>}
      </div>
   )
}

export default memo(InputFormV2)