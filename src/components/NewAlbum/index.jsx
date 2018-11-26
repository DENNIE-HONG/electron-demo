/**
 * 新碟列表
 * @param {Array} 歌曲列表
 * @author luyanhong 2018-11-26
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewAlbum.scss';
class NewAlbum extends Component {
  static propTypes = {
    playList: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props);
    this.a = 0;
  }

  render () {
    const { playList } = this.props;
    return (
      <ul className="newalbum">
        {playList.map((item) => (
          <li className="newalbum-list-item" key={item.id}>
            <div className="newalbum-list-pic">
              <img src={`${item.picUrl}?param=130y130`} alt={item.name} />
            </div>
            <h4 className="newalbum-list-name">{item.name}</h4>
            <span className="newalbum-list-txt">{item.artist.name}</span>
          </li>
        ))}
      </ul>
    );
  }
}
export default NewAlbum;
