import getLoadable from 'utils/getLoadable';

export default {
  exact: true,
  path: '/home/global/asia',
  fatherPath: '/home',
  permission: 'global_asia',
  component: getLoadable(() => import('./index'))
};