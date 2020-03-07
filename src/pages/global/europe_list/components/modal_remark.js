import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import WordsCountDown from 'components/WordsCountDown';
import http from 'utils/getFetch';

const FromItem = Form.Item;

class RemarkModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  componentDidUpdate(preProps) {
    const { visible } = this.props;
    if (preProps.visible === visible) {
      return;
    } else if (visible) {
      this.modInit();
    }
  }

  //关闭弹框
  handleClose = () => {
    const { form, onClose } = this.props;

    form.resetFields();
    onClose && onClose();
  }

  //修改初始化
  modInit = () => {
    const { record, form } = this.props;
    form.setFieldsValue({
      remark: record.remark
    });
  }

  //提交
  handleSubmit = () => {
    const { record, form, onOk } = this.props;

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = { id: record.id, ...values };

        this.setState({ loading: true });
        http.post('sys/global/asia/remark', data)
        .then(() => {
          this.setState({ loading: false });
          message.success('操作成功');
          this.handleClose();
          onOk && onOk();
        })
        .catch(() => this.setState({ loading: false }));
      }
    });
  }

  render() {
    const { visible } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const remark = getFieldValue('remark') || '';

    return (
      <Modal
        title="备注信息"
        width="600px"
        visible={visible}
        confirmLoading={this.state.loading}
        onCancel={this.handleClose}
        onOk={this.handleSubmit}
      >
        <Form>
          <FromItem extra="100字以内。修改时请勿删除已有重要信息">
            {getFieldDecorator('remark', {
              rules: [
                { max: 100, message: '不能超过50个字' },
              ]
            })(
              <Input.TextArea rows={6} placeholder="请输入备注信息" />
            )}
            <WordsCountDown style={{ display: 'block' }} current={remark.length} total={100} />
          </FromItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({})(RemarkModal);
