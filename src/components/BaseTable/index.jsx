/**
 * 表格列表模块
 * @param {Array}    data, 数据
 * @param {String}   keyName, 用data.keyName当做每行表格的key
 * @param {Boolean}  isIndex, 是否需要数字索引，默认否
 * @author luyanhong 2019-07-09
 * @example
 * <BaseTable data={xxx}>
 *  <BaseTableColumn prop="name" label="名字"></BaseTableColumn>
 * </BaseTable>
 */
import React from 'react';
import './BaseTable.scss';
import PropTypes from 'prop-types';
import BaseTableColumn from './BaseTableColumn';

const BaseTable = (props) => {
  const {
    data, keyName, children, isIndex
  } = props;
  const column = (item) => (
    children.map((child, index) => {
      const { prop } = child.props;
      if (prop) {
        return (
          <BaseTableColumn key={index}>{item[prop]}</BaseTableColumn>
        );
      }
      return (child);
    })
  );
  // 表单头部
  const headTable = children.map((child) => {
    const { label = '', prop, width } = child.props;
    return (
      <th key={prop + label} className="table-th" style={{ width: `${width}px` }}>{label}</th>
    );
  });
  return (
    <table className="table">
      <thead className="table-thead">
        <tr>
          {isIndex && <th className="table-th-index"></th>}
          {headTable}
        </tr>
      </thead>
      <tbody className="">
        {data.map((item, index) => (
          <tr key={item[keyName]} className="table-tr">
            {isIndex && <BaseTableColumn key={index} className="table-td-index">{index + 1}</BaseTableColumn>}
            {column(item)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
BaseTable.propTypes = {
  data: PropTypes.array,
  keyName: PropTypes.string,
  isIndex: PropTypes.bool
};
BaseTable.defaultProps = {
  data: {},
  keyName: '',
  isIndex: false
};
export default BaseTable;
export { BaseTableColumn };
