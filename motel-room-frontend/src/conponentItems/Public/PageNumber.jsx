import React, { memo } from 'react'
import { useNavigate, createSearchParams, useSearchParams, useLocation } from 'react-router-dom'

const notActive = `text-color_222 w-[38px] h-[44px] flex items-center 
justify-center bg-white hover:bg-gray-300 rounded-md mx-[2px]`
const active = `text-white w-[38px] h-[44px] flex items-center
justify-center bg-[#E13427] hover:opacity-90 rounded-md mx-[2px]`

const PageNumber = ({ text, currentPage, icon, setCurrentPage }) => {

   const navigate = useNavigate()
   const localtion = useLocation()
   const [paramsSearch] = useSearchParams()
   let entries = paramsSearch.entries()

   const append = (entries) => {
      let params = []
      paramsSearch.append('page', + text)
      for (let entry of entries) {
         params.push(entry)
      }
      let searchParamsObj = {}
      params?.forEach(i => {
         if (Object.keys(searchParamsObj)?.some(item => item === i[0] && item !== 'page')) {
            searchParamsObj[i[0]] = [...searchParamsObj[i[0]], i[1]]
         } else {
            searchParamsObj = { ...searchParamsObj, [i[0]]: [i[1]] }
         }
      })
      return searchParamsObj
   }

   const handleChangePage = () => {
      if (!(text === '...')) {
         setCurrentPage(+text)
         navigate({
            pathname: localtion.pathname,
            search: createSearchParams(append(entries)).toString()
         });
      }
   }

   return (
      <div
         className={+text === +currentPage ?
            `${active} cursor-pointer` :
            `${notActive} ${text === '...' ? 'cursor-text' : 'cursor-pointer'}`}
         onClick={handleChangePage}>
         {icon || text}
      </div>
   )
}

export default memo(PageNumber)