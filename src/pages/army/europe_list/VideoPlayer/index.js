import React from 'react';
import './index.less';

/**
 * 功能：视频播放组件
 * @param {string} src 视频地址
 * @param {string} poster 播放器的poster图片地址
 * @param {string} title 若有，播放时会显示3秒该头部
 * @param {number} startTime 视频开始播放的位置，单位秒
 * @param {boolean} isTrial 是否是试看视频
 * @param {Function} onTimeupdate 视频播放进度改变时触发，会传回播放器对象
 * @param {Function} onBuyClick 购买按钮点击时触发
 * @param {Function} onLoginClick 登录按钮点击时触发
 * @注意
 * 组件内部已经判断了是否是Wi-Fi网络
 */

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      netType: 'wifi',
      playerStatus: 'ready' // ready:准备 wait:等待wifi loading:加载 fail:加载失败 success:加载成功 end:播放结束
    };
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.removeEventListener('loadstart', this.onVideoLoadstart);
      this.player.removeEventListener('timeupdate', this.onVideoTimeupdate);
      this.player.removeEventListener('canplay', this.onVideoCanplay);
    }
  }

  componentDidMount() {
    this.getNetType();
  }

  componentDidUpdate(prevProps) {
    //如果视频由试看变成正式了，重新播放视频
    const prevIsTrial = prevProps.isTrial;
    const nextIsTrial = this.props.isTrial;
    if (!nextIsTrial && prevIsTrial !== nextIsTrial && this.player) {
      this.setState({ playerStatus: 'loading' }, () => {
        this.player.load();
        this.setCurrentTime();
      });
    }
  }

  // 判断网络类型
  getNetType = () => {
    const userAgent = navigator.userAgent;
    let type = 'wifi';
    // 在微信、QQ中，通过 userAgent 中的信息来判断网络类型
    if (
      (/MicroMessenger/.test(userAgent) || /QQ/.test(userAgent)) &&
      /NetType/.test(userAgent)
    ) {
      type = userAgent.match(/NetType\/(\S*)/)[1] || 'wifi';
    } else {
      // TODO在其他浏览器中，通过 connection 来判断，但是有兼容性问题，iPhone 和部分 Android有问题
      const connection =
        window.navigator.connection || window.navigator.mozConnection || null;
      if (connection !== null) {
        type = connection.type || 'wifi';
      }
    }
    type = String(type).toLocaleLowerCase();
    this.setState({ netType: type });
  };

  // 渲染视频头部
  renderTitle = () => {
    const { title } = this.props;
    if (!title) return null;
    return <div className="video-title">{title}</div>;
  };

  // 视频播放前的准备
  renderBeforeLoad = () => {
    return (
      <div
        className="video-beforeLoad-wrapper"
        onClick={() => this.startLoadVideo(false)}
      >
        <div className="video-beforeLoad">
          <div className="beforeLoad-title beforeLoad-hover">
            每个当下 皆是未来
          </div>
        </div>
        <div className="video-beforeLoad-play" />
      </div>
    );
  };

  // 非 Wi-Fi 网络，提示语
  renderUnWifiTip = () => {
    return (
      <div className="un-wifi-tip">
        <span>您正在使用非Wi-Fi网络，播放将消耗流量</span>
        <button onClick={() => this.startLoadVideo(true)}>继续播放</button>
      </div>
    );
  };

  // 视频加载动画
  renderLoading = () => {
    return (
      <div className="video-loading-wrapper">
        <div className="video-loading">
          <div className="loading-title" />
          <div className="loading-line" />
        </div>
      </div>
    );
  };

  // 渲染加载失败页面
  renderLoadFail = () => {
    return (
      <div className="video-load-fail">
        <p>视频加载失败</p>
        <button onClick={() => this.startLoadVideo(true)}>刷新</button>
      </div>
    );
  };

  // 渲染播放完成后页面
  renderPlayEnd = () => {
    const { poster, isTrial, onBuyClick, onLoginClick } = this.props;
    let endStyle = {};
    if (poster) {
      endStyle = { backgroundImage: `url(${poster})` };
    }

    return (
      <div className="video-play-end" style={endStyle}>
        <div className="end-title">
          {isTrial ? '试看结束，购买后可学习全部内容' : '播放结束'}
        </div>
        <div className="end-btns">
          <span className="end-btn btn-try" onClick={this.rePlayVldeo}>
            {isTrial ? '重新试看' : '重新播放'}
          </span>
          {isTrial && (
            <span className="end-btn btn-buy" onClick={onBuyClick}>
              立即购买
            </span>
          )}
        </div>
        {isTrial && (
          <div className="end-login" onClick={onLoginClick}>
            已购买，点击登录观看
          </div>
        )}
      </div>
    );
  };

  //给播放器绑定事件监听
  handleBindEvents = () => {
    this.player.addEventListener('loadstart', this.onVideoLoadstart);
    this.player.addEventListener('timeupdate', this.onVideoTimeupdate);
    this.player.addEventListener('canplay', this.onVideoCanplay);
  };

  // loadstart 事件函数
  onVideoLoadstart = () => {
    this.setState({
      playerStatus: 'loading'
    });
  };

  // timeupdate 事件函数
  onVideoTimeupdate = () => {
    this.props.onTimeupdate &&
        this.props.onTimeupdate(this.player, this.props.isTrial);
  };

  // canplay 事件函数
  onVideoCanplay = () => {
    clearTimeout(this.canplayTimer);
    this.canplayTimer = null;
    if (this.state.playerStatus === 'end') {
      //有时候播放完了又自动开始了
      this.player.pause();
      return;
    }
    this.canplayTimer = setTimeout(() => {
      this.setState({ playerStatus: 'success' });
      this.player.play();
    }, 1000);
  };

  //设置播放进度
  setCurrentTime = () => {
    const startTime = Number(this.props.startTime || '0') - 5;
    if (startTime > 0) {
      this.player.currentTime = startTime;
    }
  };

  //重新播放
  rePlayVldeo = () => {
    this.setState({ playerStatus: 'success' });
    this.player.play();
  };

  // 点击播放
  startLoadVideo = ignoreWifi => {
    if (!this.player) return;

    if (!ignoreWifi && this.state.netType !== 'wifi') {
      this.setState({ playerStatus: 'wait' });
    } else {
      this.setState({ playerStatus: 'loading' }, () => {
        this.handleBindEvents();
        this.player.load();
        this.setCurrentTime();
      });
    }
  };

  render() {
    const { src } = this.props;
    const { playerStatus } = this.state;

    return (
      <div className="kr-video-player">
        {playerStatus === 'ready' && this.renderBeforeLoad()}
        {playerStatus === 'wait' && this.renderUnWifiTip()}
        {playerStatus === 'loading' && this.renderLoading()}
        {playerStatus === 'fail' && this.renderLoadFail()}
        {playerStatus === 'success' && this.renderTitle()}
        {playerStatus === 'end' && this.renderPlayEnd()}
        <video
          ref={el => (this.player = el)}
          style={{ opacity: playerStatus !== 'success' ? '0' : '1' }}
          className="video-el"
          controls
          preload="none"
          playsInline //ios阻止微信自动全屏
          // x5-playsinline="true" //android阻止微信自动全屏，video在最顶层
          x5-video-player-type="h5-page" //android阻止微信自动全屏，video不在最顶层
          // poster={poster}
          src={src}
          onError={() => this.setState({ playerStatus: 'fail' })}
          onEnded={() => this.setState({ playerStatus: 'end' })}
        >
          您的浏览器不支持视频播放，请升级
        </video>
      </div>
    );
  }
}

export default VideoPlayer;
