import React, { useEffect, useState } from 'react'
import { PageNumber } from '../../../conponentItems/Public'
import { useSelector } from 'react-redux'
import icons from '../../../utils/icons'
import { useSearchParams } from 'react-router-dom'

const { MdOutlineLastPage, MdOutlineFirstPage } = icons

const Pagination = () => {

   const [searchParams] = useSearchParams(); /* Get param link have ? */

   const { count, lengthPage } = useSelector(state => state.post)
   const [arrPage, setArrPage] = useState([])
   const [currentPage, setCurrentPage] = useState(1)
   const [isHideEnd, setIsHideEnd] = useState(false)
   const [isHideStart, setIsHideStart] = useState(false)

   useEffect(() => {
      const page = searchParams.get('page');
      page && +page !== currentPage && setCurrentPage(+page)
      !page && setCurrentPage(1)
   }, [searchParams, currentPage])

   useEffect(() => {
      let maxPage = Math.ceil(count / lengthPage)
      let end = (currentPage + 2) > maxPage ? maxPage : (currentPage + 2);
      let start = (currentPage - 2) <= 1 ? 1 : (currentPage - 2);
      let temp = []
      for (let i = start; i <= end; i++) {
         temp.push(i)
      }
      setArrPage(temp)
      currentPage >= (maxPage - 2) ? setIsHideEnd(true) : setIsHideEnd(false)
      currentPage <= 3 ? setIsHideStart(true) : setIsHideStart(false)
   }, [currentPage, count, lengthPage])

   return (
      <div className='flex items-center justify-center grap-2 py-5'>
         {!isHideStart && <PageNumber
            icon={<MdOutlineFirstPage size={18} />}
            setCurrentPage={setCurrentPage}
            text={1}
         />}
         {(!isHideStart && currentPage !== 4) && <PageNumber text='...' />}
         {arrPage.length > 0 &&
            arrPage.map(item => (
               <PageNumber key={item} text={item}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage} />
            ))}
         {!isHideEnd && <PageNumber text='...' />}
         {!isHideEnd && <PageNumber
            icon={<MdOutlineLastPage size={18} />}
            setCurrentPage={setCurrentPage}
            text={Math.ceil(count / lengthPage)}
         />}
      </div>
   )
}

export default Pagination