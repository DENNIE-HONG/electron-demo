/**
 * 新碟列表
 * @param {Array}    歌曲列表, 必须
 * @param {Function} 点击播放按钮回调函数，参数是id
 * @author luyanhong 2018-11-26
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewAlbum.scss';
class NewAlbum extends Component {
  static propTypes = {
    playList: PropTypes.array.isRequired,
    getPlayId: PropTypes.func
  }

  static defaultProps = {
    getPlayId: undefined
  }

  play (playId) {
    this.props.getPlayId && this.props.getPlayId(playId);
  }

  render () {
    const { playList } = this.props;
    return (
      <ul className="newalbum global-clearfix">
        {playList.map((item) => (
          <li
            className="newalbum-list-item"
            key={item.id}
            title={item.name}
          >
            <div className="newalbum-list-pic">
              <img src={`${item.picUrl}?param=130y130`} alt={item.name} />
            </div>
            <h4 className="newalbum-list-name">{item.name}</h4>
            <span className="newalbum-list-txt">{item.artist.name}</span>
            <div className="newalbum-play-btn" onClick={this.play.bind(this, item.id)}>
              <i className="iconfont icon-play"></i>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}
export default NewAlbum;