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
        <h3 className="program-header-name">
          <span className="program-header-tag">{tag}</span>{name}
        </h3>
        {children}
      </div>
    </>
  );
};
export default ProgramHeader;
