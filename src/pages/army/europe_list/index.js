import React from 'react';
import { Breadcrumb } from 'antd';
import './index.less';

import VideoPlayer from './VideoPlayer';

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
          <div className="videoBox">
            <VideoPlayer
              src="https://videos.36krcdn.com/20200308/v2_1583638138111_video_mp4_v3"
              poster="https://img.36krcdn.com/20200305/v2_4ff2a8ad79cf41b396b10065cc7b9903_img_png"
              title="热门贵价手机续航测试：iPhone第二，第一是？"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
