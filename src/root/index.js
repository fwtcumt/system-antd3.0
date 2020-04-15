import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import getRoutes from 'utils/getRoutes';
import './index.less';

class Root extends React.PureComponent {
  render() {
    return (
      <Router basename="/system-antd3.0">
        {getRoutes('/')}
      </Router>
    );
  }
}

export default Root;
