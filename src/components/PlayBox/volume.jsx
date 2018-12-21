/**
 * 音量面板控制
 * @param {Numner}, volume, 初始音量
 * @param {Boolean}, isOpen, 是否显示面板
 * @param {function}, change, 音量改变后回调函数
 * @author luyanhong 2018-11-23
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
let clientY = 0;
let isMouseDown = false;
const VOLUME_H = 80;
class VolumeBox extends Component {
  static propTypes = {
    volume: PropTypes.number,
    isOpen: PropTypes.bool,
    change: PropTypes.func
  }

  static defaultProps = {
    volume: 0.4,
    isOpen: false,
    change: undefined
  }

  constructor (props) {
    super(props);
    this.state = {
      volume: props.volume
    };
    this.initVolume = 0;
    this.volumeRef = React.createRef();
    this.adjustVolume = this.adjustVolume.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.volumeRefLeft = props.volume * VOLUME_H - 2;
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
    const currentVolume = deltaVol + this.initVolume;
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
    this.initVolume = this.state.volume;
    isMouseDown = true;
  }

  // 鼠标松开后设置音量，设置按钮位置
  handleMouseUp () {
    const btn = this.volumeRef.current;
    // 设置按钮新的起始点
    btn.style.left = `${this.state.volume * VOLUME_H - 4}px`;
    btn.style.transform = '';
    isMouseDown = false;
    this.props.change && this.props.change(this.state.volume);
  }

  render () {
    const { isOpen } = this.props;
    const { volume } = this.state;
    return (
      <div
        className={`volume-box ${isOpen ? '' : 'hide'}`}
        onMouseUp={this.handleMouseUp}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={this.adjustVolume}
      >
        <div className="volume-box-progress">
          <progress
            className="volume-progress"
            value={volume}
            max="1"
          >
          </progress>
          <div
            ref={this.volumeRef}
            className="volume-progress-btn"
            style={{ left: `${this.volumeRefLeft}px` }}
            onMouseDown={this.handleMouseDown}
          >
          </div>
        </div>
      </div>
    );
  }
}
export default VolumeBox;
