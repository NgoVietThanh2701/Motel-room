import React, { memo, useEffect, useState } from 'react'
import { Select, InputReadOnly } from './index'
import { apiGetPublicProvince, apiGetPublicDistrict } from '../../services/appService'

const Address = ({ setPayload }) => {

   const [provinces, setProvinces] = useState([])
   const [province, setProvince] = useState('')
   const [districts, setDistricts] = useState([])
   const [district, setDistrict] = useState('')
   const [reset, setReset] = useState('')

   useEffect(() => {
      const fetchPublicProvince = async () => {
         const response = await apiGetPublicProvince()
         if (response.status === 200) {
            setProvinces(response?.data.results)
         }
      }
      fetchPublicProvince()
   }, [])

   useEffect(() => {
      setDistrict('')
      const fetchPublicDistrict = async () => {
         const response = await apiGetPublicDistrict(province)
         if (response.status === 200) {
            setDistricts(response.data.results)
         }
      }
      province && fetchPublicDistrict()
      !province ? setReset(true) : setReset(false)
      !province && setDistricts([])
   }, [province])

   useEffect(() => {
      setPayload(prev => ({
         ...prev,
         address: `${district ? `${districts.find(item => item.district_id === district)?.district_name},` : ''}${province
            ? `${provinces.find(item => item.province_id === province)?.province_name}` : ''}`,
         province: province
            ? provinces.find(item => item.province_id === province)?.province_name : ''
      }))
   }, [province, district, setPayload, districts, provinces])

   return (
      <div className='flex flex-col gap-5'>
         <h2 className='text-xl font-medium text-color_222'>
            Địa chỉ cho thuê
         </h2>
         <div className='flex items-center gap-8'>
            <Select type='province' options={provinces} value={province} setValue={setProvince} label='Tỉnh/Thành phố' />
            <Select reset={reset} type='district' options={districts} value={district} setValue={setDistrict} label='Quận/Huyện' />
         </div>
         <InputReadOnly label='Địa chỉ chính xác' value={`${district ? `${districts.find(item => item.district_id === district)?.district_name},` : ''} ${province
            ? `${provinces.find(item => item.province_id === province)?.province_name}` : ''}`} />
      </div>
   )
}

export default memo(Address)