import React from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { Result } from 'antd';
import './index.less';

class NotFound extends React.PureComponent {
  constructor(props) {
    super(props);
    this.node = document.createElement('div');
    this.node.className = 'page-404';
    document.body.appendChild(this.node);
  }

  componentWillUnmount() {
    document.body.removeChild(this.node);
  }

  render() {

    return createPortal(
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to="/home">Back Home</Link>}
      />,
      this.node
    );
  }
};

export default NotFound;
