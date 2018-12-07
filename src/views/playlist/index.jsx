import React, { Component } from 'react';
import SongSheet from 'coms/SongSheet';
import { getTopPlayList } from 'server/api/playlist';
import { getPlaylistDetail } from 'server/api/home';
import showMessage from 'coms/message';
import scrollBottom from '@/utils/scroll-bottom';
import { debounce } from 'throttle-debounce';
import './playlist.scss';
const PAGE_SIZE = 20;
class Playlist extends Component {
  constructor (props) {
    super(props);
    this.state = {
      playList: []
    };
    // 列表偏移
    this.offset = 0;
    this.isLoading = false;
    this.fetchSong = this.fetchSong.bind(this);
  }

  componentDidMount () {
    this.fetch();
    this.$scrollNode = document.querySelector('.main');
    const loadMore = debounce(300, this.loadMore.bind(this));
    this.$scrollNode.addEventListener('scroll', loadMore, false);
  }

  // 获取播放列表
  async fetch (offset = 0) {
    try {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      const res = await getTopPlayList({
        offset
      });
      if (res.code === 200) {
        this.setState((prev) => ({
          playList: prev.playList.concat(res.playlists)
        }));
        this.offset += PAGE_SIZE;
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  }

  // 获取歌曲资源
  fetchSong (id) {
    getPlaylistDetail(id).then((res) => {
      if (res.code === 200) {
        this.props.setMusic && this.props.setMusic(res.playlist.tracks, id);
      } else {
        showMessage({
          type: 'error',
          message: '暂时不能播放歌单哦'
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  // 滚动加载更多
  loadMore () {
    if (!scrollBottom(this.$scrollNode)) {
      return;
    }
    this.fetch(this.offset);
  }

  render () {
    const { playList } = this.state;
    return (
      <div className="playlist">
        <section className="playlist-box">
          <SongSheet playList={playList} onPlay={this.fetchSong} />
        </section>
      </div>
    );
  }
}
export default Playlist;
