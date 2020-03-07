import Qs from 'qs';
import handleObject from 'utils/handleObject';

/**
 * 功能：获取search对象(的某一个)
 * @param {string} name 键名
 */
const getSearch = (name) => {
  const search = Qs.parse(window.location.search.slice(1));
  return name ? search[name] : search;
}

/**
 * 功能：部分设置search对象
 * @param {object} value 合并对象
 */
const setSearch = (value = {}) => {
  const { pathname } = window.location;
  const search = getSearch();
  const cleanValues = handleObject.clean({ ...search, ...value });
  const newSearch = `${pathname}?${Qs.stringify(cleanValues)}`;
  window.history.pushState(null, null, newSearch);
}

/**
 * 功能：补齐search对象的某些空值
 * @param {object} value 合并对象
 */
const feedSearch = (value = {}) => {
  const { pathname } = window.location;
  const search = getSearch();
  const cleanValues = handleObject.clean({ ...value, ...search });
  const newSearch = `${pathname}?${Qs.stringify(cleanValues)}`;
  window.history.pushState(null, null, newSearch);
}

/**
 * 功能：完全覆盖search对象
 * @param {object} value 覆盖对象
 */
const coverSearch = (value = {}) => {
  const { pathname } = window.location;
  const newSearch = `${pathname}?${Qs.stringify(value)}`;
  window.history.pushState(null, null, newSearch);
}

export default {
  get: getSearch,
  set: setSearch,
  feed: feedSearch,
  cover: coverSearch
};
