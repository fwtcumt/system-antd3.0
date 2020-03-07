/**
 * 功能：获取cookie
 * @param {string} key 名
 */
const getCookie = (key) => {
  let value = null;
  document.cookie.split('; ').forEach((item) => {
    const arr = item.split('=');
    if (arr[0] === key) {
      value = decodeURI(arr[1]);
    }
  });
  return value;
}

/**
 * 功能：设置cookie
 * @param {string} key 名
 * @param {string} value 值
 * @param {GMTDateString} expires 过期时间
 * @param {string} path 路径
 */
const setCookie = ({ key, value, expires, path }) => {
  document.cookie=`${key}=${value}; expires=${expires}; path=${path}`;
}

/**
 * 功能：删除cookie
 * @param {string} key 名
 */
const deleteCookie = (key) => {
  document.cookie=`${key}=; expires=Thu, 01 Jan 2000 00:00:00 GMT`;
}

export default {
  get: getCookie,
  set: setCookie,
  delete: deleteCookie
};
