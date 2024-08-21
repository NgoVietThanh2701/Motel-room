import React from 'react'
import { contactMotel } from '../../../utils/constant'
import { Button } from '../../../conponentItems/Public'

const Contact = () => {
   return (
      <div className='w-5/7 mt-7 bg-white border rounded-lg
      border-default py-8 px-20 flex flex-col items-center'>
         <img className='h-52 object-contain' src={contactMotel.image} alt="" />
         <p className='py-7 text-color_222 font-medium'>{contactMotel.title}</p>
         <div className='mb-5 flex items-center justify-around w-full'>
            {contactMotel.contact.map((item, index) => (
               <div key={index} className='flex flex-col items-center justify-center font-bold'>
                  <span className='text-color_red text-sm mb-2'>{item.text}</span>
                  <span className='text-color_blue_2 text-lg'>{item.phone}</span>
                  <span className='text-color_blue_2 text-lg'>{item.zalo}</span>
               </div>
            ))}
         </div>
         <Button text='Gửi liên hệ'
            bgColor='bg-bg_blue2'
            textColor='text-white'
            px='px-6' />
      </div>
   )
}

export default Contact