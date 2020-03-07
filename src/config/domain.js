//环境变量(dev test prod)
const env = process.env.REACT_APP_ENV;

const apis = {
  dev: {
    cms: '//dev.cms.demo.com/api',
    gms: '//dev.gms.demo.com/api',
    sso: '//dev.sso.demo.com/api',
    ssp: '//dev.ssp.demo.com/api'
  },
  test: {
    cms: '//test.cms.demo.com/api',
    gms: '//test.gms.demo.com/api',
    sso: '//test.sso.demo.com/api',
    ssp: '//test.ssp.demo.com/api'
  },
  prod: {
    cms: '//cms.demo.com/api',
    gms: '//gms.demo.com/api',
    sso: '//sso.demo.com/api',
    ssp: '//ssp.demo.com/api'
  }
};

const urls = {
  dev: {
    baidu: 'dev.baidu.com',
    ali: 'dev.ali.com',
    qq: 'dev.qq.com'
  },
  test: {
    baidu: 'test.baidu.com',
    ali: 'test.ali.com',
    qq: 'test.qq.com'
  },
  prod: {
    baidu: 'https://baidu.com',
    ali: 'https://ali.com',
    qq: 'https://qq.com'
  }
};

export const api =  apis[env];
export const url =  urls[env];
export default { api, url };
