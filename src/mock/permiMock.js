import Mock from 'mockjs-x';

Mock.XHR.prototype.withCredentials = true;

Mock.mock(/sys\/permiss\/list/, () => {
  return {
    code: 0,
    message: '',
    data: {
      global_asia: true,
      global_asia_add: true,
      global_asia_mod: true,
      global_asia_del: true,
      global_europe: true
    }
  };
});
