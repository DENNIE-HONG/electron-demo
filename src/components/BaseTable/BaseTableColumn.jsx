/**
 * 每列表格模块
 * @param {String} prop, 该列显示的是data的哪个属性
 */
import React from 'react';
const BaseTableColumn = (props) => {
  const { prop, children, width } = props;
  return (
    <td style={{ width: `${width}px` }}>{children}</td>
  );
};
export default BaseTableColumn;
