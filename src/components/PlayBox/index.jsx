/**
 * 音乐播放器模块, 默认音量长度为80
 * @param {Array}  playList, 歌曲列表
 * @param {Number} id, 歌单id
 * @author luyanhong 2018-11-20
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getMusic } from 'api/home';
import showMessage from 'coms/message';
import './PlayBox.scss';
import defaultImg from './img/music.jpg';
import VolumeBox from './volume';

const READY = 0;
const PLAYING = 1;
const PAUSE = 2;
let index = 0;
let isMouseDown = false;
const initVolume = 0.2;
const PROGRESS_WIDTH = 500;
let badlength = 0;
let progress = null;
class PlayBox extends Component {
  static propTypes = {
    playList: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      name: '暂无歌曲',
      picUrl: '',
      playState: READY,
      duration: 0,
      playProgress: 0,
      timeProgress: '00:00',
      volume: initVolume,
      isOpenVolume: false,
      showPlayTime: '00:00',
      showPlayTimeLeftPx: 0
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
    // 监听播放完结事件
    this.myRef.current.addEventListener('ended', () => {
      this.next();
    }, false);
  }

  // 当数据改变
  componentDidUpdate (prevProps) {
    if (prevProps.id !== this.props.id) {
      this.resetData();
      this.updateMusic();
    }
  }

  // 播放事件, 或者暂停后播放
  onPlay () {
    if (!this.props.playList.length) {
      return;
    }
    this.myRef.current.play();
    this.myRef.current.volume = this.state.volume;
    this.setState({
      playState: PLAYING
    }, this.onProgress);
  }

  // 进度条渲染, 用setTimeout模拟setInterval
  onProgress () {
    if (progress) {
      clearTimeout(progress);
    }
    const { playProgress, duration } = this.state;
    const audio = this.myRef.current;
    const interval = () => {
      const { playState } = this.state;
      if (playState !== PLAYING) {
        clearTimeout(progress);
        return;
      }
      // 时间到了停止
      if (playProgress >= duration) {
        clearTimeout(progress);
        return;
      }
      this.setState(() => ({
        playProgress: audio.currentTime,
        timeProgress: this.timePretty(audio.currentTime)
      }));
      progress = setTimeout(interval, 1000);
    };
    interval();
  }

  get progressLeft () {
    return Math.trunc(PROGRESS_WIDTH * this.state.playProgress / this.state.duration);
  }

  /**
   * @param {Number}   x轴移动的距离
   * @return {Number}  相对应移动的时间
  */
  getDetalTime (detalX) {
    const deltalT = detalX * this.state.duration / PROGRESS_WIDTH;
    return deltalT;
  }

  open (id) {
    console.log(id);
  }

  resetData () {
    index = 0;
    badlength = 0;
  }

  /**
   * 获取音乐, 并开始播放
   * @param {Number}    音乐id
   * @return {Boolean}  是否成功获取音乐资源
  */
  async fetchData (id) {
    try {
      const res = await getMusic(id);
      if (res.code === 200 && res.data[0].url) {
        const audio = this.myRef.current;
        audio.src = res.data[0].url;
        return true;
      }
      // url 没有数据时候
      badlength += 1;
      if (badlength === this.props.playList.length) {
        throw Error('歌曲url都是null');
      }
      this.next();
    } catch (err) {
      showMessage({
        type: 'error',
        message: err.message
      });
      return false;
    }
  }

  // 更新歌曲数据，歌名、图片等
  updateMusic () {
    if (!this.props.playList.length) {
      showMessage({
        type: 'error',
        message: '歌曲暂时不能播放啦'
      });
      return;
    }
    const play = this.props.playList[index];
    // 没有成功获取资源
    this.fetchData(play.id).then(() => {
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
      // 开始播放
      this.onPlay();
    });
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
    const { playList } = this.props;
    if (!playList.length) {
      return;
    }
    // 最后一首, 在重头开始
    if (index === playList.length - 1) {
      index = - 1;
    }
    index += 1;
    this.updateMusic();
  }

  // 上一首
  prev () {
    // 已经是第一首了, 再重头开始
    if (index === 0) {
      index = 1;
    }
    index -= 1;
    this.updateMusic();
  }

  handleMouseOver (e) {
    if (this.state.playState === READY) {
      return;
    }
    e.persist();
    const { clientX } = e;
    this.showPlayTime(clientX);
    if (!isMouseDown) {
      return;
    }
    const deltaX = clientX - this.clientX;
    const { duration } = this.state;
    const deltaTime = this.getDetalTime(deltaX);
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
    btn.style.transform = `translate3D(${playProgress * PROGRESS_WIDTH / duration}px, 0, 0)`;
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

  // 点击进度条直接播放该时间点
  changePlayTime (e) {
    if (this.state.playState === READY) {
      return;
    }
    e.persist();
    const { offsetLeft } = document.querySelector('.play-progress');
    const xdistance = e.clientX - offsetLeft;
    const currentTime = this.getDetalTime(xdistance);
    this.setState(() => ({
      playProgress: currentTime
    }));
    this.myRef.current.currentTime = currentTime;
  }

  // 打开音量控制
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

  // hover显示播放时间点
  showPlayTime (clientX) {
    const { offsetLeft } = document.querySelector('.play-progress');
    const distanceX = clientX - offsetLeft;
    const newTime = this.getDetalTime(distanceX);
    const showPlayTime = this.timePretty(newTime);
    this.setState({
      showPlayTime,
      showPlayTimeLeftPx: distanceX
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
      isOpenVolume,
      showPlayTime,
      showPlayTimeLeftPx
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
            <div className="play-action-volume" onClick={this.openVolume}>
              <i className={`iconfont icon-volume ${volume <= 0.01 ? 'hide' : ''}`}></i>
              <i className={`iconfont icon-mute ${volume <= 0.01 ? '' : 'hide'}`}></i>
              <VolumeBox volume={initVolume} isOpen={isOpenVolume} change={this.handleChangeVolume} />
            </div>
          </div>
          <div className="play-info">
            <div className="play-info-pic">
              <img src={picUrl ? `${picUrl}?param=34y34` : defaultImg} alt={name} />
            </div>
            <div className="play-info-box" onMouseUp={this.handleMouseUp}>
              <h4 className="play-info-name">{name}</h4>
              <div className="play-progress" onMouseMove={this.handleMouseOver}>
                <progress className="music-progress" value={playProgress} max={duration} onClick={this.changePlayTime}></progress>
                <div className="play-progress-btn" style={{ transform: `translate3D(${this.progressLeft}px, 0, 0)` }} onMouseDown={this.handleMouseDown} ref={this.playProgressRef}></div>
                <div className="play-progress-showtime" style={{ left: `${showPlayTimeLeftPx}px` }}>{showPlayTime}</div>
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
