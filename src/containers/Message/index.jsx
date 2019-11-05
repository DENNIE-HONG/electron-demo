/**
 * 消息弹窗 容器组件
 * @param {String}  type    默认是info
 * @param {String}  message 必须，提示文本
 * @author luyanhong
*/
import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import PropTypes from 'prop-types';
import MessageCom from 'coms/Message';
function MessageContainer (WrappedComponent) {
  return class extends Component {
    static propTypes = {
      type: PropTypes.string,
      message: PropTypes.string.isRequired,
      domNode: PropTypes.object.isRequired
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
      const { type, message, domNode } = this.props;
      const newProps = {
        type,
        message
      };
      return ReactDOM.createPortal(
        <React.Fragment>
          <WrappedComponent {...newProps} />
        </React.Fragment>,
        domNode
      );
    }
  };
}
const Message = MessageContainer(MessageCom);

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
