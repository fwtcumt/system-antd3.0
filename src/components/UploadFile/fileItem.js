import React from 'react';
import { Icon } from 'antd';
// import http from 'utils/getFetch';
import { getFileIcon } from './utils';

class FileItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'done', //done uploading error
      rate: '0%',
      sucMsg: '',
      errMsg: ''
    }
  }

  componentDidMount() {
    const fileItem = this.props.file;
    const { file } = fileItem;

    if (fileItem.errMsg) {
      //选择的文件不合法
      this.setState({
        status: 'error',
        errMsg: fileItem.errMsg
      });
    } else if (file) {
      //检测到有合法的新文件，上传之
      this.startUpload(file);
    }
  }

  //取消上传进程
  handleCancel = () => {
    // this.cancelUpload && this.cancelUpload('上传已取消');

    //模拟终止
    const fileItem = this.props.file;
    delete fileItem.file;
    clearInterval(this.timer);
    this.timer = null;
    this.setState({
      status: 'error',
      errMsg: '上传已取消'
    });
  }

  //开始上传文件
  startUpload = (file) => {
    const fileItem = this.props.file;
    const formData = new FormData();

    formData.append('file', file, fileItem.fileName);
    this.setState({ status: 'uploading' });

    // http.upload('/upload', formData, {
    //   cancelToken: c => this.cancelUpload = c,
    //   onUploadProgress: e => {
    //     this.setState({ rate: `${(e.loaded / e.total * 100).toFixed(1)}%` });
    //   }
    // }).then(res => {
    //   delete fileItem.file;
    //   fileItem.fileUrl = res.fileUrl;
    //   this.setState({ status: 'done', sucMsg: '上传完成' });
    // }).catch(err => {
    //   delete fileItem.file;
    //   this.setState({ status: 'error', errMsg: err || '上传失败' });
    // });


    //上传模拟
    this.timer = setInterval(() => {
      const { rate } = this.state;
      const newRate = parseInt(rate) + 10;

      this.setState({ rate: `${newRate}%` });

      if (newRate >= 100) {
        clearInterval(this.timer);
        this.timer = null;
        const statusArr = [{status: 'done', sucMsg: '上传完成'}, {status: 'error', errMsg: '上传失败'}];
        const redomIndex = Math.floor(Math.random() * 2);
        delete fileItem.file;
        fileItem.fileUrl = redomIndex === 1 ? null : 'https://m1-1253159997.image.myqcloud.com/imageDir/4071b7d87d5cc21834829c8daaa48566.jpg';
        this.setState(statusArr[redomIndex]);
      }
    }, 300);
  }

  //渲染图片操作按钮
  renderFileBtns = () => {
    const { status } = this.state;
    const { index, layout, fileType, limit = {}, allowEdit, onDelete, onEdit } = this.props;
    const { fileUrl, downloadUrl, originUrl } = this.props.file;
    const limitWidth = limit.width;
    const limitHeight = limit.height;
    //按钮控制
    const showCancelBtn = status === 'uploading';
    const showEyeBtn = layout === 'square' && status === 'done';
    const showEditBtn = status === 'done' && fileType === 'image' && allowEdit && originUrl && limitWidth && limitHeight;
    const showDownloadBtn = status === 'done' && downloadUrl;
    const showDeleteBtn = status !== 'uploading';

    return (
      <div className="file-btns">
        {showCancelBtn &&
        <div className="file-btn btn-cancel" onClick={this.handleCancel}>
          取消
        </div>}
        {showEyeBtn &&
        <div className="file-btn">
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            <Icon type="eye" />
          </a>
        </div>}
        {showEditBtn &&
        <div className="link file-btn" onClick={() => onDelete && onEdit(index)}>
          <Icon type="edit" />
        </div>}
        {showDownloadBtn &&
        <div className="file-btn">
          <a href={downloadUrl || null} download>
            <Icon type="download" />
          </a>
        </div>}
        {showDeleteBtn &&
        <div className="link file-btn" onClick={() => onDelete && onDelete(index)}>
          <Icon type="delete" />
        </div>}
      </div>
    );
  }

  render() {
    const { status, rate, sucMsg, errMsg } = this.state;
    const { layout, fileType } = this.props;
    const { fileName, fileUrl } = this.props.file;

    //长条布局
    if (layout === 'rectangle')
    return (
      <div className={`file-item file-rectangle ${status === 'error' ? 'err' : ''}`}>
        <a className="file-icon" href={fileUrl} target="_blank" rel="noopener noreferrer">
          {getFileIcon(fileType, fileName, fileUrl)}
        </a>
        <div className="file-meddle">
          <div  className={`file-name ${status === 'error' || sucMsg ? 'ellipsis-1' : 'ellipsis-2'}`}>{fileName}</div>
          {status === 'uploading' &&
          <div className="upload-rate">
            <div className="rate" style={{ width: rate }} />
          </div>}
          {status === 'error' &&
          <div className="upload-err ellipsis-1">{errMsg}</div>}
          {sucMsg &&
          <div className="upload-success ellipsis-1">{sucMsg}</div>}
        </div>
        {this.renderFileBtns()}
      </div>
    );

    //方块布局
    if (layout === 'square')
    return (
      <div className={`file-item file-square ${status === 'error' ? 'err' : ''}`}>
        <div className="link file-icon">
          {getFileIcon(fileType, fileName, fileUrl)}
        </div>
        <div className="status-wrapper">
          {status === 'uploading' &&
          <div className="upload-rate">
            <div className="rate" style={{ width: rate }} />
          </div>}
          {status === 'error' &&
          <div className="upload-err ellipsis-2">{errMsg}</div>}
        </div>
        {this.renderFileBtns()}
      </div>
    );

    //非法layout参数
    return <div>抱歉，非法layout参数</div>;
  }
}

export default FileItem;
