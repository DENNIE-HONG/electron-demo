/**
 * @file 每条评论模块 展示组件
 * @author luyanhong 2019-01
 */
import React from 'react';
import LazyImage from 'coms/LazyImage';
import PropTypes from 'prop-types';
import { prettyTime } from 'utils/pretty-time';
import { Link } from 'react-router-dom';
const CommentUI = (props) => {
  const {
    avatarUrl, name, content, time, replied, likedCount, userId
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
      <Link className="comment-pic" to={`/user/${userId}`}>
        <LazyImage src={`${avatarUrl}?param=40y40`} alt={name} />
      </Link>
      <div className="comment-info">
        <article className="comment-content">
          <Link className="comment-name" to={`/user/${userId}`}>{name}</Link>：
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
  likedCount: PropTypes.number,
  userId: PropTypes.number
};
CommentUI.defaultProps = {
  avatarUrl: '',
  name: '',
  content: '',
  time: 0,
  replied: [],
  likedCount: 0,
  userId: 0
};
export default CommentUI;
