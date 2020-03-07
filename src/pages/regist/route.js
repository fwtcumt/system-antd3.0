import getLoadable from 'utils/getLoadable';

export default {
  exact: true,
  path: '/regist',
  fatherPath: '/',
  component: getLoadable(() => import('./index'))
};