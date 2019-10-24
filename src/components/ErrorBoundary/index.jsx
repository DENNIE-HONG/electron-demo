/**
 * @file 出错模块 展示组件
 * @author luyanhong 2019-08
 */
import React from 'react';
import ErrorImg from 'assets/img/error.jpeg';
import PropTypes from 'prop-types';
import './ErrorBoundary.scss';
const ErrorBoundary = (props) => {
  const { hasError, children, reStart } = props;
  if (hasError) {
    return (
      <div className="error">
        <h2 className="error-title">bibi~ 崩溃啦！</h2>
        <p className="error-desc">别担心上车，我带你回去。</p>
        <div className="error-btn" onClick={reStart}>返回主页</div>
        <div className="error-pic">
          <img className="error-img" src={ErrorImg} />
        </div>
      </div>
    );
  }
  return children;
};
ErrorBoundary.propTypes = {
  hasError: PropTypes.bool,
  reStart: PropTypes.func
};
ErrorBoundary.defaultProps = {
  hasError: false,
  reStart: function () {}
};
export default ErrorBoundary;
