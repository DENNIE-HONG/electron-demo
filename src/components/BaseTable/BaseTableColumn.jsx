/**
 * 每列表格模块
 * @param {String} prop, 该列显示的是data的哪个属性
 * @param {String} label, 该列表格标题
 * @param {String} width, 该列表格宽度
 * @param {String} className, 该列样式类名
 * @param {String} onClick, 点击回调事件, 参数是第几个数据索引
 * @param {String} idx，是第几个数据
 * @author luyanhong 2019-07-10
 */
import React from 'react';
import PropTypes from 'prop-types';

const BaseTableColumn = (props) => {
  const {
    children, className, onClick, idx
  } = props;

  const callback = () => {
    onClick && onClick(idx);
  };
  return (
    <td className={`table-td ${className}`} onClick={callback}>
      <div className="table-td-content"><span>{children}</span></div>
    </td>
  );
};
BaseTableColumn.propTypes = {
  width: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  idx: PropTypes.number
};
BaseTableColumn.defaultProps = {
  width: '',
  className: '',
  onClick: undefined,
  idx: 0
};
export default BaseTableColumn;
