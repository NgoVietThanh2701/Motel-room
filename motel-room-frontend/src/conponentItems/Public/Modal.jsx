import React, { memo, useEffect, useState } from 'react'
import icons from '../../utils/icons'
import { getNumberPrice, getNumberArea }
   from '../../utils/function'
const { GoArrowLeft } = icons

const Modal = ({ setisShowModal, content, name, handleSubmit, queries, arrMinMax, defaultText }) => {

   const [percent1, setPercent1] = useState(name && arrMinMax[`${name}Arr`] ? arrMinMax[`${name}Arr`][0] : 0)

   const [percent2, setPercent2] = useState(name && arrMinMax[`${name}Arr`] ?
      (arrMinMax[`${name}Arr`][0] === 100 ? 100 : arrMinMax[`${name}Arr`][1])
      : 100)
   const [activeEl, setactiveEl] = useState('')

   useEffect(() => {
      const activeTrackEl = document.getElementById('track-acive')
      if (activeTrackEl) {
         let minPercent = percent2 <= percent1 ? percent2 : percent1
         activeTrackEl.style.left = `${minPercent}%`
         let maxPercent = percent2 <= percent1 ? (100 - percent1) : (100 - percent2)
         activeTrackEl.style.right = `${maxPercent}%`
      }
   }, [percent1, percent2])

   const handleClickTrack = (e) => {
      e.stopPropagation()
      const stackEl = document.getElementById('track')
      const stackRect = stackEl.getBoundingClientRect()
      let percent = (e.clientX - stackRect.left) * 100 / stackRect.width
      if (Math.abs(percent - percent1) <= Math.abs(percent - percent2)) {
         setPercent1(percent)
      } else {
         setPercent2(percent)
      }
   }

   const handleActive = (code, value) => {
      setactiveEl(code)
      let arr = name === 'price' ? getNumberPrice(value) : getNumberArea(value)
      if (arr.length === 1) {
         if (arr[0] === 1) {
            setPercent1(0)
            setPercent2(convertTo100(1))
         } else if (arr[0] === 15 || arr[0] === 90) {
            setPercent1(100)
            setPercent2(100)
         } else if (arr[0] === 20) {
            setPercent1(0)
            setPercent2(convertTo100(20))
         }
      } else if (arr.length === 2) {
         setPercent1(convertTo100(arr[0]))
         setPercent2(convertTo100(arr[1]))
      }
   }

   const convert100ToTarget = percent => {
      return name === 'price' ? (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10
         : name === 'area' ? (Math.ceil(Math.round(percent * 0.9) / 5) * 5) : 0
   }

   const convertTo100 = percent => {
      let target = name === 'price' ? 15 : (name === 'area' ? 90 : 1)
      return Math.floor((percent / target) * 100)
   }

   const handleBeforeSubmit = (e) => {
      let arrMinMax = percent1 < percent2
         ? [convert100ToTarget(percent1), convert100ToTarget(percent2)]
         : (percent1 === percent2 ? [convert100ToTarget(percent1), convert100ToTarget(99999)] :
            [convert100ToTarget(percent2), convert100ToTarget(percent1)])
      handleSubmit(e, {
         [`${name}Number`]: arrMinMax,
         [name]: `${percent1 !== percent2 ? ('Từ ' + arrMinMax[0] + ' -> ' + arrMinMax[1]) :
            ('Trên ' + arrMinMax[0])} ${name === 'price' ? ' triệu' : 'm2'}`
      }, {
         [`${name}Arr`]: percent1 === percent2 ? [percent1, 99999] : [percent1, percent2]
      })
   }

   return (
      <div className='fixed z-20 top-0 left-0 right-0 bottom-0 bg-bg_overlay60 flex justify-center items-center'
         onClick={() => setisShowModal(false)}>
         <div className='w-2/5 relative h-[400px] bg-white rounded-md'
            onClick={(e) => {
               e.stopPropagation() /*keep children click*/
               setisShowModal(true)
            }}>
            <div className='h-[50px] px-4 flex items-center border-b border-default'>
               <span>
                  <GoArrowLeft className='hover:text-color_red text-color_333 cursor-pointer'
                     onClick={(e) => {
                        e.stopPropagation()
                        setisShowModal(false)
                     }} size={24} />
               </span>
            </div>
            {(name === 'category' || name === 'province') &&
               <div className='px-5 flex flex-col'>
                  <span className='py-[10px] flex items-center gap-3 border-b border-default'>
                     <input type="radio" id={`${name}Code`} name={name} value={defaultText ?? ''}
                        checked={!queries[`${name}Code`] ? true : false}
                        onChange={(e) => handleSubmit(e, { [name]: defaultText, [`${name}Code`]: null })}
                     />
                     <label className='text-color_222' htmlFor={`${name}Code`}>{defaultText}</label>
                  </span>
                  {content?.map((item, index) => (
                     <span key={index} className='py-[10px] flex items-center gap-3 border-b border-default'>
                        <input type="radio"
                           checked={item?.code === queries[`${name}Code`] ? true : false}
                           id={item.code} name={name} value={item.code}
                           onChange={(e) => handleSubmit(e, { [name]: item.value, [`${name}Code`]: item.code })} />
                        <label className='text-color_222' htmlFor={item.code}>{item.value}</label>
                     </span>
                  ))}
               </div>}
            {(name === 'price' || name === 'area') &&
               <div className='px-12 pt-16 pb-12'>
                  <div className='flex items-center justify-center relative'>
                     <div className='absolute z-30 top-[-50px] font-bold text-lg text-color_blue_2' >
                        {(percent1 === 100 && percent2 === 100) ? `Trên  ${convert100ToTarget(percent1)}` :
                           (`Từ ${percent1 <= percent2 ? convert100ToTarget(percent1) : convert100ToTarget(percent2)} -> 
                        ${percent2 >= percent1 ? convert100ToTarget(percent2) : convert100ToTarget(percent1)}
                        `)} {name === 'price' ? ' triệu' : ' m2'}
                     </div>
                     <div onClick={handleClickTrack} id='track'
                        className='track w-full h-[6px] bg-gray-300 rounded-full
                     absolute top-0 bottom-0'></div>
                     <div onClick={handleClickTrack} id='track-acive'
                        className='track:active h-[6px] bg-bg_blue2 rounded-full
                     absolute top-0 bottom-0'></div>
                     <input className='w-full appearance-none pointer-events-none absolute top-0 bottom-0'
                        max='100' min='0'
                        step='1'
                        type="range"
                        value={percent1}
                        onChange={(e) => {
                           setPercent1(+e.target.value)
                           activeEl && setactiveEl('')
                        }} />
                     <input className='w-full appearance-none pointer-events-none absolute top-0 bottom-0 '
                        max='100' min='0'
                        step='1'
                        type="range"
                        value={percent2}
                        onChange={(e) => {
                           setPercent2(+e.target.value)
                           activeEl && setactiveEl('')
                        }} />
                     <div className='absolute z-30 top-5 left-0 right-0 flex 
                        items-center justify-between ml-2 mr-[-15px]'>
                        <span onClick={(e) => {
                           e.stopPropagation()
                           setPercent1(0)
                        }} className='cursor-pointer'>0</span>
                        <span onClick={(e) => {
                           e.stopPropagation();
                           setPercent2(100)
                        }} className='cursor-pointer'>
                           {name === 'price' ? '15 triệu' : (name === 'area' ? '90m2' : '')}
                        </span>
                     </div>
                  </div>
                  <div className='mt-14'>
                     <h4 className='font-medium text-color_blue_2 mb-3'>Chọn nhanh</h4>
                     <div className='flex gap-2 items-center flex-wrap w-full'>
                        {content?.map(item => (
                           <button key={item.code}
                              onClick={(e) => handleActive(item.code, item.value)}
                              className={`px-3 py-[6px] rounded-md text-sm
                                 ${item.code === activeEl ? 'bg-bg_blue2 text-white' :
                                    'text-color_222 bg-gray-300'}`}>
                              {item.value}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            }
            {(name === 'price' || name === 'area') ?
               <button onClick={handleBeforeSubmit}
                  className='w-full absolute bottom-0 bg-bg_blue2 py-2 text-white font-medium rounded-br-md rounded-bl-md'>
                  ÁP DỤNG
               </button>
               : <div className='mb-3'></div>
            }
         </div>
      </div>
   )
}

export default memo(Modal)