/**
 * 音乐播放器模块
 * @param {Number} playListId, 歌单id
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getMusic, getPlaylistDetail } from 'api/home';
import './PlayBox.scss';
import defaultImg from './img/music.jpg';
const READY = 0;
const PLAYING = 1;
const PAUSE = 2;
let index = 0;
class PlayBox extends Component {
  static propTypes = {
    playListId: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      name: '暂无歌曲',
      picUrl: '',
      playlist: null,
      playState: READY,
      duration: 0
    };
    this.myRef = React.createRef();
    this.onPlay = this.onPlay.bind(this);
    this.pause = this.pause.bind(this);
  }

  // 当数据改变
  componentDidUpdate (prevProps) {
    if (prevProps.playListId !== this.props.playListId) {
      this.fetchDetail();
    }
  }

  // 播放事件
  onPlay () {
    if (!this.state.playlist) {
      return;
    }
    this.myRef.current.play();
    this.setState({
      playState: PLAYING
    });
  }

  /**
   * 获取音乐
   * @param {Number}  音乐id
  */
  fetchData (id) {
    try {
      getMusic(id).then((res) => {
        if (res.code === 200 && res.data[0].url) {
          const audio = this.myRef.current;
          audio.src = res.data[0].url;
          this.onPlay();
          audio.addEventListener('ended', () => {
            this.next();
          }, false);
        }
      }).catch((err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
  }

  // 获取歌单详情
  fetchDetail () {
    getPlaylistDetail(this.props.playListId).then((res) => {
      if (res.code === 200) {
        index = 0;
        this.setState({
          playlist: res.playlist
        });
        this.updateMusic();
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  // 更新歌曲数据，歌名、图片等
  updateMusic () {
    const play = this.state.playlist.tracks[index];
    const { name } = play;
    const { picUrl } = play.al;
    const duration = (play.l.size * 8) / play.l.br;
    this.setState({
      name,
      picUrl,
      duration
    });
    this.fetchData(play.id);
  }

  // 暂停事件
  pause () {
    const audio = this.myRef.current;
    audio.pause();
    this.setState({
      playState: PAUSE
    });
  }

  // 下一首
  next () {
    if (index === this.state.playlist.trackCount) {
      return;
    }
    index += 1;
    this.updateMusic();
  }

  // 上一首
  prev () {
    if (index === 0) {
      return;
    }
    index -= 1;
    this.updateMusic();
  }

  /**
   * 时间美化
   * @param {Number}  时间，单位为秒
   * @return {String} 08:00格式的
  */
  timePretty (s) {
    if (!s) {
      return '00:00';
    }
    let min = Math.trunc(s / 60);
    let sec = Math.trunc(s % 60);
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;
    return `${min}:${sec}`;
  }

  render () {
    const {
      name,
      picUrl,
      playState,
      duration
    } = this.state;
    const isPlaying = playState === PLAYING;
    const durationPretty = this.timePretty(duration);
    return (
      <div className="play">
        <div className="play-content">
          <div className="play-action">
            <div><i className="iconfont icon-prev" onClick={this.prev.bind(this)}></i></div>
            <div className="play-action-start">
              <i className={`iconfont icon-play playing ${isPlaying ? 'hide' : ''}`} onClick={this.onPlay}></i>
              <i className={`iconfont icon-pause pause ${!isPlaying ? 'hide' : ''}`} onClick={this.pause}></i>
            </div>
            <div><i className="iconfont icon-next" onClick={this.next.bind(this)}></i></div>
          </div>
          <div className="play-info">
            <div className="play-info-pic">
              <img src={picUrl ? `${picUrl}?param=34y34` : defaultImg} />
            </div>
            <div className="play-info-box">
              <h4>{name}</h4>
              <div className="play-progress">
                {/* <div className="play-progress-bar"></div> */}
                <progress value="0" max={duration}></progress>
                <div className="play-progress-btn"></div>
              </div>

              <div className="play-info-time">
                <span className="time-now">00:00</span> / {durationPretty}
              </div>
            </div>
          </div>
        </div>
        <audio ref={this.myRef}>
          <track kind="subtitles" src="ss.str" srcLang="zh" />
          <track kind="subtitles" src="subs_eng.srt" srcLang="en" label="English" />
        </audio>
      </div>
    );
  }
}
export default PlayBox;
