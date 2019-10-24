/**
 * 按钮基本组件 展示组件
 * @param {String} type, primary / success / warning / error / info
 * @param {String} icon, 按钮带icon，默认没有
 * @author luyanhong 2018-12-19
 */
import React from 'react';
import PropTypes from 'prop-types';
import './BaseButton.scss';
const BaseButton = (props) => {
  const {
    type, children, icon, ...rest
  } = props;
  return (
    <button type="button" className={type ? `btn-${type}` : 'btn'} {...rest}>
      {icon && <i className={`iconfont icon-${icon}`}></i>}
      {children}
    </button>
  );
};
BaseButton.propTypes = {
  icon: PropTypes.string,
  type: (props, propName) => {
    if (props[propName] && ['primary', 'success', 'info', 'error', 'warning'].indexOf(props[propName]) === - 1) {
      return new Error('type类型不对');
    }
  }
};
BaseButton.defaultProps = {
  type: '',
  icon: ''
};
export default BaseButton;
