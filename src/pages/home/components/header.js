import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Avatar, Divider } from 'antd';

const { Header } = Layout;

function HomeHeader() {
	
  return (
    <Header className="home-header">
      <div />
      <div />
      <div>
        <div className="user-avatar">
          <Avatar size="small" src="https://p3.pstatp.com/list/240x240/pgc-image/a345b89725494e7cafdf4cf904d01e32" />
        </div>
        <span className="user-name">地之鸿</span>
        <Divider type="vertical" />
        <Link to="/login">登录</Link>
      </div>
    </Header>
  );
}

export default HomeHeader;
