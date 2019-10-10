/**
 * @file 个人页
 * @author luyanhong 2019-10-10
 */
import React, { Component } from 'react';
import { getUserDetail, getUserPlaylist } from 'api/user';
import Loading from 'coms/Loading';
import LazyImage from 'coms/LazyImage';
import { Link } from 'react-router-dom';
import SongSheet from 'coms/SongSheet';
import './user.scss';
class User extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userInfo: null,
      playlist: null
    };
  }

  async componentDidMount () {
    const { id } = this.props.match.params;
    try {
      const [res, playlistRes] = await Promise.all([
        getUserDetail(id),
        getUserPlaylist(id)
      ]);
      this.setState({
        userInfo: res.profile,
        playlist: playlistRes.playlist
      });
    } catch {
      //
    }
  }

  render () {
    const { userInfo, playlist } = this.state;
    return userInfo ? (
      <div className="user">
        <header className="user-header">
          <div className="user-header-pic">
            <img alt={userInfo.nickname} className="img-circle" src={userInfo.avatarUrl} />
          </div>
          <div className="user-header-info">
            <h3 className="user-header-name">{userInfo.nickname}</h3>
            <ul className="user-header-list">
              <li className="user-header-item">
                <span className="item-count">{userInfo.eventCount}</span>动态
              </li>
              <li className="user-header-item">
                <span className="item-count">{userInfo.follows}</span>关注
              </li>
              <li className="user-header-item">
                <span className="item-count">{userInfo.followeds}</span>粉丝
              </li>
            </ul>
          </div>
        </header>
        {playlist && (
          <section className="user-playlist">
            <h4 className="user-playlist-title">
              创建的歌单
              <i className="user-playlist-count">({playlist.length})</i>
            </h4>
            <SongSheet playList={playlist} isShowArtist={false} />
          </section>
        )}
      </div>
    ) : <Loading />;
  }
}
export default User;
