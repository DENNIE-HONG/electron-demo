/**
 * @file 专辑页
 * @author luyanhong 2019-08-08
 */
import React, { Component } from 'react';
import ProgramHeader from 'coms/ProgramHeader';
import { getAlbum, getAlbumComment } from 'api/album';
import BaseButton from 'coms/BaseButton';
import { prettyDate } from 'utils/pretty-time';
import ShowDesc from 'coms/ShowDesc';
import BaseTable, { BaseTableColumn } from 'coms/BaseTable';
import CommentList from 'coms/CommentList';
import './album.scss';

class Album extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: null,
      songs: []
    };
    this.onPlay = this.onPlay.bind(this);
    this.navLink = this.navLink.bind(this);
    this.playAll = this.playAll.bind(this);
  }

  async componentDidMount () {
    try {
      const { id } = this.props.match.params;
      const res = await getAlbum(id);
      if (res.code === 200) {
        this.setState({
          info: res.album,
          songs: res.songs
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  onPlay (idx) {
    const track = this.state.songs[idx];
    this.props.setMusic([track], track.id);
  }

  navLink (idx) {
    const { id } = this.state.songs[idx];
    this.props.history.push({
      pathname: `/song/${id}`
    });
  }

  playAll () {
    const { songs, info } = this.state;
    this.props.setMusic(songs, info.id);
  }

  render () {
    const { info, songs } = this.state;
    if (!info) {
      return null;
    }
    const publishTime = prettyDate(info.publishTime);
    return (
      <div className="album">
        <header className="album-header">
          <ProgramHeader picUrl={info.picUrl} name={info.name} tag="专辑">
            <div className="album-info">
              <p>
                歌手：<span className="">{info.artist.name}</span>
              </p>
              <p>发行时间：{publishTime}</p>
              <p>发行公司：{info.company}</p>
            </div>
            <div className="album-header-btns">
              <BaseButton type="primary" icon="play" onClick={this.playAll}>播放</BaseButton>
              <BaseButton icon="comment">({info.info.commentCount})</BaseButton>
            </div>
          </ProgramHeader>
        </header>
        <section className="album-desc">
          <h4 className="album-desc-title">专辑介绍：</h4>
          <div className="album-desc-txt">
            <ShowDesc text={info.description} />
          </div>
        </section>
        <section className="album-songs">
          <h4 className="title">
            <span className="title-txt">包含歌曲列表</span>
            <i className="title-desc">{info.size}首歌</i>
          </h4>
          <BaseTable data={songs} isIndex keyName="id">
            <BaseTableColumn width="40" onClick={this.onPlay}>
              <i className="iconfont icon-play album-table-icon"></i>
            </BaseTableColumn>
            <BaseTableColumn label="歌曲标题" className="nav-link" prop="name" onClick={this.navLink}></BaseTableColumn>
            <BaseTableColumn label="时长" prop="durationPretty" width="60"></BaseTableColumn>
            <BaseTableColumn label="歌手" prop="artist" width="150"></BaseTableColumn>
          </BaseTable>
        </section>
        <section className="album-comments">
          <h4 className="title">
            <span className="title-txt">评论</span>
            <i className="title-desc">共{info.info.commentCount}条评论</i>
          </h4>
          <div>
            假装这里能评论哦
          </div>
          <CommentList getUrl={getAlbumComment} title="精彩评论" id={info.id} />
        </section>
      </div>
    );
  }
}
export default Album;
