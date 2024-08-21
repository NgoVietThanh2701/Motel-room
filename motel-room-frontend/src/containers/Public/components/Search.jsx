import React, { useEffect, useState } from 'react';
import { Modal, SearchItem } from '../../../conponentItems/Public';
import icons from '../../../utils/icons';
import { useSelector } from 'react-redux';
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom';
import { path } from '../../../utils/constant'

const { BsChevronRight, GoLocation, RiMoneyPoundBoxLine,
   IoMdCrop, LiaHouseDamageSolid, FiSearch } = icons

const Search = () => {

   const navigate = useNavigate()
   const localtion = useLocation()

   const { provinces, areas, prices, categories } = useSelector(state => state.app)
   const [isShowModal, setisShowModal] = useState(false)
   const [content, setcontent] = useState([])
   const [name, setname] = useState('')
   const [queries, setQueries] = useState({})
   /* review min max when submit and resend to modal */
   const [arrMinMax, setArrMinMax] = useState({})
   const [defaultText, setdefaultText] = useState('')

   useEffect(() => {
      if (!localtion.pathname.includes(path.SEARCH)) {
         setArrMinMax({})
         setQueries({})
      }
   }, [localtion])

   const handleShowModal = (content, name, defaultText) => {
      setcontent(content)
      setname(name)
      setdefaultText(defaultText)
      setisShowModal(true)
   }

   const handleSubmit = (e, query, arrMinMax) => {
      e.stopPropagation()
      setQueries(prev => ({ ...prev, ...query }))
      setisShowModal(false)
      arrMinMax && setArrMinMax(prev => ({ ...prev, ...arrMinMax }))
   }

   const handleSearch = () => {
      const queryCodeArr = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1])
      let queryCodeObj = {}
      queryCodeArr.forEach(item => queryCodeObj[item[0]] = item[1])
      const queryTextArr = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))
      let queryTextObj = {}
      queryTextArr.forEach(item => queryTextObj[item[0]] = item[1])
      let titleSearch = `${queryTextObj.category ?? 'Cho thuê tất cả'} ${queryTextObj.province ? `tại ${queryTextObj.province}` : ''} ${queryTextObj.price ? `giá chỉ ${queryTextObj.price}` : ''} ${queryTextObj.area ? `diện tích ${queryTextObj.area}` : ''}`
      console.log(queryCodeObj)
      navigate({
         pathname: `/${path.SEARCH}`,
         search: createSearchParams(queryCodeObj).toString(),
      }, { state: { titleSearch } })
   }

   return (
      <>
         <div className='w-5/7 mt-[10px] p-[9px] bg-bg_yellow 
      rounded-md flex items-center justify- gap-2'>
            <span onClick={() => handleShowModal(categories, 'category', 'Tìm tất cả')} className='flex-1 cursor-pointer'>
               <SearchItem
                  IconAfter={<BsChevronRight size='14px'
                     color='rgba(156,163,175)'
                     className='pt-[3px]' />}
                  IconBefore={<LiaHouseDamageSolid
                     color='rgba(156,163,175)'
                     size='15px' />}
                  text={queries.category || 'Tìm tất cả'}
                  fontWeight />
            </span>
            <span onClick={() => handleShowModal(provinces, 'province', 'Toàn quốc')} className='flex-1 cursor-pointer'>
               <SearchItem
                  IconAfter={<BsChevronRight size='14px'
                     color='rgba(156,163,175)'
                     className='pt-[3px]' />}
                  text={queries.province || 'Toàn quốc'}
                  fontWeight={queries.province ? true : false}
                  IconBefore={<GoLocation size='13px'
                     color='rgba(156,163,175)' />}
               />
            </span>
            <span onClick={() => handleShowModal(prices, 'price', 'Chọn giá')} className='flex-1 cursor-pointer'>
               <SearchItem
                  IconAfter={<BsChevronRight size='14px'
                     color='rgba(156,163,175)'
                     className='pt-[3px]' />}
                  text={queries.price || 'Chọn giá'}
                  fontWeight={queries.price ? true : false}
                  IconBefore={<RiMoneyPoundBoxLine size='14px'
                     color='rgba(156,163,175)'
                     className='pt-[0.8px]' />}
               />
            </span>
            <span onClick={() => handleShowModal(areas, 'area', 'Chọn diện tích')} className='flex-1 cursor-pointer'>
               <SearchItem
                  IconAfter={<BsChevronRight size='14px'
                     color='rgba(156,163,175)'
                     className='pt-[3px]' />}
                  text={queries.area || 'Chọn diện tích'}
                  fontWeight={queries.area ? true : false}
                  IconBefore={<IoMdCrop size='14px'
                     color='rgba(156,163,175)'
                     className='pt-[0.8px]' />}
               />
            </span>
            <button type='button' onClick={handleSearch}
               className='flex items-center justify-center flex-1 outline-none
               px-3 py-2 w-full text-13 whitespace-nowrap bg-bg_blue2 text-sm 
               font-medium gap-2 rounded-md text-white'>
               <FiSearch size='14px' />
               Tìm kiếm
            </button>
         </div>
         {isShowModal &&
            <Modal content={content}
               setisShowModal={setisShowModal}
               name={name}
               handleSubmit={handleSubmit}
               queries={queries}
               arrMinMax={arrMinMax}
               defaultText={defaultText} />}
      </>
   )
}

export default Search