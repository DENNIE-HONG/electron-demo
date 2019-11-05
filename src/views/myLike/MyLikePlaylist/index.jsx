/**
 * @file 我收藏的歌单
 * @author luyanhong 2019-10-17
 */
import React, { Component } from 'react';
import SongSheet from 'coms/SongSheet';
import PropTypes from 'prop-types';
import { getPlaylistDetail } from 'api/home';
import showMessage from 'containers/Message';
import { ReactReduxContext } from 'react-redux';
import playAction from '@/redux/actions';
class MyLikePlaylist extends Component {
  static propTypes = {
    playList: PropTypes.array
  }

  static defaultProps = {
    playList: []
  }

  static contextType = ReactReduxContext;

  playDetail = async (playId) => {
    try {
      const res = await getPlaylistDetail(playId);
      const { store } = this.context;
      const payload = {
        playId,
        playList: res.playlist.tracks
      };
      store.dispatch(playAction(payload));
    } catch {
      showMessage({
        type: 'error',
        message: '歌单播放不了呢'
      });
    }
  }

  render () {
    const { playList } = this.props;
    return (
      <section>
        <SongSheet playList={playList} isShowArtist={false} onPlay={this.playDetail} />
      </section>
    );
  }
}

export default MyLikePlaylist;
