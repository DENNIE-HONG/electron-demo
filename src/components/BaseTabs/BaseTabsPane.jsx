/**
 * @file 标签栏
 * @param {string} label，标签标题
 * @param {string} name, 标签名字
 * @param {string} className
 * @author luyanhong 2019-08-16
 */
import React from 'react';
import PropTypes from 'prop-types';

const BaseTabsPane = (props) => {
  const {
    children, label, name, onClick, className
  } = props;
  return (
    <li className={`tabs-pane ${className}`} key={label} onClick={onClick.bind(null, name)}>{children}</li>
  );
};
BaseTabsPane.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
};
BaseTabsPane.defaultProps = {
  onClick: undefined,
  className: ''
};
export default BaseTabsPane;
