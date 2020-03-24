import React from 'react';
import { Breadcrumb } from 'antd';
import './index.less';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    
    return (
      <div className="layout-flex">
        <div className="flex-header">
          <Breadcrumb>
            <Breadcrumb.Item >世界军事</Breadcrumb.Item>
            <Breadcrumb.Item >欧洲</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="flex-body">
          oz
        </div>
      </div>
    );
  }
}

export default Page;
