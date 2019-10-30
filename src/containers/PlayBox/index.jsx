/**
 * 音乐播放器模块, 默认音量长度为80
 * @param {Array}  playList, 歌曲列表
 * @param {Number} id, 歌单id,主要用更新播放列表
 * @author luyanhong 2018-11-20
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './PlayBox.scss';
import defaultImg from './img/music.jpg';
import PlayAudio from './PlayAudio';
import PlayBoxAction from './PlayBoxAction';

let isMouseDown = false;
const PROGRESS_WIDTH = 500;
let progress = null;
const PLAYING = 1;
const READY = 0;

const mapStateToProps = (state) => {
  const { playState } = state.playReducer;
  return {
    playState
  };
};

class PlayBox extends Component {
  static propTypes = {
    playList: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
    playState: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      name: '暂无歌曲',
      picUrl: '',
      duration: 0,
      playProgress: 0,
      timeProgress: '00:00',
      showPlayTime: '00:00',
      showPlayTimeLeftPx: 0
    };
    this.clientX = 0;
    this.initTime = 0;
    this.playProgressRef = React.createRef();
  }

  // 进度条渲染, 用setTimeout模拟setInterval
  onProgress = () => {
    if (progress) {
      clearTimeout(progress);
    }
    const { playProgress, duration } = this.state;
    const interval = () => {
      const { playState } = this.props;
      if (playState !== PLAYING) {
        clearTimeout(progress);
        return;
      }
      // 时间到了停止
      if (playProgress >= duration) {
        clearTimeout(progress);
        return;
      }
      const currentTime = PlayAudio.controlAudio('getCurrentTime');
      this.setState(() => ({
        playProgress: currentTime,
        timeProgress: this.timePretty(currentTime)
      }));
      progress = setTimeout(interval, 1000);
    };
    interval();
  }

  get progressLeft () {
    if (!this.state.playProgress) {
      return 0;
    }
    return Math.trunc(PROGRESS_WIDTH * this.state.playProgress / this.state.duration);
  }

  /**
   * @param {Number}   x轴移动的距离
   * @return {Number}  相对应移动的时间
  */
  getDetalTime = (detalX) => {
    const deltalT = detalX * this.state.duration / PROGRESS_WIDTH;
    return deltalT;
  }

  // 更新歌曲数据，歌名、图片等
  updateMusic = (idx, data) => {
    // 重置数据
    if (!data) {
      this.setState({
        name: '暂无歌曲',
        picUrl: '',
        duration: 0,
        playProgress: 0,
        timeProgress: '00:00',
        showPlayTime: '00:00',
        showPlayTimeLeftPx: 0
      });
      return;
    }
    const play = this.props.playList[idx];
    const { name } = play;
    const { picUrl } = play.al || play.album;
    const duration = parseInt((data.size * 8) / data.br, 10);
    this.setState({
      name,
      picUrl,
      duration,
      playProgress: 0,
      timeProgress: '00:00'
    });
  }

  handleMouseOver = (e) => {
    if (this.props.playState === READY) {
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
  handleMouseDown = (e) => {
    if (this.props.playState === READY) {
      return;
    }
    e.persist();
    this.clientX = e.clientX;
    this.initTime = this.state.playProgress;
    isMouseDown = true;
  }

  // 鼠标松开后，设置按钮位置, audio播放位置
  handleMouseUp = () => {
    const btn = this.playProgressRef.current;
    // 设置按钮新的起始点
    const { playProgress, duration } = this.state;
    btn.style.transform = `translate3D(${playProgress * PROGRESS_WIDTH / duration}px, 0, 0)`;
    PlayAudio.controlAudio('changeCurrentTime', this.state.playProgress);
    isMouseDown = false;
  }

  /**
   * 时间美化
   * @param {Number}  时间，单位为秒
   * @return {String} 08:00格式的
  */
  timePretty = (s) => {
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
  changePlayTime =(e) => {
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
    PlayAudio.controlAudio('changeCurrentTime', currentTime);
  }

  // hover显示播放时间点
  showPlayTime = (clientX) => {
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
      duration,
      playProgress,
      timeProgress,
      showPlayTime,
      showPlayTimeLeftPx
    } = this.state;
    const durationPretty = this.timePretty(duration);
    return (
      <div className="play">
        <div className="play-content">
          <PlayBoxAction
            updateMusic={this.updateMusic}
            playCallback={this.onProgress}
            id={this.props.id}
            playList={this.props.playList}
            controlAudio={PlayAudio.controlAudio}
          />
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
        <PlayAudio />
      </div>
    );
  }
}
export default connect(mapStateToProps)(PlayBox);
