const store = {};

/**
 * 功能：往store存储数据
 * @param {string} key 数据名
 * @param {[any,Function]} value 数据值
 */
export const setStore = (key, value) => {
  if (key && typeof key === 'string') {
    store[key] = value;
  } else {
    console.error('a key is must be a tring for store');
  }
}

/**
 * 功能：从store获取数据
 * @param {string} key 数据名
 */
export const getStore = key => {
  if (key) {
    return store[key] || [];
  }
  return store;
}

export default getStore;
