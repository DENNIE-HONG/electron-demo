/**
 * 消息弹窗
 * @param {String}  type    默认是info
 * @param {String}  message 必须，提示文本
 * @author luyanhong
*/
import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import PropTypes from 'prop-types';
import './message.scss';
class Message extends Component {
  static propTypes = {
    type: PropTypes.string,
    message: PropTypes.string.isRequired,
    domNode: PropTypes.node.isRequired
  }

  static defaultProps = {
    type: 'info'
  }

  constructor (props) {
    super(props);
    this.remove();
  }

  // 3秒后清除提示
  remove () {
    const self = this;
    setTimeout(() => {
      self.props.domNode.parentNode.removeChild(self.props.domNode);
      ReactDOM.unmountComponentAtNode(self.props.domNode);
    }, 3000);
  }

  render () {
    const { type, message } = this.props;
    const messageContainer = (
      <div className="message">
        <div className={type}>
          <i className={`iconfont icon-${type}`}></i>{message}
        </div>
      </div>
    );
    return ReactDOM.createPortal(
      <React.Fragment>{ messageContainer }</React.Fragment>,
      this.props.domNode
    );
  }
}
/**
 * 消息提示对外接口
 * @param {Object} option  包括type和message
 * @example
 * showMessage({
 *    type: 'error',
 *    message: '错了'
 * });
*/
function showMessage ({ type, message }) {
  const root = document.createElement('div');
  root.className = 'modal-bg-transparent';
  document.body.appendChild(root);
  render(
    <Message type={type} message={message} domNode={root} />,
    root
  );
}
export default showMessage;
