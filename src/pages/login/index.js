import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Form, Input, Button, Icon } from 'antd';
import system from 'config/system';
import './index.less';

const { TabPane } = Tabs;
const FormItem = Form.Item;

function Page(props) {

  //登录类型
  const [ loginType, setLoginType ] = useState('account');
  //验证码
  const [ codeState, setCodeState ] = useState({ loading: false, loaded: false, countdown: 60 });
  //验证码计时器
  let codeTimer = null;

  //渲染账号密码登录
  const renderAccountForm = () => {
    const { getFieldDecorator } = props.form;
    return (
      <Form className="login-form">
        <FormItem extra="这是提示信息">
          {getFieldDecorator('account', {
            rules: [
              { required: true, message: '账号必填' }
            ]
          })(
            <Input
              allowClear
              autoFocus
              size="large"
              placeholder="账号/手机号/邮箱"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '密码必填' }
            ]
          })(
            <Input.Password
              allowClear
              size="large"
              placeholder="密码"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            className="login-btn"
            block
            size="large"
            type="primary"
            onClick={handleLogin}
          >登录</Button>
        </FormItem>
        <FormItem>
          <div className="forget-box">
            没有账号？马上去&nbsp;&nbsp;<Link to="/regist">注册</Link>
            <Link to="/" style={{ float: 'right' }}>忘记密码</Link>
          </div>
        </FormItem>
      </Form>
    );
  }

  //渲染手机号登录
  const renderCellphoneForm = () => {
    const { getFieldDecorator } = props.form;
    return (
      <Form className="login-form">
        <FormItem>
          {getFieldDecorator('mobile', {
            rules: [
              { required: true, message: '手机号必填' }
            ]
          })(
            <Input
              allowClear
              autoFocus
              size="large"
              placeholder="手机号"
              prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('code', {
            rules: [
              { required: true, message: '验证码必填' }
            ]
          })(
            <Input
              allowClear
              size="large"
              placeholder="验证码"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={
                <Button
                  size="small"
                  type="link"
                  disabled={codeState.loading}
                  onClick={handleGetCode}
                >{codeState.loading ? `${codeState.countdown}s` : codeState.loaded ? '重新发送' : '发送验证码'}</Button>
              }
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            className="login-btn"
            block size="large"
            type="primary"
            onClick={handleLogin}
          >登录</Button>
        </FormItem>
      </Form>
    );
  }

  //渲染二维码登录
  const renderQrcodeForm = () => {
    return (
      <Form className="login-form">
        <FormItem>
          <div className="qrcode-box" />
        </FormItem>
        <FormItem className="download-box">
          请使用手机App扫码登录
          <Button size="small" type="link">下载App</Button>
        </FormItem>
      </Form>
    );
  }

  //获取手机验证码
  const handleGetCode = () => {
    props.form.validateFields(['mobile'], (err, values) => {
      if (err) return;
      setCodeState(codeState => ({ ...codeState, loading: true }));
      codeTimer = setInterval(() => {
        setCodeState(codeState => {
          if (codeState.countdown === 1) {
            clearInterval(codeTimer);
            codeTimer = null;
            return { loading: false, loaded: true, countdown: 60  };
          } else {
            return { ...codeState, countdown: codeState.countdown - 1 };
          }
        });
      }, 1000);
    });
  }

  //执行登录
  const handleLogin = () => {
    props.form.validateFields((err, values) => {
      if (err) return;
      console.log(values);
    });
  }

  return (
    <div className="page-login">
      <div className="form-box">
        <div className="box-header">{system.name}</div>
        <Tabs activeKey={loginType} onChange={v => setLoginType(v)}>
          <TabPane tab="账号登录" key="account">
            {loginType === 'account' && renderAccountForm()}
          </TabPane>
          <TabPane tab="手机登录" key="cellphone">
            {loginType === 'cellphone' && renderCellphoneForm()}
          </TabPane>
          <TabPane tab="扫码登录" key="qrcode">
            {loginType === 'qrcode' && renderQrcodeForm()}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Form.create({})(Page);
