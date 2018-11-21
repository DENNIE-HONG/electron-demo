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
let progress;
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
      duration: 0,
      playProgress: 0,
      timeProgress: '00:00'
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
    this.onProgress();
    this.setState({
      playState: PLAYING
    });
  }

  // 进度条渲染
  onProgress () {
    if (progress) {
      clearInterval(progress);
    }
    const { playProgress, duration } = this.state;
    progress = setInterval(() => {
      // 暂停
      const { playState } = this.state;
      if (playState !== PLAYING) {
        clearInterval(progress);
      }
      // 时间到了停止
      if (playProgress >= duration) {
        clearInterval(progress);
      }
      this.setState((prevState) => ({
        playProgress: prevState.playProgress + 1,
        timeProgress: this.timePretty(prevState.playProgress + 1)
      }));
    }, 1000);
  }

  /**
   * 获取音乐, 并开始播放
   * @param {Number}  音乐id
  */
  async fetchData (id) {
    try {
      const res = await getMusic(id);
      if (res.code === 200 && res.data[0].url) {
        const audio = this.myRef.current;
        audio.src = res.data[0].url;
        this.onPlay();
        this.onProgress();
        audio.addEventListener('ended', () => {
          this.next();
        }, false);
      }
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
    const duration = parseInt((play.l.size * 8) / play.l.br, 10);
    this.setState({
      name,
      picUrl,
      duration,
      playProgress: 0,
      timeProgress: '00:00'
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
      duration,
      playProgress,
      timeProgress
    } = this.state;
    const isPlaying = playState === PLAYING;
    const durationPretty = this.timePretty(duration);
    const leftPx = Math.trunc(500 * playProgress / duration);
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
            <div className="play-action-volumn">
              <i className="iconfont icon-volume"></i>
              <div className="volumn-box">
                <div className="volumn-box-progress">
                  <progress className="volumn-progress" value="4" max="10"></progress>
                  <div className="volumn-progress-btn"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="play-info">
            <div className="play-info-pic">
              <img src={picUrl ? `${picUrl}?param=34y34` : defaultImg} />
            </div>
            <div className="play-info-box">
              <h4>{name}</h4>
              <div className="play-progress">
                <progress className="music-progress" value={playProgress} max={duration}></progress>
                <div className="play-progress-btn" style={{ left: `${leftPx}px` }}></div>
              </div>
              <div className="play-info-time">
                <span className="time-now">{timeProgress}</span> / {durationPretty}
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
