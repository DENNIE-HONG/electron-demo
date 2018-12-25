import React, { Component } from 'react';
import { getProgramDetail } from 'api/dj';
import { getCommentDj } from 'api/comment';
import BaseButton from 'coms/BaseButton';
import ProgramHeader from 'coms/ProgramHeader';
import { prettyDate } from 'utils/pretty-time';
import { NavLink } from 'react-router-dom';
import ShowDesc from 'coms/ShowDesc';
import CommentList from 'coms/CommentList';
import './program.scss';
class Program extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: null
    };
    this.$desc = React.createRef();
  }

  async componentDidMount () {
    try {
      const { id } = this.props.match.params;
      const [detailRes] = await Promise.all([
        getProgramDetail(id)
      ]);
      this.setState({
        info: detailRes.program
      });
    } catch (err) {
      console.log(err);
      console.log('网络出现问题');
    }
  }

  render () {
    const {
      info
    } = this.state;
    const { id } = this.props.match.params;
    return (
      info && (
        <div className="program">
          <header className="program-head">
            <ProgramHeader picUrl={`${info.coverUrl}?param=120y120`} name={info.name} tag="电台节目" width={120}>
              <div className="program-head-brand">
                <i className="iconfont icon-music"></i>
                <NavLink to={`/djRadio/${info.radio.id}`}>{info.dj.brand}</NavLink>
                <BaseButton icon="star">订阅({info.subscribedCount})</BaseButton>
              </div>
            </ProgramHeader>
          </header>
          <div className="program-action">
            <BaseButton type="primary" icon="play">播放</BaseButton>
            <BaseButton icon="like">({info.likedCount})</BaseButton>
            <BaseButton icon="comment">({info.commentCount})</BaseButton>
          </div>
          <div className="program-radio">
            <NavLink className="program-header-cate" to={`/dj/${info.radio.categoryId}`}>{info.radio.category}</NavLink>
            <h4 className="program-radio-name">{info.radio.name}
              <i className="program-radio-serial">第{info.serialNum}期</i>
            </h4>
            <span className="program-radio-time">
              <span className="program-radio-date">{prettyDate(info.createTime)}&nbsp;创建</span>
              <span>播放: <span className="program-radio-count">{info.listenerCount}</span>次</span>
            </span>
          </div>
          <div className="program-desc global-clearfix">
            <ShowDesc maxHeight={100} text={info.description} />
          </div>
          {info.commentCount > 0 && (
            <section className="program-comment">
              <div className="title">
                <span className="title-txt">评论</span>
                <i className="title-desc">共{info.commentCount}条评论</i>
              </div>
              <div className="program-comment-input">
                假装这里能输入评论
              </div>
              <CommentList id={id} getUrl={getCommentDj} />
            </section>
          )}
        </div>
      )
    );
  }
}
export default Program;
