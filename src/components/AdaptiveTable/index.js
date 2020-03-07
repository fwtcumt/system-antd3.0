import React from 'react';
import { Table } from 'antd';
import './index.less';

/**
 * 功能：表格滚动区域自适应父元素宽高
 * @param {string} className 类名
 * @param {object} style 样式对象
 * @param {object} father 用于回流内部 fixTableSize() 函数的对象
 * @注意
 * 1. 除了scroll属性强制无效外，其他属性同antd的Table
 * 2. 表格组件必须放在一个具有宽高的容器中
 * 3. 必须给所有的column都设置上整数width值，用于计算表格是否需要X向滚动
 * 4. 几个默认属性：bordered = true; size="middle"; rowKey="id"
*/
class AdaptiveTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: props.columns,
      scrollState: {}
    }
  }

  componentDidUpdate(preProps) {
    const preSource = preProps.dataSource || [];
    const curSource = this.props.dataSource || [];

    if (!preSource[0] && curSource[0]) {
      this.fixTableSize();
      this.bindFather();
    }
  }

  //让Table滚动适应父元素
  fixTableSize = () => {
    const { columns = [] } = this.props;
    const ele_site = document.querySelector('.adaptive-table-site');
    const ele_hd = document.querySelector('.adaptive-table-site .ant-table-thead');
    const vx = ele_site.clientWidth;  //表格容器宽度
    const vh = ele_site.clientHeight; //表格容器高度
    const h = ele_hd.clientHeight;    //表格头部高度
    let columnsWith = 0; //表格所有列的宽度和

    columns.forEach(v => {
      if (typeof v.width === 'number') {
        columnsWith += v.width;
      }
    });

    if (columnsWith > vx) {
      //列宽度和大于容器宽度时设置x滚动
      this.setState({ scrollState: { x: vx, y: vh - h - 40 } });
    } else {
      //容器足够大，不设置x滚动，去掉列固定
      this.setState({
        scrollState: { y: vh - h - 40 },
        columns: columns.map(v => {
          if (v.fixed) v.fixed = false;
          return v;
        })
      });
    }
  }

  //用于方法回流至父级
  bindFather = () => {
    const { father } = this.props;

    if (father) {
      father.fixTableSize = this.fixTableSize;
    }
  }

  render() {
    const { className, style, father, scroll, ...rest } = this.props;
    const { columns, scrollState } = this.state;
    const wrapperStyle = style || {};
    
    return (
      <div className={`adaptive-table-site ${className || ''}`} style={{...wrapperStyle}}>
        <Table bordered size="middle" rowKey="id" {...rest} columns={columns} scroll={scrollState} />
      </div>
    );
  }
}

export default AdaptiveTable;
