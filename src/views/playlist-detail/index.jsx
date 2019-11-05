/**
 * @file 歌单详情页
 * @author luyanhong
 */
import React, { Component } from 'react';
import { getPlaylistDetail, getPlaylistComment } from 'api/playlist';
import ProgramHeader from 'coms/ProgramHeader';
import LazyImage from 'containers/LazyImage';
import BaseButton from 'coms/BaseButton';
import { prettyDate } from 'utils/pretty-time';
import ShowDesc from 'containers/ShowDesc';
import CommentList from 'coms/CommentList';
import { Link } from 'react-router-dom';
import { ReactReduxContext } from 'react-redux';
import SongTableList from 'containers/SongTableList';
import './playlist-detail.scss';
class PlaylistDetail extends Component {
  static contextType = ReactReduxContext;

  constructor (props) {
    super(props);
    this.state = {
      info: null
    };
    this.playAll = this.playAll.bind(this);
  }

  // 获取歌曲列表
  async componentDidMount () {
    const { id } = this.props.match.params;
    try {
      const res = await getPlaylistDetail(id);
      this.setState({
        info: res.playlist
      });
    } catch (err) {
      console.log(err);
    }
  }

  // 播放全部
  playAll () {
    const { tracks, id } = this.state.info;
    this.props.setMusic && this.props.setMusic(tracks, id);
  }

  render () {
    const { info } = this.state;
    const { store } = this.context;
    const { nickName } = store.getState().loginReducer;
    return info && (
      <div className="playlistDetail">
        <header className="playlistDetail-header">
          <ProgramHeader
            name={info.name.replace(nickName, '我')}
            picUrl={`${info.coverImgUrl}?param=160y160`}
            tag="歌单"
          >
            <div className="info">
              <Link to={`/user/${info.creator.userId}`}>
                <div className="info-pic">
                  <LazyImage src={`${info.creator.avatarUrl}?param=30y30`} alt={info.creator.nickname} />
                </div>
                <span className="info-name">{info.creator.nickname}</span>
              </Link>
              <span>{prettyDate(info.createTime)} 创建</span>
            </div>
            <ul className="btn-box">
              <li><BaseButton icon="play" type="primary" onClick={this.playAll}>播放</BaseButton></li>
              <li><BaseButton icon="comment">({info.commentCount})</BaseButton></li>
            </ul>
            <dl className="playlistDetail-header-tags">
              <dt className="tag-title">标签：</dt>
              {info.tags.map((tag, index) => (
                <dd key={index} className="tag">{tag}</dd>
              ))}
            </dl>
            <div className="playlistDetail-desc">
              <ShowDesc text={info.description || '暂无评论'} />
            </div>
          </ProgramHeader>
        </header>
        <section className="playlistDetail-songs">
          <div className="title">
            <span className="title-txt">歌曲列表</span>
            <i className="title-desc">{info.trackCount}首歌</i>
            <span className="pull-right">播放：
              <span className="red">{info.playCount}</span>次
            </span>
          </div>
          <SongTableList data={info.tracks} isIndex />
        </section>
        <section className="playlistDetail-comments">
          <div className="title">
            <span className="title-txt">评论</span>
            <i className="title-desc">共{info.commentCount}条评论</i>
          </div>
          <p>假装这里能输入评论</p>
          <CommentList getUrl={getPlaylistComment} id={info.id} />
        </section>
      </div>
    );
  }
}
export default PlaylistDetail;
