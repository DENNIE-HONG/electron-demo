/**
 * 每列表格模块 展示组件
 * @param {String}   prop, 该列显示的是data的哪个属性
 * @param {String}   label, 该列表格标题
 * @param {String}   width, 该列表格宽度
 * @param {String}   className, 该列样式类名
 * @param {String}   onClick, 点击回调事件, 参数是第几个数据索引
 * @param {String}   idx，是第几个数据
 * @param {Function} render, 渲染函数
 * @param {Object}   item, 该行数据
 * @author luyanhong 2019-07-10
 */
import React from 'react';
import PropTypes from 'prop-types';

const BaseTableColumn = (props) => {
  const {
    className, onClick, idx, render, item, ...rest
  } = props;
  const { children } = props;
  const callback = () => {
    onClick && onClick(idx);
  };
  return (
    <td className={`table-td ${className}`} onClick={callback} {...rest}>
      <div className="table-td-content"><span>{render ? render(item) : children}</span></div>
    </td>
  );
};
BaseTableColumn.propTypes = {
  width: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  idx: PropTypes.number,
  render: PropTypes.func,
  item: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};
BaseTableColumn.defaultProps = {
  width: '',
  className: '',
  onClick: undefined,
  idx: 0,
  render: undefined,
  item: {}
};
export default BaseTableColumn;
