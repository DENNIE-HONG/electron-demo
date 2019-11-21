/**
 * 歌单列表 展示组件
 * @param {Array}    playList, 必须，数据列表
 * @param {Function} onPlay, 点击播放回调事件
 * @param {Boolean}  isShowArtist, 是否显示作者,默认是
 * @param {String}   nickName, 登录后的昵称，默认''
 * @author luyanhong
 * @example
 * <SongSheet playList={} isShowArtist={false} onPlay={function} />
 */
import React from 'react';
import LazyImage from 'containers/LazyImage';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SongSheet.scss';

const SongSheetCom = (props) => {
  const {
    playList, isShowArtist, nickName, onPlay
  } = props;
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
                <i className="iconfont icon-play item-info-play-btn pull-right" onClick={() => onPlay(item.id)}></i>
              </div>
            </div>
            <Link to={`/playlist/${item.id}`}>
              <h4 className="item-title">{nickName ? item.name.replace(nickName, '我') : item.name}</h4>
            </Link>
            {isShowArtist && <Link className="item-txt" to={`/user/${item.creator.userId}`}>{item.creator.nickname}</Link>}
          </li>
        ))}
      </ul>
    </div>
  );
};
SongSheetCom.propTypes = {
  playList: PropTypes.array.isRequired,
  onPlay: PropTypes.func,
  isShowArtist: PropTypes.bool,
  nickName: PropTypes.string
};
SongSheetCom.defaultProps = {
  onPlay: undefined,
  isShowArtist: true,
  nickName: ''
};
export default SongSheetCom;
