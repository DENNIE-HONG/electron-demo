import React from 'react';
import LazyImage from 'coms/LazyImage';
const ListUI = (props) => {
  const { avatarUrl, name } = props;
  return (
    <li className="comment-item">
      <div className="comment-pic">
        <LazyImage src={avatarUrl} alt={name} />
      </div>
    </li>
  );
};
export default ListUI;
