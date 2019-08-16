/**
 * @file 标签栏
 * @author luyanhong 2019-08-16
 */
import React from 'react';
import PropTypes from 'prop-types';
const BaseTabsPane = (props) => {
  const { children, label } = props;
  return (
    <li className="tabs-pane" key={label}>{children}</li>
  );
};
BaseTabsPane.propTypes = {
  label: PropTypes.string.isRequired
};
export default BaseTabsPane;
