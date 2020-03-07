import React from 'react';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import moment from 'moment';
import locationSearch from 'utils/locationSearch';

const FormItem = Form.Item;
const Option = Select.Option;

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    }
  }

  componentDidMount() {
    //如果列表有默认筛选项，数据初始化必须在这里进行
    this.handleReset(true);
  }

  //展开、闭合切换
  toggleExpand = () => {
    const father = this.props.father;
    
    this.setState(({ expand }) => {
      return { expand: !expand };
    }, () => {
      //调整表格滚动尺寸
      if (father && father.fixTableSize) {
        father.fixTableSize();
      }
    });
  }

  //点击搜索按钮
  handleSearch = () => {
    const values = this.props.form.getFieldsValue();
    const dealedValues = { pageNo: 1 }; //重置到第一页
    //处理各字段
    for(let attr in values) {
      if (attr === 'signTime' && values[attr]) {
        dealedValues[attr] = values[attr].valueOf();
      } else if (attr === 'effectRange' && values[attr]) {
        const value = values[attr];
        dealedValues.effectStart = value[0] ? value[0].valueOf() : undefined;
        dealedValues.effectEnd = value[1] ? value[1].valueOf() : undefined;
      } else {
        dealedValues[attr] = values[attr];
      }
    }

    locationSearch.set(dealedValues);
    this.props.onChange();
  }

  //重置筛选项(无默认筛选项)
  // handleReset = (isInit) => {
  //   if (isInit !== true) {
  //     locationSearch.cover({ pageNo: 1 });
  //   }
  //   this.mapSearchToForm();
  //   this.props.onChange();
  // }

  //重置筛选项(有默认筛选项)
  handleReset = (isInit) => {
    if (isInit === true) {
      locationSearch.feed({ country: '8' });
    } else {
      locationSearch.cover({ pageNo: 1 });
    }
    this.mapSearchToForm();
    this.props.onChange();
  }

  //同步地址栏信息到form
  mapSearchToForm = () => {
    const filter = locationSearch.get();
    
    this.props.form.setFieldsValue({
      name: filter.name,
      country: filter.country,
      signTime: filter.signTime ? moment(Number(filter.signTime)) : undefined,
      effectRange: filter.effectStart && filter.effectEnd ? [moment(Number(filter.effectStart)), moment(Number(filter.effectEnd))] : undefined
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { expand } = this.state;
    const hideClass = expand ? '' : 'hide';


    return (
      <Form layout="inline" className="table-filter-form">
        <FormItem label="人员名称">
          {getFieldDecorator('name')(
            <Input allowClear placeholder="人员名称" style={{ width: 200 }} />
          )}
        </FormItem>
        <FormItem label="国家/地区">
          {getFieldDecorator('country')(
            <Select allowClear placeholder="全部" style={{ width: 200 }}>
              {this.props.countryList.map(item => <Option key={item.code} value={String(item.code)}>{item.name}</Option>)}
            </Select>
          )}
        </FormItem>
        <FormItem label="签约时间">
          {getFieldDecorator('signTime')(
            <DatePicker allowClear style={{ width: 200 }} />
          )}
        </FormItem>
        <FormItem className={hideClass} label="生效区间">
          {getFieldDecorator('effectRange')(
            <DatePicker.RangePicker allowClear style={{ width: 516 }} />
          )}
        </FormItem>

        {/* 按钮 */}
        <FormItem colon={false}>
          <Button.Group>
            <Button icon="search" onClick={this.handleSearch}>搜索</Button>
            <Button icon="redo" onClick={this.handleReset}>重置</Button>
            <Button
              icon={expand ? 'up' : 'down'}
              onClick={this.toggleExpand}
            >{expand ? '收起' : '展开'}</Button>
          </Button.Group>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create({})(Filter);
