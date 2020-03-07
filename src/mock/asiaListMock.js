import Mock from 'mockjs-x';

Mock.XHR.prototype.withCredentials = true;

Mock.mock(/sys\/global\/asia\/list/, ({body}) => {
  const param = JSON.parse(body).param;
  const { pageSize, pageNo } = param;
  const total = 60;
  const resNum = total > pageSize * pageNo ? pageSize : total % pageSize;
  const listRule = 'peopleList|' + resNum;
  console.log(param);
  
  return Mock.mock({
    'code': 0,
    'message': '*=_=*',
    'data': {
      'page': {
        'pageSize': Number(pageSize),
        'pageNo': Number(pageNo),
        'total': total
      },
      'countryList': [
        { code: 1, name: '美国' },
        { code: 86, name: '中国' },
        { code: 8, name: '俄罗斯' },
        { code: 995, name: '菲律宾' }
      ],
      [listRule]: [{
        id: '@id',
        name: '@cname',
        email: '@email',
        address: '@county(true)'
      }]
    }
  });
});
