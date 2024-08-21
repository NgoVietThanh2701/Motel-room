import React, { memo } from 'react';

const Button = ({ text, bgColor = 'bg-bg_primary', font = 'font-normal', textColor = 'text-color_222', fontSize = 16, onClick, IcBefore, IcAfter, fullWidth, px = 'px-[10px]' }) => {
   return (
      <button className={`py-2 ${px} ${bgColor} ${textColor} ${font}
       outline-none rounded-[5px] hover:underline flex items-center justify-center gap-[3px]
         ${fullWidth ? 'w-full' : ''}`}
         onClick={onClick}
      >
         {IcBefore && <IcBefore size={18} />}
         <span className={`${fontSize}`}>{text}</span>
         {IcAfter && <IcAfter size={18} className='mt-[2px]' />}
      </button>
   )
}

export default memo(Button)