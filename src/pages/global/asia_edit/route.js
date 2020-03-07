import getLoadable from 'utils/getLoadable';

export default [
  {
    exact: true,
    path: '/home/global/asia/add',
    fatherPath: '/home',
    permission: 'global_asia_add',
    component: getLoadable(() => import('./index'))
  },
  {
    exact: true,
    path: '/home/global/asia/mod/:id',
    fatherPath: '/home',
    permission: 'global_asia_mod',
    component: getLoadable(() => import('./index'))
  }
];