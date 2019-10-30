import React, { Component } from 'react';

class PlayAudio extends Component {
  constructor (props) {
    super(props);
    this.myRef = React.createRef();
    PlayAudio.controlAudio = this.controlAudio;
  }

  // 设置audio 各种属性
  controlAudio = (type, value) => {
    const audio = this.myRef.current;
    switch (type) {
      case 'play':
        audio.play();
        break;
      case 'pause':
        audio.pause();
        break;
      case 'changeCurrentTime':
        audio.currentTime = value;
        break;
      case 'changeVolume':
        audio.volume = value;
        break;
      case 'getCurrentTime':
        return audio.currentTime;
      case 'changeUrl':
        audio.src = value;
        break;
      default:
        break;
    }
  }

  render () {
    return (
      <audio ref={this.myRef} id="audio"></audio>
    );
  }
}

export default PlayAudio;
