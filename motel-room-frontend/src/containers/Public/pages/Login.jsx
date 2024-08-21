import React, { useEffect, useState } from 'react';
import { Button, InputForm } from '../../../conponentItems/Public';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, login } from '../../../features/authSlice';
import Swal from 'sweetalert2';
import validate from '../../../utils/validateFields';

const Login = () => {

   const localtion = useLocation()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   /* */
   const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
   const [invalidFields, setInvalidFields] = useState([])
   const [isRegister, setIsRegister] = useState(localtion.state?.flag)
   const [payload, setPayload] = useState({
      name: '',
      phone: '',
      password: '',
   });

   /* check state form is login or register*/
   useEffect(() => {
      setIsRegister(localtion.state?.flag)
   }, [localtion.state?.flag])

   /* when isLoggedIn changed => navigate home */
   useEffect(() => {
      isLoggedIn && navigate('/')
   }, [navigate, isLoggedIn])

   /*useEffect render one time and will render after dependecies changed */
   useEffect(() => {
      msg && Swal.fire('Opps !', msg, 'error')
   }, [msg, update])

   /* */
   const handleSubmit = async () => {
      let finalPayload = isRegister ? payload : {
         phone: payload.phone,
         password: payload.password
      }
      let invalids = validate(finalPayload, setInvalidFields);
      if (invalids === 0) {
         isRegister
            ? dispatch(register(finalPayload))
            : dispatch(login(finalPayload))
      }
   }


   return (
      <div className='bg-white w-[600px] mt-6 p-[30px] pb-[100px] rounded-sm shadow-sm'>
         <h3 className='font-bold text-3xl mb-3 text-color_222'>{isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}</h3>
         <div className='w-full flex flex-col gap-4'>
            {isRegister &&
               <InputForm
                  setInvalidFields={setInvalidFields}
                  invalidFields={invalidFields}
                  label='HỌ TÊN' value={payload.name}
                  setValue={setPayload}
                  keyPayload='name'
               />}
            <InputForm
               setInvalidFields={setInvalidFields}
               invalidFields={invalidFields}
               label='SỐ ĐIỆN THOẠI'
               value={payload.phone} setValue={setPayload}
               keyPayload='phone'
            />
            <InputForm
               setInvalidFields={setInvalidFields}
               invalidFields={invalidFields}
               label='MẬT KHẨU' value={payload.password}
               setValue={setPayload}
               keyPayload='password'
               type='password'
            />
            <Button
               text={isRegister ? 'Đăng ký' : 'Đăng nhập'}
               textColor='text-white'
               bgColor='bg-bg_blue2'
               fullWidth={true}
               onClick={handleSubmit}
            />
         </div>
         <div className='mt-7 flex items-center justify-between'>
            {isRegister ?
               <small>Bạn đã có tài khoản? <span onClick={() => {
                  setIsRegister(false); setInvalidFields([]); setPayload({ name: '', phone: '', password: '', })
               }}
                  className='text-[blue] hover:underline cursor-pointer'>Đăng nhập ngay</span>
               </small> :
               <>
                  <small className='text-[blue] hover:text-[red] cursor-pointer'>Bạn quên mật khẩu</small>
                  <small onClick={() => {
                     setIsRegister(true); setInvalidFields([]); setPayload({ name: '', phone: '', password: '', })
                  }}
                     className='text-[blue] hover:text-[red] cursor-pointer hover:underline'>
                     Tạo tại khoản mới
                  </small>
               </>
            }
         </div>
      </div>
   )
}

export default Login