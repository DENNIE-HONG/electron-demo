/**
 * 通用详情页头部 展示组件
 * @param {String} picUrl, 图片url
 * @param {String} name, 标题
 * @param {String} tag, 标签
 * @param {Number} width, 图片宽度, 默认160px
 * @param {String} picType, 图片类型，默认方形
 * @author luyanhong 2018-12-25
 */
import React from 'react';
import PropTypes from 'prop-types';
import './ProgramHeader.scss';
import LazyImage from 'containers/LazyImage';
const ProgramHeader = (props) => {
  const {
    picUrl,
    name,
    children,
    tag,
    width,
    picType
  } = props;
  return (
    <>
      <div className={`program-header-pic ${picType}`} style={{ width: `${width}px` }}>
        <LazyImage src={picUrl} alt={name} className={`img-${picType}`} />
      </div>
      <div className="program-header-info" style={{ marginLeft: `${width + 30}px`, minHeight: `${width + 12}px` }}>
        <div className="program-header-name">
          <span className="program-header-tag">{tag}</span>
          <h3 className="program-header-title">{name}</h3>
        </div>
        {children}
      </div>
    </>
  );
};
ProgramHeader.propTypes = {
  picUrl: PropTypes.string,
  name: PropTypes.string,
  tag: PropTypes.string,
  width: PropTypes.number,
  picType: PropTypes.string
};
ProgramHeader.defaultProps = {
  picUrl: '',
  name: '',
  tag: '',
  width: 160,
  picType: ''
};
export default ProgramHeader;
