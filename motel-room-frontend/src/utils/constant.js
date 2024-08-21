import icons from "./icons"

const { MdOutlineContactSupport, HiOutlinePencilSquare, PiClipboardTextLight, SlUserFollowing } = icons

export const path = {
   HOME: '/*', /* have '/' will move route to root domain */
   LOGIN: 'login',
   CHO_THUE_CAN_HO: 'cho-thue-can-ho',
   CHO_THUE_MAT_BANG: 'cho-thue-mat-bang',
   NHA_CHO_THUE: 'nha-cho-thue',
   CHO_THUE_PHONG_TRO: 'cho-thue-phong-tro',
   DETAIL_POST_TITLE_POSTID: 'chi-tiet/:title/:postId',
   SEARCH: 'tim-kiem',
   /* administrator */
   SYSTEM: '/he-thong/*',
   CREATE_POST: 'tao-moi-bai-dang',
   MANAGE_POST: 'quan-ly-bai-dang'
}

export const menuSidebar = [
   {
      id: 1,
      text: 'Đăng tin cho thuê',
      path: '/he-thong/tao-moi-bai-dang',
      icon: <HiOutlinePencilSquare color="" size={17} />
   },
   {
      id: 2,
      text: 'Quản lý tin đăng',
      path: '/he-thong/quan-ly-bai-dang',
      icon: <PiClipboardTextLight size={17} />
   },
   {
      id: 3,
      text: 'Sửa thông tin cá nhân',
      path: '/he-thong/sua-thong-tin-ca-nhan',
      icon: <SlUserFollowing size={15} />
   },
   {
      id: 4,
      text: 'Liên hệ',
      path: '/he-thong/lien-he',
      icon: <MdOutlineContactSupport size={19} className="mt-[2px]" />
   }
]

export const menuManager = [
   {
      id: 1,
      text: 'Đăng tin cho thuê',
      path: '/he-thong/tao-moi-bai-dang',
      icon: <HiOutlinePencilSquare color="" size={17} />
   },
   {
      id: 2,
      text: 'Quản lý tin đăng',
      path: '/he-thong/quan-ly-bai-dang',
      icon: <PiClipboardTextLight size={17} />
   },
   {
      id: 3,
      text: 'Thông tin tài khoản',
      path: '/he-thong/thong-tin-tai-khoan',
      icon: <SlUserFollowing size={15} />
   },
]

export const infoMotel = {
   HOME_TITLE: 'Kênh thông tin Phòng Trọ số 1 Việt Nam',
   HOME_DESCRIPTION: `Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, 
   nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.`
}

export const introMotel = {
   title: 'Tại sao lại chọn PhongTro123.com?',
   description: `Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Phongtro123.com tự hào là trang web đứng 
   top google về các từ khóa:`,
   description_sub: `...Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với nhiều khách hàng hơn, 
   do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn`,
   statistical: [
      {
         name: 'Thành viên',
         value: '116.998+'
      },
      {
         name: 'Tin đăng',
         value: '103.348+'
      },
      {
         name: 'Lượt truy cập/tháng',
         value: '300.000+'
      },
      {
         name: 'Lượt xem/tháng',
         value: '2.500.000+'
      }
   ],
   price: 'Chi phí thấp, hiệu quả tối đa',
   feelback: `"Trước khi biết website phongtro123, mình phải tốn nhiều công sức và
   chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy, và đăng lên các website
   khác nhưng hiệu quả không cao. Từ khi biết website phongtro123.com, mình đã thử đăng tin
   lên và đánh giá hiệu quả khá cao trong khi chi phí khá thấp, không còn tình trạng phòng trống kéo dài."`,
   auth: 'Anh Khánh (chủ hệ thống phòng trọ tại Tp.HCM)',
   question: 'Bạn đang có phòng trọ / căn hộ cho thuê?',
   answer: 'Không phải lo tìm người cho thuê, phòng trống kéo dài'
}

export const contactMotel = {
   image: 'https://phongtro123.com/images/support-bg.jpg',
   title: 'Liên hệ với chúng tôi nếu bạn cần hỗ trợ:',
   contact: [
      {
         text: 'HỔ TRỢ THANH TOÁN',
         phone: 'Điện thoại: 012345678',
         zalo: 'Zalo: 012345678'
      },
      {
         text: 'HỔ TRỢ THANH TOÁN',
         phone: 'Điện thoại: 012345678',
         zalo: 'Zalo: 012345678'
      },
      {
         text: 'HỔ TRỢ THANH TOÁN',
         phone: 'Điện thoại: 012345678',
         zalo: 'Zalo: 012345678'
      }
   ]
}

export const localtionCity = [
   {
      name: 'Phòng trọ Hồ Chí Minh',
      image: 'https://phongtro123.com/images/location_hcm.jpg',
      provinceCode: 'CHMN'
   },
   {
      name: 'Phòng trọ Hà Nội',
      image: 'https://phongtro123.com/images/location_hn.jpg',
      provinceCode: 'NNIT'
   },
   {
      name: 'Phòng trọ Đà Nẵng',
      image: 'https://phongtro123.com/images/location_dn.jpg',
      provinceCode: 'NONG'
   }
]
