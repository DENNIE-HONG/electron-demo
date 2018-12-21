import React, { Component } from 'react';
import ListUI from './listUI';
import './CommentList.scss';
const PAGE_SISE = 20;
class CommentList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      commentList: []
    };
    this.offset = 0;
    this.limit = PAGE_SISE;
  }

  async componentDidMount () {
    this.fetch();
  }

  async fetch () {
    const { offset, limit } = this;
    const { id } = this.props;
    const params = {
      offset,
      limit,
      id
    };
    try {
      if (this.props.getUrl) {
        const res = await this.props.getUrl(params);
        if (res.code === 200 && res.comments.length) {
          this.setState({
            commentList: res.comments
          });
          this.offset += this.limit;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  render () {
    const { commentList } = this.state;
    return (
      <ul className="comment">
        {commentList.map((item) => (
          <ListUI key={item.commentId} avatarUrl={item.user.avatarUrl} name={item.user.nickname} />
        ))}
      </ul>
    );
  }
}
export default CommentList;
