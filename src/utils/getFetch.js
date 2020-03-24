import axios from 'axios';
import { Modal, message } from 'antd';
import { api } from 'config/domain';
import handleObject from 'utils/handleObject';

axios.defaults.baseURL = api.cms;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 2000;

const CancelToken = axios.CancelToken;

//处理请求失败
const onFetchFail = (err, reject) => {
  message.error(err);
  reject(err);
}

//处理请求成功
const onFetchSuccess = (res, resolve, reject) => {
  //服务器端请求错误
  if (res.status !== 200) {
    return onFetchFail('服务器异常', reject);
  }

  //bug: 业务服务判断
  const status = res.data.status;

  //业务请求-正常
  if (status === 200) {
    return resolve(res.data.data);
  }

  //业务请求-未登录
  if (status === 301) {
    Modal.destroyAll();
    Modal.confirm({
      title: '提示',
      content: res.data.message,
      onOk: () => window.location.href = '/login'
    });
    return reject(res.data.message);
  }

  //业务请求-其他错误
  return onFetchFail(res.data.message, reject);
}

export default {
  get: (url = '', data = {}, config = {}) => {
    //设置取消请求钩子
    if (config.cancelToken) {
      config.cancelToken = new CancelToken(config.cancelToken);
    }

    const cleanData = handleObject.clean(data, true);

    return new Promise((resolve, reject) => {
      axios.get(url, { params: cleanData, ...config })
      .then(res => onFetchSuccess(res, resolve, reject))
      .catch(err => onFetchFail(err.message, reject));
    });
  },
  post: (url = '', data = {}, config = {}) => {
    //设置取消请求钩子
    if (config.cancelToken) {
      config.cancelToken = new CancelToken(config.cancelToken);
    }

    const cleanData = handleObject.clean(data, true);

    return new Promise((resolve, reject) => {
      axios.post(url, { param: cleanData }, config)
      .then(res => onFetchSuccess(res, resolve, reject))
      .catch(err => onFetchFail(err.message, reject));
    });
  },
  upload: (url = '', data = {}, config = {}) => {
    //设置取消请求钩子
    if (config.cancelToken) {
      config.cancelToken = new CancelToken(config.cancelToken);
    }
    
    return new Promise((resolve, reject) => {
      axios.post(url, data, { headers:{'Content-Type':'multipart/form-data'}, ...config })
      .then(res => onFetchSuccess(res, resolve, reject))
      .catch(err => onFetchFail(err.message, reject));
    });
  },
}
