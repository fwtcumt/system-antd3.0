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
          <Avatar size="small" src="https://img.36krcdn.com/20191212/v2_90c4af2dce3a4ee9a507f96e15c4cece_img_jpg" />
        </div>
        <span className="user-name">地之鸿</span>
        <Divider type="vertical" />
        <Link to="/login">登录</Link>
      </div>
    </Header>
  );
}

export default HomeHeader;
