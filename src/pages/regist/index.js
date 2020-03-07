import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Icon } from 'antd';
import system from 'config/system';
import './index.less';

const FormItem = Form.Item;

function Page() {

  return (
    <div className="page-regist">
      <div className="form-box">
        <div className="box-header">{system.name}</div>
        <Form className="regist-form">
          <FormItem>
            <Input
              allowClear
              size="large"
              placeholder="账号/邮箱"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </FormItem>
          <FormItem>
            <Input
              allowClear
              size="large"
              placeholder="手机号"
              prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </FormItem>
          <FormItem>
            <Input
              allowClear
              size="large"
              placeholder="验证码"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={<Button size="small" type="link">发送验证码</Button>}
            />
          </FormItem>
          <FormItem>
            <Input.Password
              allowClear
              size="large"
              placeholder="密码"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </FormItem>
          <FormItem>
            <Input.Password
              allowClear
              size="large"
              placeholder="重复密码"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </FormItem>
          <FormItem>
            <Button className="regist-btn" block size="large" type="primary">注册</Button>
          </FormItem>
          <FormItem className="to-login">
            我有账号，现在去&nbsp;&nbsp;
            <Link to="/login">登录</Link>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}

export default Page;
