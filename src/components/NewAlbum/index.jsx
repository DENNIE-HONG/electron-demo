/**
 * 新碟列表
 * @param {Array}    playList, 歌曲列表, 必须
 * @param {Function} getPlayId, 点击播放按钮回调函数，参数是id
 * @author luyanhong 2018-11-26
 * @example
 * <NewAlbum playlist={Array} getPlayId={} />
*/
import React from 'react';
import PropTypes from 'prop-types';
import LazyImage from 'coms/LazyImage';
import { Link } from 'react-router-dom';
import './NewAlbum.scss';
const NewAlbum = (props) => {
  const { playList, getPlayId } = props;
  return (
    <ul className="newalbum global-clearfix">
      {playList.map((item) => (
        <li
          className="newalbum-list-item"
          key={item.id}
          title={item.name}
        >
          <Link to={`/album/${item.id}`} className="newalbum-list-link">
            <div className="newalbum-list-pic">
              <LazyImage src={`${item.picUrl}?param=130y130`} alt={item.name} />
            </div>
            <h4 className="newalbum-list-name">{item.name}</h4>
          </Link>
          <Link to={`/artist/${item.artist.id}`} className="nav-link">
            <span className="newalbum-list-txt">{item.artist.name}</span>
          </Link>
          <div className="newalbum-play-btn" onClick={() => getPlayId(item.id)}>
            <i className="iconfont icon-play"></i>
          </div>
        </li>
      ))}
    </ul>
  );
};
NewAlbum.propTypes = {
  playList: PropTypes.array.isRequired,
  getPlayId: PropTypes.func
};
NewAlbum.defaultProps = {
  getPlayId: undefined
};
export default NewAlbum;
