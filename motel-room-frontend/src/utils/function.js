export const convertStringtoURL = (str) => {
   str = str.toLowerCase();
   /* xóa dấu */
   str = str
      .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
      .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp
   str = str.replace(/[đĐ]/g, 'd'); /* Thay ký tự đĐ */
   str = str.replace(/([^0-9a-z-\s])/g, ''); /* Xóa ký tự đặc biệt */
   str = str.replace(/(\s+)/g, '-'); // Xóa khoảng trắng thay bằng ký tự -
   str = str.replace(/-+/g, '-'); // Xóa ký tự - liên tiếp
   str = str.replace(/^-+|-+$/g, ''); // xóa phần dư - ở đầu & cuối
   return str;
}

export const getNumberPrice = (string) => {
   return string.split(' ').map(item => +item).filter(item => !item === false)
}

export const getNumberArea = (string) => {
   return string.split(' ').map(item => +item.match(/\d+/)).filter(item => item !== 0)
}

/* create posts */
const getCodePrices = (totals, min, max) => {
   return totals.map(item => {
      let arrMaxMin = getNumberPrice(item.value)
      return {
         ...item,
         min: arrMaxMin.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : arrMaxMin[0],
         max: arrMaxMin.length === 2 ? arrMaxMin[1] : arrMaxMin[0] === max ? 99999 : arrMaxMin[0],
      }
   })
}

const getCodeAreas = (totals, min, max) => {
   return totals.map(item => {
      let arrMaxMin = getNumberArea(item.value)
      return {
         ...item,
         min: arrMaxMin.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : arrMaxMin[0],
         max: arrMaxMin.length === 2 ? arrMaxMin[1] : arrMaxMin[0] === max ? 99999 : arrMaxMin[0],
      }
   })
}

export const getCodePrice = (entry, prices, min, max) => {
   const pricesWithMinMax = getCodePrices(prices, min, max)
   return pricesWithMinMax.filter(item => item.min <= entry && entry < item.max)
}

export const getCodeArea = (entry, areas, min, max) => {
   const areasWithMinMax = getCodeAreas(areas, min, max)
   return areasWithMinMax.filter(item => item.min <= entry && entry < item.max)
}