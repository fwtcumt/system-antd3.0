/**
 * 为了实现菜单类型保持，会在 localStorage 中存一 'cra_sider_collapsed' 字段。
 * 
*/

import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import system from 'config/system';
import http from 'utils/getFetch';

const { Sider } = Layout;
const { SubMenu, ItemGroup } = Menu;

const getPathArr = (pathname) => {
  let pathCache = '';
  return pathname.slice(1).split('/').map(v => {
    pathCache += '/' + v;
    return pathCache;
  });
}

function HomeSider(props) {
  const pathname = props.history.location.pathname;
  const patharr = getPathArr(pathname);
  
  const [ menuList, setMenuList ] = useState([]);
  const [ collapsed, setCollapsed ] = useState(!!localStorage.getItem('cra_sider_collapsed'));
  const [selectedKeys, setSelectedKeys] = useState([pathname]);
  const [openKeys, setOpenKeys] = useState(collapsed ? [] : patharr);

  //获取菜单列表
  useEffect(() => {
    http.post('sys/menu/list').then(res => {
      setMenuList(res);
    });
  }, []);

  //当浏览器pathname变化时，同步子菜单选择
  useEffect(() => {
    const patharr = getPathArr(pathname);
    if (patharr.length > 1) patharr.splice(0, 1);
    setSelectedKeys(patharr);
  }, [pathname]);

  //渲染系统图标
  const renderSysIcon = () => {
    if (system.icon.type === 'image') {
      return <img src={system.icon.value} alt="" />;
    }
    return <Icon type={system.icon.value} />;
  }

  //渲染菜单列表
  const renderMenu = (menuList) => {
    return menuList.map(menu => {
      if (menu.childMenuList && !menu.url) {
        //这是菜单分组
        return (
          <ItemGroup key={menu.name} title={menu.name}>
            {renderMenu(menu.childMenuList)}
          </ItemGroup>
        );
      } else if (menu.childMenuList) {
        //这是父菜单
        return (
          <SubMenu
            key={menu.url}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{menu.name}</span>
              </span>
            }
          >{renderMenu(menu.childMenuList)}</SubMenu>
        );
      } else {
        //这是叶子菜单
        return (
          <Menu.Item key={menu.url}>
            <Link to={menu.url}>
              <Icon type={menu.icon} />
              <span>{menu.name}</span>
            </Link>
          </Menu.Item>
        );
      }
    });
  }

  //切换菜单展合
  const handleCollapsed = val => {
    if (val) {
      setOpenKeys([]);
      localStorage.setItem('cra_sider_collapsed', '1');
    } else {
      setOpenKeys(patharr);
      localStorage.removeItem('cra_sider_collapsed');
    }
    setCollapsed(val);
  }

  return (
    <Sider
      className="home-sider"
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapsed}
    >
      <div className="logo">
        <Link
          className="logo-icon"
          to="/home"
        >
          {renderSysIcon()}
        </Link>
        {!collapsed && <div className="logo-title ellipsis-1">{system.name}</div>}
      </div>
      <Menu
        className="menu"
        mode="inline"
        theme="dark"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={keys => setOpenKeys(keys)}
      >
        {renderMenu(menuList)}
      </Menu>
    </Sider>
  );
}

export default withRouter(HomeSider);
