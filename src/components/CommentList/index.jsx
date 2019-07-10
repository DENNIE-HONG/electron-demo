/**
 * 评论模块
 * @param {Funtion} getUrl, 获取数据方法
 * @param {Number}  pageSize, 每页数量，默认20个
 * @param {String}  id, 歌曲id
 */
import React, { Component } from 'react';
import Pagination from 'coms/Pagination';
import PropTypes from 'prop-types';
import CommentUI from './listUI';
import './CommentList.scss';
class CommentList extends Component {
  static propTypes = {
    getUrl: PropTypes.func,
    pageSize: PropTypes.number,
    id: PropTypes.number.isRequired
  }

  static defaultProps = {
    getUrl: undefined,
    pageSize: 20
  }

  constructor (props) {
    super(props);
    this.state = {
      commentList: []
    };
    this.total = 0;
    this.changePager = this.changePager.bind(this);
    this.$scrollEle = document.querySelector('.main');
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
            commentList: res.comments
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
    this.scrollTop();
  }

  scrollTop () {
    this.$scrollEle.scrollTo(0, 0);
  }

  render () {
    const { commentList } = this.state;
    return (
      <>
        <ul className="comment">
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
        {this.total > 1 && <Pagination total={this.total} change={this.changePager} />}
      </>
    );
  }
}
export default CommentList;
