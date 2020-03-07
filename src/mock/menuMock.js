import Mock from 'mockjs-x';

Mock.XHR.prototype.withCredentials = true;

Mock.mock(/sys\/menu\/list/, () => {
  return {
    code: 0,
    message: '',
    data: [
      {
        name: '首页',
        icon: 'home',
        url: '/home'
      },
      {
        name: '世界人员',
        icon: 'global',
        url: '/home/global',
        childMenuList: [
          { name: '亚洲', icon: 'pay-circle', url: '/home/global/asia' },
          { name: '欧洲', icon: 'euro', url: '/home/global/europe' }
        ]
      },
      {
        name: '世界军事',
        icon: 'rocket',
        url: '/home/army',
        childMenuList: [
          { name: '亚洲', icon: 'pay-circle', url: '/home/army/asia' },
          { name: '欧洲', icon: 'euro', url: '/home/army/europe' }
        ]
      }
    ]
  };
});
