import React from 'react';
import './index.less';

/**
 * 功能：文字计数器，超过设定的数值后会自动标红
 * @param {object} style 样式对象
 * @param {number} total 总字数
 * @param {number} current 当前字数数
*/
export default (props) => {
  const { style = {}, total = 0, current = 0 } = props;
  const isWarn = current > total;
  return (
    <span style={style} className={`words-count ${isWarn ? 'warn' : ''}`}>{current}/{total}</span>
  );
}
