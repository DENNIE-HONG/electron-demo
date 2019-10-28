/**
 * @file 专辑页
 * @author luyanhong 2019-08-08
 */
import React, { Component } from 'react';
import ProgramHeader from 'coms/ProgramHeader';
import { getAlbum, getAlbumComment } from 'api/album';
import BaseButton from 'coms/BaseButton';
import { prettyDate } from 'utils/pretty-time';
import ShowDesc from 'containers/ShowDesc';
import CommentList from 'coms/CommentList';
import SongTableList from 'coms/SongTableList';
import { Link } from 'react-router-dom';
import './album.scss';

class Album extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: null,
      songs: []
    };
    this.playAll = this.playAll.bind(this);
  }

  async componentDidMount () {
    try {
      const { id } = this.props.match.params;
      const res = await getAlbum(id);
      this.setState({
        info: res.album,
        songs: res.songs
      });
    } catch (err) {
      console.log(err);
    }
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
                歌手：<Link className="album-info-link" to={`/artist/${info.artist.id}`}>{info.artist.name}</Link>
              </p>
              <p>发行时间：{publishTime}</p>
              {info.company && <p>发行公司：{info.company}</p>}
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
            <ShowDesc text={info.description || '暂无'} />
          </div>
        </section>
        <section className="album-songs">
          <h4 className="title">
            <span className="title-txt">包含歌曲列表</span>
            <i className="title-desc">{info.size}首歌</i>
          </h4>
          <SongTableList data={songs} isIndex albumName={null} />
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
