import React, { memo } from 'react'

const InputReadOnly = ({ label, value }) => {
   return (
      <div>
         <label htmlFor={label} className='font-medium text-sm text-color_222'>
            {label}
         </label>
         <input value={value ?? ''}
            type="text" readOnly id={label}
            className='border mt-[6px] border-bbb rounded-sm px-2 py-[6px] w-full bg-bg_input outline-none' />
      </div>
   )
}

export default memo(InputReadOnly)