import React from 'react';
import { Breadcrumb, Button, message, Form, Input, Select, DatePicker } from 'antd';
import moment from 'moment';
import WordsCountDown from 'components/WordsCountDown';
import UploadFile from 'components/UploadFile';
import http from 'utils/getFetch';

const FromItem = Form.Item;
const Option = Select.Option;

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      countryList: [],
      findsUnit: 1
    }
  }

  componentDidMount() {
    const id = this.getParamsId();
    if (!id) {
      this.addInit();
    } else if (id) {
      this.modInit();
    }
  }

  //判断是新建还是编辑，获取参数id
  getParamsId = () => {
    return this.props.match.params.id;
  }

  //新增初始化
  addInit = () => {
    this.setState({
      countryList: [
        { id: 1, name: '中国' },
        { id: 2, name: '美国' },
        { id: 3, name: '法国' },
        { id: 4, name: '英国' }
      ]
    });
  }

  //修改初始化
  modInit = () => {
    const id = this.getParamsId();
    console.log(id);
    this.setState({
      countryList: [
        { id: 1, name: '中国' },
        { id: 2, name: '美国' },
        { id: 3, name: '法国' },
        { id: 4, name: '英国' }
      ],
      findsUnit: 2
    });
    this.props.form.setFieldsValue({
      name: '其润发',
      countryId: 2,
      findsAmount: '5000亿',
      signTime: moment('2016-03-18'),
      effectRange: [moment('2017-11-10'), moment('2019-12-10')],
      maps: [
        {
          fileName: "gfdwew.jpg",
          fileUrl: "https://img.36krcdn.com/20191219/v2_9e11174e71b944e88a0165d06c50fefb_img_jpg",
          filePath: "/20191219/v2_9e11174e71b944e88a0165d06c50fefb_img_jpg",
          mark: "gfdwew.jpg1576732762828"
        }
      ],
      remark: '这个人很热情'
    });
  }

  //提交
  handleSubmit = () => {
    const { findsUnit } = this.state;
    const id = this.getParamsId();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const [effectStart, effectEnd] = values.effectRange || [];
        const data = {
          ...values,
          id: id ? id : '',
          findsUnit: values.findsAmount ? findsUnit : '',
          signTime: values.signTime ? values.signTime.valueOf() : '',
          effectStart: effectStart ? effectStart.valueOf() : '',
          effectEnd: effectEnd ? effectEnd.valueOf() : '',
          effectRange: ''
        };
        const apiUrl = id ? 'sys/global/asia/mod' : 'sys/global/asia/add';

        this.setState({ loading: true });
        http.post(apiUrl, data)
        .then(() => {
          this.setState({ loading: false });
          message.success('操作成功');
          //新建后跳转回列表首页
          if (!id) {
            setTimeout(() => {
              this.props.history.push('/home/global/asia');
            }, 1500);
          }
        })
        .catch(() => this.setState({ loading: false }));
      }
    });
  }

  render() {
    const { loading, countryList, findsUnit } = this.state;
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    const { name = '', remark = '' } = getFieldsValue();
    const id = this.getParamsId();

    return (
      <div className="layout-flex">
        <div className="flex-header">
          <Breadcrumb>
            <Breadcrumb.Item >世界人员</Breadcrumb.Item>
            <Breadcrumb.Item >亚洲</Breadcrumb.Item>
            <Breadcrumb.Item >{id ? '编辑' : '新建'}</Breadcrumb.Item>
          </Breadcrumb>
          <div>
            <Button type="primary" icon="smile"
              loading={loading}
              onClick={this.handleSubmit}
            >保存</Button>
            <Button ghost type="primary" icon="meh"
              disabled={loading}
              onClick={this.props.history.goBack}
            >取消</Button>
          </div>
        </div>
        <div className="flex-body">
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
            <FromItem label="人员名称">
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: '人员名称必填' },
                  { max: 50, message: '不能超过50个字' },
                ]
              })(
                <Input placeholder="请输入人员名称"
                  addonAfter={<WordsCountDown current={name.length} total={50} />}
                />
              )}
            </FromItem>
            <FromItem label="国家/地区">
              {getFieldDecorator('countryId')(
                <Select placeholder="请选择" allowClear>
                  {countryList.map(item => (
                    <Option key={item.id} value={item.id}>{item.name}</Option>
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
            <FromItem label="人员配图">
              {getFieldDecorator('maps')(
                <UploadFile
                  fileType="image"
                  addBtnType="dragger"
                  accept="image/*,.jpg,.jpeg,.png,.gif"
                  limit={{ width: 500, height: 200 }}
                  maxLength={3}
                  allowCrop
                />
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
              <WordsCountDown style={{ display: 'block' }} current={remark.length} total={100} />
            </FromItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create({})(Page);
