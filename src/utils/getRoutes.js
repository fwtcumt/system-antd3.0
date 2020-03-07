import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from 'components/NotFound';

const req = require.context('../pages', true, /route\.jsx?$/);
const allRoutes = [].concat.apply([], req.keys().map(k => req(k).default || []));

/**
 * 功能：获取某个父路由下的所有子路由
 * @param {string} fatherPath 父路由
 * @param {object} permission 权限对象
 */
const getRoutes = (fatherPath, permission = {}) => {

  //选出需要渲染的路由
  const routes = allRoutes.filter(v => v.fatherPath === fatherPath);

  //给每一层路由都添加404
  routes.push({ exact: false, path: fatherPath === '/' ? '/*' : fatherPath + '/*', component: NotFound });

  return (
    <Switch>
      {routes.map(route => {
        //路由权限不匹配
        if (route.permission && !permission[route.permission]) {
          return null;
        }
        //重定向路由
        if (route.redirect) {
          return <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            render={() => <Redirect to={route.redirect} />}
          />
        } 
        //一般路由
        return <Route
          key={route.path}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      })}
    </Switch>
  );
}

export default getRoutes;
