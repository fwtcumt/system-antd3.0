import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Modal, Slider } from 'antd';

class CropModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marks: { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10'},
      scale: 1
    }
  }

  handleOk = () => {
    const { onOk } = this.props;

    const base64 = this.avatarEditor.getImageScaledToCanvas().toDataURL('image/png');
    fetch(base64)
    .then(res => res.blob())
    .then(blob => {
      this.setState({scale: 1 });
      onOk && onOk(blob, base64);
    });
  }

  handleCancel = () => {
    const { onCancel } = this.props;

    this.setState({scale: 1 });
    onCancel && onCancel();
  }

  render() {
    //crop 尺寸 700 * 400
    const { visible, limit = {}, cropFile } = this.props;
    const limitWidth = limit.width;
    const limitHeight = limit.height;
    
    if (!limitWidth || !limitWidth || !cropFile) return null;

    const borderX = 700 - limitWidth >= 10 ? (700 - limitWidth) / 2 : 50;
    const borderY = 400 - limitHeight >= 10 ? (400 - limitHeight) / 2 : 50;

    return (
      <Modal
        visible={visible}
        width="748px"
        title={`图片裁剪 ${limitWidth} * ${limitHeight}`}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
      >
        <div className="upload-modal-body">
          <div className="upload-image-crop">
            <AvatarEditor
              ref={ele => this.avatarEditor = ele}
              image={cropFile}
              width={limitWidth}
              height={limitHeight}
              scale={this.state.scale}
              border={[borderX, borderY]}
              color={[0, 0, 0, 0.8]}
              crossOrigin="anonymous"
            />
          </div>
        </div>
        <Slider
          min={1}
          max={10}
          step={0.1}
          marks={this.state.marks}
          value={this.state.scale}
          onChange={v => this.setState({ scale: v })}
        />
      </Modal>
    );
  }
}

export default CropModal;
