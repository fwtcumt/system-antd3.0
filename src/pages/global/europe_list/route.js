import getLoadable from 'utils/getLoadable';

export default {
  exact: true,
  path: '/home/global/europe',
  fatherPath: '/home',
  permission: 'global_europe',
  component: getLoadable(() => import('./index'))
};