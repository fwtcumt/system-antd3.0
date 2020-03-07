/**
 * 功能：去除对象值为空(null,undefined,NaN,'')的属性
 * @param {object} obj 处理对象
 * @param {boolean} includeEmptyString 是否保留空字符串，默认false
 */
const cleanObject = (obj, includeEmptyString) => {
  if (!obj || typeof obj !== 'object' || (typeof obj === 'object' && Array.isArray(obj))) {
    return obj;
  };

  const newObj = {};
  for(let attr in obj) {
    if (obj[attr] === '') {
      if (includeEmptyString) newObj[attr] = '';
    } else if (typeof obj[attr] === 'string') {
      newObj[attr] = obj[attr].trim();
    } else if (obj[attr] === 0 ) {
      newObj[attr] = 0;
    } else if (obj[attr]) {
      newObj[attr] = obj[attr];
    }
  }
  return newObj;
}

export default {
  clean: cleanObject
};
