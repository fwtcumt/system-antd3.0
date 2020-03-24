import pic_logo from 'assets/logo.png';

export default {
  //系统名称
  name: '管理系统',
  //系统图标
  icon: {
    type: 'image', //图标类型，可取值:[icon/image]
    value: pic_logo //图标值，可取值:[icon-type/url]
  },
  //表格分页器
  pagination: {
    pageSize: 40,
    current: 1,
    total: 0,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ['20', '40', '80', '100'],
    showTotal: tol => `共 ${tol} 条`
  }
};
