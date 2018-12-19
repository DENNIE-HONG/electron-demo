/**
 * 按钮基本组件
 * @param {String} type, primary / success / warning / error / info
 * @param {String} icon
 * @author luyanhong 2018-12-19
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './BaseButton.scss';
class BaseButton extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    type: (props, propName) => {
      if (props[propName] && ['primary', 'success', 'info', 'error', 'warning'].indexOf(props[propName]) === - 1) {
        return new Error('type类型不对');
      }
    }
  }

  static defaultProps = {
    type: '',
    icon: ''
  }

  render () {
    const {
      type, children, icon, ...rest
    } = this.props;
    return (
      <button type="button" className={type ? `btn-${type}` : 'btn'} {...rest}>
        {icon && <i className={`iconfont icon-${icon}`}></i>}
        {children}
      </button>
    );
  }
}
export default BaseButton;
