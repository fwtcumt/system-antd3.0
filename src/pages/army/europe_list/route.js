import getLoadable from 'utils/getLoadable';

export default {
  exact: true,
  path: '/home/army/europe',
  fatherPath: '/home',
  component: getLoadable(() => import('./index'))
};