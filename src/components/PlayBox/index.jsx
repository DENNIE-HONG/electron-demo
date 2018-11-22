/**
 * 音乐播放器模块, 默认音量长度为80
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
const VOLUME_H = 80;
let index = 0;
let progress;
let clientY = 0;
let initVolume = 0;
let isMouseDown = false;
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
      timeProgress: '00:00',
      volume: 0.2,
      isOpenVolume: false
    };
    this.myRef = React.createRef();
    this.volumeRef = React.createRef();
    this.onPlay = this.onPlay.bind(this);
    this.pause = this.pause.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.openVolume = this.openVolume.bind(this);
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

  // 调节音量
  adjustVolume (event) {
    if (!isMouseDown) {
      return;
    }
    event.persist();
    const deltaY = clientY - event.clientY;
    const deltaVol = deltaY / VOLUME_H;
    const btn = this.volumeRef.current;
    const currentVolume = deltaVol + initVolume;
    // 超过音量
    if (currentVolume >= 1) {
      return;
    }
    if (currentVolume < 0) {
      return;
    }
    btn.style.transform = `translateX(${deltaY}px)`;
    this.setState(() => ({
      volume: currentVolume
    }));
  }

  // 鼠标按下后获取初始音量
  handleMouseDown (e) {
    e.persist();
    ({ clientY } = e);
    initVolume = this.state.volume;
    isMouseDown = true;
  }

  // 鼠标松开后设置音量，设置按钮位置
  handleMouseUp () {
    const btn = this.volumeRef.current;
    // 设置按钮新的起始点
    btn.style.left = `${this.state.volume * VOLUME_H - 4}px`;
    btn.style.transform = '';
    this.myRef.current.volume = this.state.volume;
    isMouseDown = false;
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

  openVolume () {
    this.setState((prev) => ({
      isOpenVolume: !prev.isOpenVolume
    }));
  }

  render () {
    const {
      name,
      picUrl,
      playState,
      duration,
      playProgress,
      timeProgress,
      volume,
      isOpenVolume
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
            <div className="play-action-volume" onClick={this.openVolume}>
              <i className="iconfont icon-volume"></i>
              <div className={`volume-box ${isOpenVolume ? '' : 'hide'}`} onMouseUp={this.handleMouseUp}>
                <div className="volume-box-progress">
                  <progress className="volume-progress" value={volume} max="1"></progress>
                  <div ref={this.volumeRef} className="volume-progress-btn" onMouseMove={this.adjustVolume} onMouseDown={this.handleMouseDown}></div>
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
        <audio ref={this.myRef} volume={volume}>
          <track kind="subtitles" src="ss.str" srcLang="zh" />
          <track kind="subtitles" src="subs_eng.srt" srcLang="en" label="English" />
        </audio>
      </div>
    );
  }
}
export default PlayBox;
