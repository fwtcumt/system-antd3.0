import React from 'react';
import loading_pic from 'assets/loading.gif';
import './index.less';

export default () => {
  return (
    <div className="accets-loading">
      <div className="inner-box">
        <img className="gif" src={loading_pic} alt=""/>
        <div className="tip">资源加载中...</div>
      </div>
    </div>
  );
};
