import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import locationSearch from 'utils/locationSearch';

const FormItem = Form.Item;
const Option = Select.Option;

class Filter extends React.Component {

  componentDidMount() {
    //如果列表有默认筛选项，数据初始化必须在这里进行
    this.handleReset(true);
  }

  //点击搜索按钮
  handleSearch = () => {
    const values = this.props.form.getFieldsValue();
    const dealedValues = { pageNo: 1 }; //重置到第一页
    //处理各字段
    for(let attr in values) {
      dealedValues[attr] = values[attr];
    }

    locationSearch.set(dealedValues);
    this.props.onChange();
  }

  //重置筛选项(无默认筛选项)
  handleReset = (isInit) => {
    if (isInit !== true) {
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
      country: filter.country
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

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

        {/* 按钮 */}
        <FormItem colon={false}>
          <Button.Group>
            <Button icon="search" onClick={this.handleSearch}>搜索</Button>
            <Button icon="redo" onClick={this.handleReset}>重置</Button>
          </Button.Group>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create({})(Filter);
