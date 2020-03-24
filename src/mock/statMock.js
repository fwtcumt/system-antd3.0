import Mock from 'mockjs-x';

Mock.XHR.prototype.withCredentials = true;

Mock.mock(/sys\/stat/, () => {
  const icons = ['wechat', 'taobao', 'qq', 'weibo', 'gitlab', 'dingding'];
  const radomIndex = Math.floor(Math.random() * 6);
  
  return Mock.mock({
    'status': 200,
    'message': '',
    'data': {
      'tabList|4': [{
        'name': '@province',
        'value|100-1000': 233
      }],
      'commonNavs|14': [{
        name: '@cname',
        icon: icons[radomIndex]
      }]
    }
  });
});
