/**
 * 音乐播放器模块, 默认音量长度为80
 * @param {Number} playListId, 歌单id
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getMusic, getPlaylistDetail } from 'api/home';
import './PlayBox.scss';
import defaultImg from './img/music.jpg';
import VolumeBox from './volume';
const READY = 0;
const PLAYING = 1;
const PAUSE = 2;
let index = 0;
let progress;
let isMouseDown = false;
const initVolume = 0.2;
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
      volume: initVolume,
      isOpenVolume: false
    };
    this.clientX = 0;
    this.initTime = 0;
    this.myRef = React.createRef();
    this.playProgressRef = React.createRef();

    this.onPlay = this.onPlay.bind(this);
    this.pause = this.pause.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.openVolume = this.openVolume.bind(this);
    this.handleChangeVolume = this.handleChangeVolume.bind(this);
    this.changePlayTime = this.changePlayTime.bind(this);
  }

  componentDidMount () {
    // 点击其他区域，音量面板隐藏
    const volumeBtn = document.querySelector('.play-action-volume');
    document.body.addEventListener('click', (e) => {
      const { target } = e;
      if (!volumeBtn.contains(target) && !target.className.includes('icon-volume')) {
        if (this.state.isOpenVolume) {
          this.setState({
            isOpenVolume: false
          });
        }
      }
    }, false);
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
    this.myRef.current.volume = this.state.volume;
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
    const audio = this.myRef.current;
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
      this.setState(() => ({
        playProgress: audio.currentTime,
        timeProgress: this.timePretty(audio.currentTime)
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

  handleMouseOver (e) {
    if (!isMouseDown) {
      return;
    }
    e.persist();
    const deltaX = e.clientX - this.clientX;
    const { duration } = this.state;
    const deltaTime = duration * deltaX / 500;
    const currentTime = deltaTime + this.initTime;
    if (currentTime >= duration) {
      return;
    }
    if (currentTime <= 0) {
      return;
    }
    this.setState(() => ({
      playProgress: currentTime
    }));
  }

  // 鼠标按下后
  handleMouseDown (e) {
    if (this.state.playState === READY) {
      return;
    }
    e.persist();
    this.clientX = e.clientX;
    this.initTime = this.state.playProgress;
    isMouseDown = true;
  }

  // 鼠标松开后，设置按钮位置, audio播放位置
  handleMouseUp () {
    const btn = this.playProgressRef.current;
    // 设置按钮新的起始点
    const { playProgress, duration } = this.state;
    btn.style.left = `${playProgress * 500 / duration}px`;
    this.myRef.current.currentTime = this.state.playProgress;
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

  changePlayTime (e) {
    e.persist();
    const { offsetLeft } = document.querySelector('.play-progress');
    const detalX = e.clientX - offsetLeft;
    // const detalT = 0;
    console.log(detalX);
  }

  openVolume () {
    this.setState((prev) => ({
      isOpenVolume: !prev.isOpenVolume
    }));
  }

  handleChangeVolume (volume) {
    this.myRef.current.volume = volume;
    this.setState({
      volume
    });
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
              <i className={`iconfont icon-volume ${volume <= 0.01 ? 'hide' : ''}`}></i>
              <i className={`iconfont icon-mute ${volume <= 0.01 ? '' : 'hide'}`}></i>
              <VolumeBox volume={initVolume} isOpen={isOpenVolume} change={this.handleChangeVolume} />
            </div>
          </div>
          <div className="play-info">
            <div className="play-info-pic">
              <img src={picUrl ? `${picUrl}?param=34y34` : defaultImg} />
            </div>
            <div className="play-info-box" onMouseUp={this.handleMouseUp}>
              <h4>{name}</h4>
              <div className="play-progress" onMouseMove={this.handleMouseOver}>
                <progress className="music-progress" value={playProgress} max={duration} onClick={this.changePlayTime}></progress>
                <div className="play-progress-btn" style={{ left: `${leftPx}px` }} onMouseDown={this.handleMouseDown} ref={this.playProgressRef}></div>
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
