/**
 * 表格列表模块
 * @param {Array}    data, 数据
 * @param {String}   keyName, 用data.keyName当做每行表格的key
 */
import React from 'react';
import './BaseTable.scss';
import BaseTableColumn from './BaseTableColumn';
const BaseTable = (props) => {
  const {
    data, keyName, children
  } = props;
  console.log(children);
  const column = (item) => (
    children.map((child, index) => {
      const { prop, secondProp } = child.props;
      item = secondProp ? item[secondProp] : item;
      if (prop) {
        return (
          <BaseTableColumn key={index}>{Array.isArray(item) ? item[0][prop] : item[prop]}</BaseTableColumn>
        );
      }
      return (child);
    })
  );
  return (
    <table className="table">
      <tbody className="">
        {data.map((item) => (
          <tr key={item[keyName]} className="table-tr">
            {column(item)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default BaseTable;
export { BaseTableColumn };
