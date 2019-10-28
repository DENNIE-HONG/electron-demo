/**
 * @file history前进、后退模块 展示组件
 * @author luyanhong 2019-09-03
 */
import React from 'react';
import PropTypes from 'prop-types';
function noop () {}
const SearchHeaderHistory = (props) => {
  const {
    backHistory, forwardHistory, disableBack, backCount
  } = props;
  return (
    <div className="search-h-history">
      <i className={`iconfont icon-left${disableBack ? ' disable' : ''}`} onClick={backHistory}></i>
      <i className={`iconfont icon-right${backCount ? '' : ' disable'}`} onClick={forwardHistory}></i>
    </div>
  );
};
SearchHeaderHistory.propTypes = {
  backHistory: PropTypes.func,
  forwardHistory: PropTypes.func,
  disableBack: PropTypes.bool,
  backCount: PropTypes.number
};
SearchHeaderHistory.defaultProps = {
  backHistory: noop,
  forwardHistory: noop,
  disableBack: false,
  backCount: 0
};
export default SearchHeaderHistory;
