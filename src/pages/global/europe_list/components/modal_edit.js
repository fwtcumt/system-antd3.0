import React from 'react';
import { Modal, Form, Input, Select, DatePicker, message } from 'antd';
import WordsCount from 'components/WordsCount';
import locationSearch from 'utils/locationSearch';
import http from 'utils/getFetch';

const FromItem = Form.Item;
const Option = Select.Option;

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      findsUnit: 1
    }
  }

  componentDidUpdate(preProps) {
    const { visible } = this.props;
    if (preProps.visible === visible) {
      return;
    } else if (visible === 'isNew') {
      this.addInit();
    } else if (visible === 'isMod') {
      this.modInit();
    }
  }

  //关闭弹框
  handleClose = () => {
    const { form, onClose } = this.props;

    form.resetFields();
    onClose && onClose();
  }

  //新增初始化
  addInit = () => {
    console.log('add');
  }

  //修改初始化
  modInit = () => {
    const { record, form } = this.props;
    form.setFieldsValue({
      name: record.name
    });
  }

  //提交
  handleSubmit = () => {
    const { findsUnit } = this.state;
    const { visible, record, form, onOk } = this.props;
    const isMod = visible === 'isMod';

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const [effectStart, effectEnd] = values.effectRange || [];
        const data = {
          ...values,
          id: isMod ? record.id : '',
          findUnit: values.findsAmount ? findsUnit : '',
          signTime: values.signTime ? values.signTime.valueOf() : '',
          effectStart: effectStart ? effectStart.valueOf() : '',
          effectEnd: effectEnd ? effectEnd.valueOf() : '',
          effectRange: ''
        };
        const apiUrl = isMod ? 'sys/global/asia/mod' : 'sys/global/asia/add';

        this.setState({ loading: true });
        http.post(apiUrl, data)
        .then(() => {
          //新增完成把列表置到首页
          if (!isMod) locationSearch.set({ pageNo: '1' });
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
    const { loading, findsUnit } = this.state;
    const { visible } = this.props;
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    const { name = '', remark = '' } = getFieldsValue();

    return (
      <Modal
        title={visible === 'isMod' ? '编辑' : '新建'}
        width="600px"
        visible={!!visible}
        confirmLoading={loading}
        onCancel={this.handleClose}
        onOk={this.handleSubmit}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <FromItem label="人员名称">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: '人员名称必填' },
                { max: 50, message: '不能超过50个字' },
              ]
            })(
              <Input placeholder="请输入人员名称"
                addonAfter={<WordsCount current={name.length} total={50} />}
              />
            )}
          </FromItem>
          <FromItem label="所属国家">
            {getFieldDecorator('country')(
              <Select placeholder="请选择" allowClear>
                {this.props.countryList.map(item => (
                  <Option key={item.code} value={item.code}>{item.name}</Option>
                ))}
              </Select>
            )}
          </FromItem>
          <FromItem label="拥有资金">
            {getFieldDecorator('findsAmount')(
              <Input placeholder="请输入金额"
                addonAfter={
                  <Select placeholder="请选择" style={{ width: 90 }}
                    value={findsUnit}
                    onChange={v => this.setState({ findsUnit: v })}
                  >
                    <Option value={1}>元</Option>
                    <Option value={2}>美元</Option>
                  </Select>
                }
              />
            )}
          </FromItem>
          <FromItem label="签约时间">
            {getFieldDecorator('signTime')(
              <DatePicker style={{ width: '100%' }} />
            )}
          </FromItem>
          <FromItem label="生效区间">
            {getFieldDecorator('effectRange')(
              <DatePicker.RangePicker style={{ width: '100%' }} />
            )}
          </FromItem>
          <FromItem label="备注" extra="100字以内。修改时请勿删除已有重要信息">
            {getFieldDecorator('remark', {
              rules: [
                { max: 100, message: '不能超过100个字' },
              ]
            })(
              <Input.TextArea rows={6} placeholder="请输入备注信息" />
            )}
            <WordsCount style={{ display: 'block' }} current={remark.length} total={100} />
          </FromItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({})(EditModal);
