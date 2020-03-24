import Mock from 'mockjs-x';

Mock.XHR.prototype.withCredentials = true;

Mock.mock(/sys\/global\/asia\/[add|mod]/, ({body}) => {
  const param = JSON.parse(body).param;
  console.log(param);
  
  return Mock.mock({
    'status': 200,
    'message': '',
    'data': {}
  });
});
