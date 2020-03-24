import Mock from 'mockjs-x';

Mock.XHR.prototype.withCredentials = true;

Mock.mock(/sys\/global\/asia\/remark/, ({body}) => {
  const param = JSON.parse(body).param;
  console.log(param);
  
  return Mock.mock({
    'status': 301,
    'message': '登录失败，请重新登录',
    'data': {}
  });
});
