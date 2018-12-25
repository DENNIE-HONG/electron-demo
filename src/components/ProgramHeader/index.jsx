/**
 * 通用详情页头部
 * @param {String} picUrl, 图片url
 * @param {String} name, 标题
 * @param {String} tag, 标签
 * @param {Number} width, 图片宽度
 * @author luyanhong 2018-12-25
 */
import React from 'react';
import './ProgramHeader.scss';
import LazyImage from 'coms/LazyImage';
const ProgramHeader = (props) => {
  const {
    picUrl,
    name,
    children,
    tag,
    width = 160
  } = props;
  return (
    <>
      <div className="program-header-pic" style={{ width: `${width}px` }}>
        <LazyImage src={picUrl} alt={name} />
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
export default ProgramHeader;
