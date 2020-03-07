import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import zhCN from 'antd/es/locale/zh_CN';
import Root from './root';
import 'moment/locale/zh-cn';
import './mock';

moment.locale('zh-cn');

ReactDOM.render(
  <ConfigProvider
    locale={zhCN}
    getPopupContainer={node => {
      if (node) {
        return node.parentNode;
      }
      return document.body;
    }}
  >
    <Root />
  </ConfigProvider>,
  document.getElementById('root')
);
