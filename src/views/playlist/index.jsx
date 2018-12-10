import React, { Component } from 'react';
import SongSheet from 'coms/SongSheet';
import { getTopPlayList, getPlaylistCatList } from 'server/api/playlist';
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
      playList: [],
      categories: [],
      isHideCat: true
    };

    this.isLoading = false;
    this.fetchSong = this.fetchSong.bind(this);
    this.sentData = {
      offset: 0,
      order: 'hot'
    };
  }

  componentDidMount () {
    this.fetch();
    this.fetchGategories();
    this.$scrollNode = document.querySelector('.main');
    const loadMore = debounce(300, this.loadMore.bind(this));
    this.$scrollNode.addEventListener('scroll', loadMore, false);
    // 点击其他区域关闭分类模块
    document.addEventListener('click', () => {
      if (!this.state.isHideCat) {
        this.setState({
          isHideCat: true
        });
      }
    }, false);
  }

  openCatList (evt) {
    evt.nativeEvent.stopImmediatePropagation();
    evt.stopPropagation();
    this.setState((prev) => ({
      isHideCat: !prev.isHideCat
    }));
  }

  // 获取播放列表
  async fetch () {
    try {
      if (this.isLoading) {
        return;
      }
      const { offset, order } = this.sentData;
      this.isLoading = true;
      const res = await getTopPlayList({
        offset,
        order
      });
      if (res.code === 200) {
        this.setState((prev) => ({
          playList: prev.playList.concat(res.playlists)
        }));
        this.sentData.offset += PAGE_SIZE;
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

  // 获取分类资源
  fetchGategories () {
    getPlaylistCatList().then((res) => {
      if (res.code === 200) {
        this.setState(() => ({
          categories: res.categories
        }));
      }
    }).catch((err) => {
      console.log(err.msg);
    });
  }

  // 滚动加载更多
  loadMore () {
    if (!scrollBottom(this.$scrollNode)) {
      return;
    }
    this.fetch();
  }

  // 改变顺序
  changeOrder (order) {
    this.sentData.order = order;
    this.sentData.offset = 0;
    this.setState({
      playList: []
    }, () => {
      this.fetch();
    });
  }

  render () {
    const { playList, categories, isHideCat } = this.state;
    return (
      <div className="playlist">
        <div className="playlist-title">
          <div className="playlist-title-btn" onClick={this.openCatList.bind(this)}>
            <h3 className="title-txt">全部</h3>
            <i className="iconfont icon-down"></i>
          </div>
          <div
            className={`playlist-catlist ${isHideCat ? 'hide' : ''}`}
            onClick={(e) => { e.nativeEvent.stopImmediatePropagation(); }}
          >
            <div className="active">全部</div>
            {categories.map((item, index) => (
              <dl className="playlist-catlist-list" key={index}>
                <dt className="playlist-catlist-title">{item.type}</dt>
                <dd className="playlist-catlist-box">
                  {item.subs.map((dd, i) => (
                    <span className="playlist-catlist-item" key={`${index}-${i}`}>{dd.name}</span>
                  ))}
                </dd>
              </dl>
            ))}
          </div>
          <div className="title-tag-box pull-right">
            <button
              className="title-btn active"
              type="button"
              onClick={this.changeOrder.bind(this, 'hot')}
            >热门
            </button>
            <button
              className="title-btn"
              type="button"
              onClick={this.changeOrder.bind(this, 'new')}
            >最新
            </button>
          </div>
        </div>
        <section className="playlist-box">
          <SongSheet playList={playList} onPlay={this.fetchSong} />
        </section>
      </div>
    );
  }
}
export default Playlist;
