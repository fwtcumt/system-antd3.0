import getLoadable from 'utils/getLoadable';

export default {
  exact: true,
  path: '/test',
  fatherPath: '/',
  component: getLoadable(() => import('./index'))
};