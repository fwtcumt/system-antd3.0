import React from 'react';
import { Link } from 'react-router-dom';
import { Column, Ring, Liquid } from '@antv/g2plot';
import { Card, Icon, Button } from 'antd';
import http from 'utils/getFetch';
import './index.less';

class DataStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabList: [],
      commonNavs: []
    }
  }

  componentDidMount() {
    this.getData();
    setTimeout(() => {
      this.renderColumnPlot();
      this.renderRingPlot();
      this.renderLiquidPlot();
    }, 200);
  }

  getData = () => {
    http.post('sys/stat').then(res => {
      this.setState({
        tabList: res.tabList,
        commonNavs: res.commonNavs
      });
    });
  }

  renderColumnPlot = () => {
    const data = [
      { year: '2016 年', sales: 100 },
      { year: '2017 年', sales: 121 },
      { year: '2018 年', sales: 110 },
      { year: '2019 年', sales: 145 },
      { year: '2020 年', sales: 90 },
    ];
    
    this.columnPlot = new Column('c1', {
      data,
      forceFit: true,
      padding: 'auto',
      xField: 'year',
      yField: 'sales',
      colorField: 'year',
      barSize: 40,
      meta: {
        year: {
          alias: '年份',
        },
        sales: {
          alias: '销售额(万)',
        },
      },
    });
    
    this.columnPlot.render();
  }

  renderRingPlot = () => {
    const data = [
      {
        type: '集团',
        value: 100,
      },
      {
        type: '开发',
        value: 80,
      },
      {
        type: '运营',
        value: 60,
      },
      {
        type: '销售',
        value: 20,
      }
    ];

    this.ringPlot = new Ring('c2', {
      forceFit: true,
      radius: 1,
      innerRadius: 0.6,
      padding: [0,0,0,0],
      data,
      angleField: 'value',
      colorField: 'type',
    });
    
    this.ringPlot.render();
  }

  renderLiquidPlot = () => {
    this.liquidPlot = new Liquid('c3', {
      forceFit: true,
      statistic: 'normal',
      min: 0,
      max: 1000,
      value: 420,
      showValue: true,
    });
    this.liquidPlot.render();
  }

  render() {
    const { tabList, commonNavs } = this.state;

    return (
      <div className="page-stat">
        <div className="stat-tabs">
          {tabList.map((item, i) => (
            <div className={`stat-tab tab${i + 1}`} key={i}>
              <div className="stat-title">{item.name}</div>
              <div className="stat-number">{item.value}</div>
            </div>
          ))}
        </div>
        <div className="stat-cards">
          <Card
            className="card-l"
            size="small"
            title="常用功能导航"
            extra={<Link to="/"><Icon type="more" /></Link>}
          >
            <div className="card-body common-navs">
              {commonNavs.map((item, i) => (
                <div className="common-nav" key={i}>
                  <Link to="/">
                    <Button className="nav-icon" size="large" shape="circle" icon={item.icon} />
                  </Link>
                  <span className="nav-name">{item.name}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card
            className="card-r"
            size="small"
            title="今日待办"
            extra={<Link to="/"><Icon type="more" /></Link>}
          >
            <div className="card-body">
              <div id="c3"></div>
            </div>
          </Card>
        </div>
        <div className="stat-cards">
          <Card
            className="card-l"
            size="small"
            title="出入境人数"
            extra={<Link to="/"><Icon type="more" /></Link>}
          >
            <div className="card-body">
              <div id="c1"></div>
            </div>
          </Card>
          <Card
            className="card-r"
            size="small"
            title="各层机关人数"
            extra={<Link to="/"><Icon type="more" /></Link>}
          >
            <div className="card-body">
              <div id="c2"></div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default DataStat;
