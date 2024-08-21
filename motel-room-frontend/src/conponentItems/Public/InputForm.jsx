import React, { memo } from 'react'

const InputForm = ({ label, value, setValue, keyPayload, invalidFields, setInvalidFields, type }) => {
  return (
    <div>
      <label htmlFor={keyPayload} className='text-xs font-medium text-color_222'>{label}</label>
      <input type={type || 'text'}
        className='outline-none bg-bg_input mt-1 p-2 rounded-sm w-full'
        value={value}
        id={keyPayload}
        onChange={(e) => setValue(pre => ({ ...pre, [keyPayload]: e.target.value }))}
        onFocus={() => setInvalidFields([])}
      />
      {invalidFields.length > 0 && invalidFields.some(i => i.name === keyPayload) &&
        <small className='text-red-700 italic'>
          {invalidFields.find(i => i.name === keyPayload)?.message}
        </small>
      }
    </div>
  )
}

export default memo(InputForm)