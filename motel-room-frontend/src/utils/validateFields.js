/* validation form */
const validate = (payload, setInvalidFields) => {
   let invalidCount = 0
   /* Convert object -> array*/
   let fields = Object.entries(payload)
   fields.forEach(item => {
      if (item[1] === '') {
         setInvalidFields(prev => [...prev, {
            name: item[0],
            message: "Bạn không được bỏ trống trường này !"
         }])
         invalidCount++
      }
      switch (item[0]) {
         case 'password':
            if (item[1].length < 6) {
               setInvalidFields(prev => [...prev, {
                  name: item[0],
                  message: 'Mật khẩu có tối thiểu 6 kí tự !'
               }])

               invalidCount++
            }
            break;
         case 'phone':
            let regex = /^(?:\+?84|0)[1-9]\d{4}$/;
            if (!regex.test(item[1])) {
               setInvalidFields(prev => [...prev, {
                  name: item[0],
                  message: 'Số điện thoại bắt đầu với 0 và có 6 chữ số !'
               }])
               invalidCount++
            }
            break;
         default:
            break;
      }
   })
   return invalidCount
}

export default validate