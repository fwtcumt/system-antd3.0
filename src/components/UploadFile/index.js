import React from 'react';
import { Upload, Button, Icon } from 'antd';
import CropModal from './cropModal';
import FileItem from './fileItem';
import './index.less';

const { Dragger } = Upload;

/**
 * 功能：上传文件
 * @param {string} className 类名
 * @param {object} style 样式对象
 * @param {string} layout 布局类型，可取值：rectangle[default]/square
 * @param {string} fileType 文件类型，可取值：file[default]/image/video/audio
 * @param {string} addBtnType 上传按钮类型，可取值：button[default]/dragger
 * @param {string} accept 允许文件格式，默认值：*
 * @param {object} limit 文件限制对象，值格式：{ size, ratio, width, height }
 * @param {number} maxLength 文件最大数
 * @param {boolean} multiple 是否允许多选，默认值：false
 * @param {boolean} allowCrop 是否允许裁剪图片，默认值：false
 * @param {boolean} allowEdit 是否允许重新裁剪图片，默认值：false
 * @param {array} value 文件列表
 * @param {function} onChange 文件列表变化的回调
*/
class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //裁剪相关
      showCropModal: false,
      cropIndex: '',
      originFile: null,
      cropFile: null
    }
  }

  //删除文件
  handleDelete = (index) => {
    const { value, onChange } = this.props;
    value.splice(index, 1);
    onChange && onChange([...value]);
  }

  //选择文件(第一步)
  handleAdd = () => {
    const { multiple = false, accept = '*' } = this.props;
    const fileInput = document.createElement('input');

    fileInput.type = 'file';
    fileInput.multiple = multiple;
    fileInput.accept = accept;
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    fileInput.click();

    fileInput.onchange = (event) => {
      const files = event.target.files;
      const fileArr = Array(files.length).fill('*');
      document.body.removeChild(fileInput);

      fileArr.forEach((_, i) => {
        //循环校验文件
        this.checkFile(files[i]);
      });
    };
  }

  //校验文件合法性(第二步)
  checkFile = (file) => {
    const { limit = {}, value = [], onChange } = this.props;
    const fileType = this.props.fileType || 'file';
    const fileSize = file.size;
    const limitSize = limit.size;
    const sizeIllegal = limitSize && (fileSize / 1000) > limitSize;

    //文件大小非法
    if (sizeIllegal) {
      value.push({
        fileName: file.name,
        mark: file.name + Date.now(),
        errMsg: '文件过大'
      });
      return onChange && onChange([...value]);
    }

    //校验非图片文件
    if (fileType !== 'image') {
      value.push({
        fileName: file.name,
        mark: file.name + Date.now(),
        file: file
      });
      return onChange && onChange([...value]);
    }

    //初步校验图片
    if (fileType === 'image') {
      const reader = new FileReader();
      reader.onload = () => {
        if (limit.ratio || (limit.width && limit.height)) {
          this.checkImage(file, reader.result);
        } else {
          value.push({
            fileName: file.name,
            fileUrl: reader.result,
            mark: file.name + Date.now(),
            file: file
          });
          onChange && onChange([...value]);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  //进一步校验图片
  checkImage = (file, base64) => {
    const { limit = {}, allowCrop = false, multiple = false, value = [], onChange } = this.props;
    const limitRatio = limit.ratio;
    const limitWidth = limit.width;
    const limitHeight = limit.height;
    const image = new Image();

    image.onload = () => {
      const { width, height } = image;
      const imgRatio = (width / height).toFixed(2);
      if (limitRatio) {
        value.push({
          fileName: file.name,
          mark: file.name + Date.now(),
          file: file,
          errMsg: limitRatio === imgRatio ? '' : '图片宽高比不符'
        });
        return onChange && onChange([...value]);
      } else if (limitWidth === width && limitHeight === height) {
        value.push({
          fileName: file.name,
          mark: file.name + Date.now(),
          file: file
        });
        return onChange && onChange([...value]);
      } else if (multiple || !allowCrop) {
        value.push({
          fileName: file.name,
          mark: file.name + Date.now(),
          file: file,
          errMsg: '图片尺寸不符'
        });
        return onChange && onChange([...value]);
      } else {
        //打开裁剪
        this.setState({
          showCropModal: true,
          originFile: file,
          cropIndex: '',
          cropFile: base64
        });
      }
    }
    image.src = base64;
  }

  //取消裁剪
  handleCancelCrop = () => {
    this.setState({
      showCropModal: false,
      cropIndex: '',
      cropFile: null
    });
  }

  //裁剪完成
  handleCrop = (file, base64) => {
    const { value = [], onChange } = this.props;
    const { originFile, cropIndex } = this.state;

    this.setState({
      showCropModal: false,
      cropIndex: '',
      cropFile: null
    });
    if (cropIndex || cropIndex === 0) {
      //编辑后重新上传
      value[cropIndex].mark = value[cropIndex].fileName + Date.now();
      value[cropIndex].fileUrl = base64;
      value[cropIndex].file = file;
    } else if (originFile) {
      //新图片裁剪后上传
      value.push({
        fileName: originFile.name,
        fileUrl: base64,
        mark: originFile.name + Date.now(),
        file: file
      });
    }
    onChange && onChange([...value]);
  }

  //重新裁剪图片
  handleEdit = (index) => {
    const { value } = this.props;
    this.setState({
      showCropModal: true,
      cropIndex: index,
      originFile: null,
      cropFile: value[index].originUrl
    });
  }

  //渲染顶部上传按钮
  renderTopAddButton = (layout) => {
    const { addBtnType, accept, multiple, maxLength, value = [] } = this.props;

    if (maxLength !== undefined && maxLength <= value.length) return null;

    if (addBtnType === 'dragger') {
      return (
        <div className="dragger-plus">
          <Dragger
            accept={accept || ''}
            multiple={multiple || false}
            fileList={[]}
            beforeUpload={file => {
              this.checkFile(file);
              return false;
            }}
          >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text"></p>
            <p className="ant-upload-hint">点击或者拖拽文件到该区域</p>
          </Dragger>
        </div>
      );
    } else if (layout === 'rectangle') {
      return (
        <Button
          className="rectangle-plus"
          size="small"
          icon="upload"
          onClick={this.handleAdd}
        >Upload</Button>
      );
    }
  }

  //渲染方形内部上传按钮
  renderSquareAddButton = (layout) => {
    const { addBtnType, maxLength, value = [] } = this.props;

    if (addBtnType=== 'dragger') return null;
    if (maxLength !== undefined && maxLength <= value.length) return null;

    if (layout === 'square') {
      return (
        <div className="file-item file-square square-plus">
          <div className="link file-icon" onClick={this.handleAdd}>
            <Icon type="plus" />
          </div>
        </div>
      );
    }
  }

  render() {
    const { layout, fileType, allowEdit, limit, value, className, style } = this.props;
    const wrapperStyle = style || {};
    const fileList = value || [];
    const showLayout = layout || 'rectangle';
    const showType = fileType || 'file';

    return (
      <div className={`upload-file-site ${className || ''}`} style={{...wrapperStyle}}>
        {this.renderTopAddButton(showLayout)}
        <div className="file-list">
          {fileList.map((v, i) => {
            const vProps = {
              index: i,
              file: v,
              layout: showLayout,
              fileType: showType,
              limit: limit,
              allowEdit: allowEdit,
              onDelete: this.handleDelete,
              onEdit: this.handleEdit
            };
            return <FileItem key={v.mark} {...vProps}/>;
          })}
          {this.renderSquareAddButton(showLayout)}
        </div>
        <CropModal
          limit={this.props.limit}
          cropFile={this.state.cropFile}
          visible={this.state.showCropModal}
          onOk={this.handleCrop}
          onCancel={this.handleCancelCrop}
        />
      </div>
    );
  }
}

export default UploadFile;
