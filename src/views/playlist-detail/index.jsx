/**
 * @file 歌单详情页
 * @author luyanhong
 */
import React, { Component } from 'react';
import { getPlaylistDetail, getPlaylistComment } from 'api/playlist';
import ProgramHeader from 'coms/ProgramHeader';
import LazyImage from 'coms/LazyImage';
import BaseButton from 'coms/BaseButton';
import { prettyDate } from 'utils/pretty-time';
import ShowDesc from 'coms/ShowDesc';
import BaseTable, { BaseTableColumn } from 'coms/BaseTable';
import CommentList from 'coms/CommentList';
import './playlist-detail.scss';
class PlaylistDetail extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: null
    };
    this.onPlay = this.onPlay.bind(this);
    this.playAll = this.playAll.bind(this);
    this.navLink = this.navLink.bind(this);
  }

  // 获取歌曲列表
  async componentDidMount () {
    const { id } = this.props.match.params;
    try {
      const res = await getPlaylistDetail(id);
      if (res.code === 200) {
        this.setState({
          info: res.playlist
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 获取音乐资源并播放
  onPlay (idx) {
    const { info } = this.state;
    const list = [info.tracks[idx]];
    this.props.setMusic && this.props.setMusic(list, info.tracks[idx].id);
  }

  // 播放全部
  playAll () {
    const { tracks, id } = this.state.info;
    this.props.setMusic && this.props.setMusic(tracks, id);
  }

  navLink (idx) {
    const { id } = this.state.info.tracks[idx];
    this.props.history.push({
      pathname: `/song/${id}`
    });
  }

  render () {
    const { info } = this.state;
    return info && (
      <div className="playlistDetail">
        <header className="playlistDetail-header">
          <ProgramHeader
            name={info.name}
            picUrl={`${info.coverImgUrl}?param=160y160`}
            tag="歌单"
          >
            <div className="info">
              <div className="info-pic">
                <LazyImage src={`${info.creator.avatarUrl}?param=30y30`} alt={info.creator.nickname} />
              </div>
              <span className="info-name">{info.creator.nickname}</span>
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
              <ShowDesc text={info.description} />
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
          <BaseTable data={info.tracks} keyName="id" isIndex>
            <BaseTableColumn width="30" onClick={this.onPlay}>
              <i className="playlistDetail-table-iconfont iconfont icon-play"></i>
            </BaseTableColumn>
            <BaseTableColumn prop="name" label="歌曲标题" onClick={this.navLink} className="playlistDetail-link" />
            <BaseTableColumn prop="singers" label="歌手" />
            <BaseTableColumn prop="album" label="专辑" />
          </BaseTable>
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
