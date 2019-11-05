/**
 * 消息弹窗 展示组件
 * @param {String}  type    默认是info
 * @param {String}  message 必须，提示文本
 * @author luyanhong
*/
import React from 'react';
import PropTypes from 'prop-types';
import './message.scss';
const Message = (props) => {
  const { type, message } = props;
  return (
    <div className="message">
      <div className={type}>
        <i className={`iconfont icon-${type}`}></i>{message}
      </div>
    </div>
  );
};
Message.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string.isRequired
};

Message.defaultProps = {
  type: 'info'
};
export default Message;
