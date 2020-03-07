import getLoadable from 'utils/getLoadable';

export default {
  exact: true,
  path: '/home',
  fatherPath: '/home',
  component: getLoadable(() => import('./index'))
};