/**
 * @file 播放器按钮模块 容器组件
 * @param {Array}    playList, 播放列表
 * @param {Function} updateMusic, 更新音乐信息回调
 * @param {Number}   id, 音乐列表id
 * @param {Function} playCallback, 开始播放回调
 * @param {Function} controlAudio, 控制audio属性回调
 * @author luyanhong 2019-10-29
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import showMessage from 'containers/Message';
import { getMusic } from 'api/home';
import { playStartAction, playStopAction } from '@/redux/actions';
import VolumeBox from './Volume';
const initVolume = 0.4;
let index = 0; // 播放第几首
let badlength = 0; // 不能播放歌曲数目统计
const mapStateToProps = (state) => {
  const { playState } = state.playReducer;
  return {
    playState
  };
};
// Map Redux actions to component props
const mapDispatchToProps = (dispatch) => ({
  changeStart: () => {
    dispatch(playStartAction());
  },
  changeStop: () => {
    dispatch(playStopAction());
  }
});
const noop = () => {};
@connect(mapStateToProps, mapDispatchToProps)
class PlayBoxAction extends Component {
  static propTypes = {
    playCallback: PropTypes.func,
    updateMusic: PropTypes.func,
    playState: PropTypes.number,
    playList: PropTypes.array,
    id: PropTypes.number,
    changeStart: PropTypes.func,
    changeStop: PropTypes.func,
    controlAudio: PropTypes.func
  }

  static defaultProps = {
    playCallback: noop,
    playList: [],
    updateMusic: noop,
    playState: 0,
    id: 0,
    changeStart: noop,
    changeStop: noop,
    controlAudio: noop
  }

  state = {
    volume: initVolume,
    isOpenVolume: false
  };

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
    document.getElementById('audio').addEventListener('ended', () => {
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

  /**
   * 获取音乐, 并开始播放
   * @param {Number}    音乐id
   * @return {Boolean}  是否成功获取音乐资源
  */
  fetchData = async (id) => {
    try {
      const res = await getMusic(id);
      const music = res.data[0];
      return new Promise((resolve, reject) => {
        if (music.url) {
          return resolve(music);
        }
        reject('歌曲暂时不能播放, 播放下一首');
      });
    } catch (err) {
      showMessage({
        type: 'error',
        message: err.message
      });
    }
  }

  // 1、成功获取资源
  // 2、更新音乐信息
  // 3、播放音乐
  updateMusic = async () => {
    const { playList, updateMusic } = this.props;
    if (!playList.length) {
      showMessage({
        type: 'error',
        message: '歌曲暂时不能播放啦'
      });
      return;
    }
    const play = playList[index];
    try {
      const music = await this.fetchData(play.id);
      updateMusic(index, music);
      this.props.controlAudio('changeUrl', music.url);
      this.onPlay();
    } catch (err) {
      if (badlength === playList.length) {
        showMessage({
          type: 'error',
          message: '歌曲url都是null'
        });
        return;
      }
      badlength += 1;
      this.next();
      showMessage({
        type: 'error',
        message: err
      });
    }
  }

  // 上一首
  prev = () => {
    // 已经是第一首了, 再重头开始
    if (index === 0) {
      index = 1;
    }
    index -= 1;
    this.updateMusic();
  }

  // 下一首
  next = () => {
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

  // 播放事件, 或者暂停后播放
  onPlay = () => {
    const { length } = this.props.playList;
    if (!length) {
      return;
    }
    if (badlength === length) {
      return;
    }
    this.props.controlAudio('play');
    this.props.controlAudio('changeVolume', this.state.volume);
    this.props.changeStart();
    // 为了获取更新后的状态
    setTimeout(() => {
      this.props.playCallback();
    }, 0);
    //
  }

  // 暂停事件
  pause = () => {
    this.props.controlAudio('pause');
    this.props.changeStop();
  }

  // 打开音量控制
  openVolume = () => {
    this.setState((prev) => ({
      isOpenVolume: !prev.isOpenVolume
    }));
  }

  handleChangeVolume = (volume) => {
    this.props.controlAudio('changeVolume', volume);
    this.setState({
      volume
    });
  }

  resetData = () => {
    index = 0;
    badlength = 0;
    this.pause();
    this.props.updateMusic(0, null);
    this.props.controlAudio('changeUrl', '');
  }

  render () {
    const {
      volume, isOpenVolume
    } = this.state;
    const isPlaying = this.props.playState === 1;
    return (
      <div className="play-action">
        <div><i className="iconfont icon-prev" onClick={this.prev}></i></div>
        <div className="play-action-start">
          <i className={`iconfont icon-play playing ${isPlaying ? 'hide' : ''}`} onClick={this.onPlay}></i>
          <i className={`iconfont icon-pause pause ${!isPlaying ? 'hide' : ''}`} onClick={this.pause}></i>
        </div>
        <div><i className="iconfont icon-next" onClick={this.next}></i></div>
        <div className="play-action-volume" onClick={this.openVolume}>
          <i className={`iconfont icon-volume ${volume <= 0.01 ? 'hide' : ''}`}></i>
          <i className={`iconfont icon-mute ${volume <= 0.01 ? '' : 'hide'}`}></i>
          <VolumeBox volume={initVolume} isOpen={isOpenVolume} change={this.handleChangeVolume} />
        </div>
      </div>
    );
  }
}
export default PlayBoxAction;
