/**
 * @file 单曲页
 * @author luyanhong 2019-08-05
 */
import React, { Component } from 'react';
import { getSongDetail, getLyric } from 'api/song';
import { getSongComment } from 'api/comment';
import ProgramHeader from 'coms/ProgramHeader';
import BaseButton from 'coms/BaseButton';
import ShowDesc from 'coms/ShowDesc';
import CommentList from 'coms/CommentList';
import './song.scss';
class Song extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: '',
      lyric: ''
    };
    this.onPlay = this.onPlay.bind(this);
  }

  async componentDidMount () {
    try {
      const { id } = this.props.match.params;
      const [songRes, lyricRes] = await Promise.all([
        getSongDetail(id),
        getLyric(id)
      ]);
      if (songRes.code === 200 && lyricRes.code === 200) {
        const [info] = songRes.songs;
        let { lyric = '' } = lyricRes.lrc;

        lyric = lyric.replace(/\[\S+\]\s?/g, '');
        this.setState({
          info,
          lyric
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 播放歌曲
  onPlay () {
    const { setMusic } = this.props;
    const { info } = this.state;
    setMusic && setMusic([info], info.id);
  }

  render () {
    const { info, lyric } = this.state;
    if (!info) {
      return null;
    }
    // 歌手
    const singers = info.ar.map((ar) => (
      <span className="info-singers" key={ar.id}>{ar.name}</span>
    ));
    return info && (
      <div className="song">
        <header className="song-header">
          <ProgramHeader name={info.name} tag="单曲" picUrl={info.al.picUrl} picType="circle">
            <div className="song-header-info">
              <p className="info-item">
                歌手：{singers}
              </p>
              <p className="info-item">
                所属专辑：<span className="info-album">{info.al.name}</span>
              </p>
            </div>
            <div className="song-header-btns">
              <BaseButton type="primary" icon="play" onClick={this.onPlay}>播放</BaseButton>
            </div>
            <ShowDesc text={lyric} maxHeight={270} />
          </ProgramHeader>
        </header>
        <section className="song-comment">
          <h4 className="title">
            <span className="title-txt">评论</span>
          </h4>
          <div className="song-comment-input">
            假装能输入评论
          </div>
          <CommentList getUrl={getSongComment} id={info.id} title="最新评论" />
        </section>
      </div>
    );
  }
}
export default Song;
