/**
 * @file 个人主页
 * @author luyanhong 2019-11-21
 */
import React, { Component } from 'react';
import { getPlaylistDetail } from 'api/home';
import { getUserPlaylist } from 'api/user';
import SongSheet from 'containers/SongSheet';
import { connect } from 'react-redux';
import playAction from '@/redux/actions';
const mapDispatchToProps = (dispatch) => ({
  setMusic: (playList, playId) => {
    const payload = {
      playId,
      playList
    };
    dispatch(playAction(payload));
  }
});
@connect(null, mapDispatchToProps)
class UserHome extends Component {
  constructor (props) {
    super(props);
    this.state = {
      playlist: null
    };
  }

  async componentDidMount () {
    const { id } = this.props.match.params;
    try {
      const res = await getUserPlaylist(id);
      this.setState({
        playlist: res.playlist
      });
    } catch {
      //
    }
  }

  // 获取歌单列表
  fetchPlaylistDetail = async (playId) => {
    try {
      const res = await getPlaylistDetail(playId);
      this.props.setMusic(res.playlist.tracks, playId);
    } catch (err) {
      this.fail(err);
    }
  }

  render () {
    const { playlist } = this.state;
    return playlist && (
      <section className="user-playlist">
        <h4 className="user-playlist-title">
          创建的歌单
          <i className="user-playlist-count">({playlist.length})</i>
        </h4>
        <SongSheet playList={playlist} isShowArtist={false} onPlay={this.fetchPlaylistDetail} />
      </section>
    );
  }
}

export default UserHome;
