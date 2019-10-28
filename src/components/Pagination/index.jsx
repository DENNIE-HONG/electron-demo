/**
 * 分页模块 展示模块
 * @param {Number}  total, 总页数，必须
 * @param {Number}  current, 当前页，默认1
 * @param {Number}  pagerCount, 按钮个数， 一般是3个，奇数
 * @param {Funtion} onChange, 点击按钮的回调事件
 * @param {Array}   range, 按钮数组
 * @author luyanhong 2019-01
*/
import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';
const Pagination = (props) => {
  const {
    total, pagerCount, current, onChange, range
  } = props;
  return (
    <div className="pager">
      {total > pagerCount
      && (
        <span className="pager-btn" onClick={() => onChange(current - 1)}>
          <i className="iconfont icon-left"></i>
        </span>
      )}
      {range.map((item) => (
        <span className={`pager-btn ${current === item ? 'active' : ''}`} key={item} onClick={() => onChange(item)}>{item}</span>
      ))}
      {total > pagerCount
      && (
        <span className="pager-btn" onClick={() => onChange(current + 1)}>
          <i className="iconfont icon-right"></i>
        </span>
      )}
    </div>
  );
};
Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  current: PropTypes.number,
  pagerCount: (props, propName) => {
    if (props[propName] % 2 === 0) {
      return new Error('分页按钮个数必须是奇数');
    }
  },
  onChange: PropTypes.func,
  range: PropTypes.array
};
Pagination.defaultProps = {
  current: 1,
  pagerCount: 3,
  onChange: undefined,
  range: []
};
export default Pagination;
