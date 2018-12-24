import React from 'react';
import LazyImage from 'coms/LazyImage';
import PropTypes from 'prop-types';
import { prettyTime } from 'utils/pretty-time';
const CommentUI = (props) => {
  const {
    avatarUrl, name, content, time, replied, likedCount
  } = props;
  let repliedList = null;
  if (replied && replied.length) {
    repliedList = (
      <ul className="comment-replied">
        {replied.map((li, index) => (
          <li className="comment-content" key={index}>
            <span className="comment-name">{li.user.nickname}</span>：
            <span dangerouslySetInnerHTML={{ __html: li.content }}></span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <li className="comment-item">
      <div className="comment-pic">
        <LazyImage src={`${avatarUrl}?param=40y40`} alt={name} />
      </div>
      <div className="comment-info">
        <article className="comment-content">
          <span className="comment-name">{name}</span>：
          <span dangerouslySetInnerHTML={{ __html: content }}></span>
          {repliedList}
        </article>
        <div className="comment-time">{prettyTime(time)}
          <div className="pull-right">
            <span className="comment-like">
              <i className="iconfont icon-like"></i>
              {likedCount > 0 && `(${likedCount})`}
            </span>
            <span className="comment-action-replay">回复</span>
          </div>
        </div>
      </div>
    </li>
  );
};
CommentUI.propTypes = {
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.string,
  time: PropTypes.number,
  replied: PropTypes.array,
  likedCount: PropTypes.number
};
CommentUI.defaultProps = {
  avatarUrl: '',
  name: '',
  content: '',
  time: 0,
  replied: [],
  likedCount: 0
};
export default CommentUI;
