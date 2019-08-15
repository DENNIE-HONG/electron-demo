/**
 * 评论模块
 * @param {String}  id, 必须，歌曲id
 * @param {Funtion} getUrl, 获取数据方法
 * @param {Number}  pageSize, 每页数量，默认20个
 * @param {Boolean} isAnchor, 评论列表容器，翻页是否滚动到顶部
 * @param {String}  title, 评论标题
 * @author luyanhong 2019-01
 * @example
 * <CommentList getUrl={function () { xxx }} id={xxx} ></CommentList>
 */
import React, { Component } from 'react';
import Pagination from 'coms/Pagination';
import PropTypes from 'prop-types';
import EmptyList from 'coms/EmptyList';
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
    isAnchor: PropTypes.bool,
    title: PropTypes.string
  }

  static defaultProps = {
    getUrl: undefined,
    pageSize: 20,
    isAnchor: true,
    title: ''
  }

  constructor (props) {
    super(props);
    this.state = {
      commentList: [],
      totalCount: null
    };
    this.total = 0;
    this.changePager = this.changePager.bind(this);
    this.$container = React.createRef();
  }

  async componentDidMount () {
    this.fetch();
  }

  async fetch (offset = 0) {
    const { id, pageSize } = this.props;
    const params = {
      offset,
      limit: pageSize,
      id
    };
    try {
      if (this.props.getUrl) {
        const res = await this.props.getUrl(params);
        if (res.code === 200 && res.comments.length) {
          if (!this.total) {
            this.total = Math.ceil(res.total / pageSize);
          }
          this.setState({
            commentList: res.comments,
            totalCount: res.total
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 跳页
  changePager (currentPage) {
    const offset = this.props.pageSize * (currentPage - 1);
    this.fetch(offset);
    this.props.isAnchor && this.scrollTop();
  }

  scrollTop () {
    this.$container.current.scrollIntoView();
  }

  render () {
    const { commentList, totalCount } = this.state;
    const { title } = this.props;
    return (
      <>
        {totalCount && title && (
          <h5 className="comment-title">{title}({totalCount})</h5>
        )}
        {totalCount ? (
          <ul className="comment" ref={this.$container}>
            {commentList.map((item) => (
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
        {this.total > 1 && <Pagination total={this.total} change={this.changePager} />}
      </>
    );
  }
}
export default CommentList;
