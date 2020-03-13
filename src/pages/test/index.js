import React from 'react';
import VideoPlayer from './VideoPlayer';
import './index.less';

function Page(props) {
  return (
    <div className="page-test">
      <div className="page-wrapper">
        <div className="videoBox">
          <VideoPlayer
            src="https://videos.36krcdn.com/20200308/v2_1583638138111_video_mp4_v3"
            poster="https://img.36krcdn.com/20200305/v2_4ff2a8ad79cf41b396b10065cc7b9903_img_png"
            title="热门贵价手机续航测试"
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
