/**
 * 每列表格模块
 * @param {String} prop, 该列显示的是data的哪个属性
 * @param {String} label, 该列表格标题
 * @param {String} width, 该列表格宽度
 * @param {String} className, 该列样式类名
 * @author luyanhong 2019-07-10
 */
import React from 'react';
import PropTypes from 'prop-types';

const BaseTableColumn = (props) => {
  const { children, className } = props;
  return (
    <td className={`table-td ${className}`}>
      <div className="table-td-content"><span>{children}</span></div>
    </td>
  );
};
BaseTableColumn.propTypes = {
  width: PropTypes.string,
  className: PropTypes.string
};
BaseTableColumn.defaultProps = {
  width: '',
  className: ''
};
export default BaseTableColumn;
