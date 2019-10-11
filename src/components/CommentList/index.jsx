/**
 * 评论模块
 * @param {String}  id, 必须，歌曲id
 * @param {Funtion} getUrl, 获取数据方法
 * @param {Number}  pageSize, 每页数量，默认20个
 * @param {String}  title, 评论标题
 * @author luyanhong 2019-01
 * @example
 * <CommentList getUrl={function () { xxx }} id={xxx} ></CommentList>
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmptyList from 'coms/EmptyList';
import LoadMore from 'coms/LoadMore';
import CommentUI from './listUI';
import './CommentList.scss';
class CommentList extends Component {
  static propTypes = {
    getUrl: PropTypes.func,
    pageSize: PropTypes.number,
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    title: PropTypes.string
  }

  static defaultProps = {
    getUrl: undefined,
    pageSize: 20,
    title: ''
  }

  render () {
    const {
      title, id, getUrl, pageSize
    } = this.props;
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
  }
}
export default CommentList;
