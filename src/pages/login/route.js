import getLoadable from 'utils/getLoadable';

export default {
  exact: true,
  path: '/login',
  fatherPath: '/',
  component: getLoadable(() => import('./index'))
};