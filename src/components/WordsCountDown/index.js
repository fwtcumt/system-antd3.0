import React from 'react';
import './index.less';

/**
 * 功能：超过设定的数值后会自动标红
 * @param {object} style 样式对象
 * @param {number} total 总数
 * @param {number} current 当前数
*/
export default (props) => {
  const { total = 0, current = 0, style = {}} = props;
  const beRed = current > total;
  return (
    <span className={`words-count-down ${beRed ? 'warn' : ''}`} style={style}>{current}/{total}</span>
  );
}
