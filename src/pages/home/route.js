import getLoadable from 'utils/getLoadable';

export default [
  {
    exact: true,
    path: '/',
    fatherPath: '/',
    redirect: `/home`
  },
  {
    exact: false,
    path: '/home',
    fatherPath: '/',
    component: getLoadable(() => import('./index'))
  }
];