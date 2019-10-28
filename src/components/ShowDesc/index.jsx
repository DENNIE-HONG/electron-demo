/**
 * 简介展开收起模块  展示组件
 * @param {String}   text, 必须，文案
 * @param {Boolean}  isOpen,  是否展开，默认收起
 * @param {Number}   maxHeight, 收起时候最大高度, 默认100px
 * @param {Function} showDesc, 必须，点击展开收起按钮事件
 * @param {Object}   style,
 * @author luyanhong
 * @example
 * <ShowDesc text={xxx} />
*/
import React from 'react';
import PropTypes from 'prop-types';
import './ShowDesc.scss';
const ShowDesc = (props) => {
  const {
    children, isOpen, text, style, showDesc, hasDescBtn, $desc
  } = props;
  return (
    <>
      <div
        className="show-desc"
        style={style}
      >
        {children}
        <pre ref={$desc} className="show-desc-txt">{text}</pre>
      </div>
      {hasDescBtn && (
        <div
          className={`pull-right show-desc-btn ${isOpen ? 'active' : ''}`}
          onClick={showDesc}
        >
          <span className="on">展开</span>
          <span className="off">收起</span>
          <i className="iconfont icon-down on"></i>
          <i className="iconfont icon-up off"></i>
        </div>
      )}
    </>
  );
};
ShowDesc.propTypes = {
  isOpen: PropTypes.bool,
  maxHeight: PropTypes.number,
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
  showDesc: PropTypes.func,
  hasDescBtn: PropTypes.bool,
  $desc: PropTypes.object
};

ShowDesc.defaultProps = {
  isOpen: false,
  maxHeight: 100,
  style: null,
  hasDescBtn: false,
  showDesc: () => {},
  $desc: null
};
export default ShowDesc;
