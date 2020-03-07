import React from 'react';
import { Divider, Modal } from 'antd';

export default ({ rowKeys, onClear }) => {
  const rowsLen = rowKeys.length;

  return (
    <div className="table-header-bar">
      <div>
        <span>
          已选中 <b>{rowsLen}</b> 项
        </span>
        <Divider type="vertical" />
        <span
          className="link"
          disabled={rowsLen === 0}
          onClick={rowsLen > 0 ? onClear : null}
        >清空</span>
        <Divider type="vertical" />
        <span
          className="link"
          disabled={rowsLen === 0}
          onClick={() => {
            rowsLen > 0 && Modal.info({
              title: '提示',
              content: rowKeys.join(',')
            });
          }}
        >批量删除</span>
      </div>
    </div>
  );
}
