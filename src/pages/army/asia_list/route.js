import getLoadable from 'utils/getLoadable';

export default {
  exact: true,
  path: '/home/army/asia',
  fatherPath: '/home',
  component: getLoadable(() => import('./index'))
};