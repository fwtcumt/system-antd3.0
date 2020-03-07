/**
 * 功能：获取字符串字符数，能兼容多字节字符，如表情
 * @param {string} str 字符串
 */
function getStrLength(str) {
  str = str ? String(str) : '';
  let count = 0;
  for(let kr of str) {
    if (kr) {}; //完全就是为了避免‘未使用’警告
    count++;
  }
  return count;
}

export default {
  length: getStrLength
};
