import React from 'react';
import './ProgramHeader.scss';
import LazyImage from 'coms/LazyImage';
const ProgramHeader = (props) => {
  const { picUrl, name, children } = props;
  return (
    <>
      <div className="program-header-pic">
        <LazyImage src={picUrl} alt={name} />
      </div>
      <div className="program-header-info">
        <h3 className="program-header-name">
          <span className="program-header-tag">电台</span>{name}
        </h3>
        {children}
      </div>
    </>
  );
};
export default ProgramHeader;
