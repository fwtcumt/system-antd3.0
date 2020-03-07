import React from 'react';
import { Layout, Result, Button } from 'antd';
import RouteLoading from 'components/RouteLoading'; 
import getRoutes from 'utils/getRoutes';
import { setStore } from 'utils/handleStore';
import HomeHeader from './components/header';
import HomeSider from './components/sider';
import http from 'utils/getFetch';
import './index.less';

const { Content, Footer } = Layout;

class Home extends React.Component {
  state = {
    loading: true,
    hasErr: false,
    permission: {}
  }

  componentDidMount() {
    http.post('sys/permiss/list').then(res => {
      setStore('permission', [res]);
      this.setState({
        loading: false,
        permission: res
      });
    }).catch(() => this.setState({
      loading: false,
      hasErr: true
    }));
  }

  render() {
    if (this.state.loading) {
      return <RouteLoading />;
    };

    if (this.state.hasErr) {
      return (
        <Result
          status="500"
          title="500"
          subTitle="Sorry, the server is wrong."
          extra={
            <div>
              <Button type="link" href={window.location.href}>Refresh</Button>
              <Button type="link" href="/login">Login</Button>
            </div>
          }
        />
      );
    };

    return (
      <Layout className="page-home">
        <HomeSider />
        <Layout>
          <HomeHeader />
          <Content className="home-content">
            <div className="home-main">{getRoutes('/home', this.state.permission)}</div>
          </Content>
          <Footer className="home-footer">
            中国 · 北京 · &copy;版权所有
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
