/**
 * 评论模块 展示组件
 * @param {String}  id, 必须，歌曲id
 * @param {Funtion} getUrl, 获取数据方法
 * @param {Number}  pageSize, 每页数量，默认20个
 * @param {String}  title, 评论标题,默认''
 * @author luyanhong 2019-01
 * @example
 * <CommentList getUrl={function () { xxx }} id={xxx} ></CommentList>
 */
import React from 'react';
import PropTypes from 'prop-types';
import EmptyList from 'coms/EmptyList';
import LoadMore from 'coms/LoadMore';
import CommentUI from './listUI';
import './CommentList.scss';
const CommentList = (props) => {
  const {
    title, id, getUrl, pageSize
  } = props;
  return (
    <>
      <LoadMore
        params={{ id }}
        getUrl={getUrl}
        listPropName="comments"
        limit={pageSize}
        isMountedFetch
        render={({ list, totalCount }) => (
          <>
            {title && totalCount && (
              <h5 className="comment-title">{title}({totalCount})</h5>
            )}
            {totalCount ? (
              <ul className="comment">
                {list.map((item) => (
                  <CommentUI
                    key={item.commentId}
                    avatarUrl={item.user.avatarUrl}
                    name={item.user.nickname}
                    userId={item.user.userId}
                    content={item.content}
                    time={item.time}
                    replied={item.beReplied}
                    likedCount={item.likedCount}
                  />
                ))}
              </ul>
            ) : <EmptyList />}
          </>
        )}
      />
    </>
  );
};
CommentList.propTypes = {
  getUrl: PropTypes.func,
  pageSize: PropTypes.number,
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  title: PropTypes.string
};

CommentList.defaultProps = {
  getUrl: undefined,
  pageSize: 20,
  title: ''
};
export default CommentList;
