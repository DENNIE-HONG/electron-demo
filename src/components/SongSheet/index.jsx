/**
 * 歌单列表
 * @param {Array}    playList, 数据列表
 * @param {Function} onPlay, 点击播放回调事件
 * @param {Boolean}  isShowArtist, 是否显示作者,默认是
 * @author luyanhong
 * @example
 * <SongSheet playList={} />
 */
import React, { Component } from 'react';
import LazyImage from 'coms/LazyImage';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactReduxContext } from 'react-redux';
import './SongSheet.scss';
class SongSheet extends Component {
  static propTypes = {
    playList: PropTypes.array.isRequired,
    onPlay: PropTypes.func,
    isShowArtist: PropTypes.bool
  }

  static defaultProps = {
    onPlay: undefined,
    isShowArtist: true
  }

  static contextType = ReactReduxContext;

  onPlay (id) {
    this.props.onPlay && this.props.onPlay(id);
  }

  render () {
    const { playList, isShowArtist } = this.props;
    const { store } = this.context;
    const { nickName } = store.getState().loginReducer;
    return (
      <div className="songsheet">
        <ul className="songsheet-list">
          {playList.map((item) => (
            <li className="songsheet-list-item" key={item.id}>
              <div className="item-info">
                <Link to={`/playlist/${item.id}`}>
                  <div className="item-info-pic">
                    <LazyImage src={item.coverImgUrl ? `${item.coverImgUrl}?param=120y120` : `${item.picUrl}?param=120y120`} alt={item.name} />
                  </div>
                </Link>
                <div className="item-info-play">
                  <i className="iconfont icon-headset"></i>
                  <span className="item-info-count">{item.playCount > 10000 ? `${Math.round(item.playCount / 10000)}万` : item.playCount}</span>
                  <i className="iconfont icon-play item-info-play-btn pull-right" onClick={() => this.onPlay(item.id)}></i>
                </div>
              </div>
              <Link to={`/playlist/${item.id}`}>
                <h4 className="item-title">{item.name.replace(nickName, '我')}</h4>
              </Link>
              {isShowArtist && <span className="item-txt">{item.creator.nickname}</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default SongSheet;
