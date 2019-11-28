import React, { Component } from 'react';
import SongSheet from 'coms/SongSheet';
import { getTopPlayList, getPlaylistCatList } from 'api/playlist';
import { getPlaylistDetail } from 'api/home';
import showMessage from 'containers/Message';
import ScrollBottom from 'containers/ScrollBottom';
import './playlist.scss';

class Playlist extends Component {
  constructor (props) {
    super(props);
    this.state = {
      categories: [],
      isHideCat: true,
      sentData: {
        order: 'hot',
        cat: '全部'
      }
    };
  }

  componentDidMount () {
    // 点击其他区域关闭分类模块
    document.addEventListener('click', this.closeCatList, false);
  }

  componentWillUnmount () {
    // 要解除绑定
    document.removeEventListener('click', this.closeCatList, false);
  }

  // 打开分类
  openCatList = (evt) => {
    evt.nativeEvent.stopImmediatePropagation();
    evt.stopPropagation();
    if (!this.state.categories.length) {
      this.fetchGategories();
    }
    this.setState((prev) => ({
      isHideCat: !prev.isHideCat
    }));
  }

  closeCatList = () => {
    if (!this.state.isHideCat) {
      this.setState({
        isHideCat: true
      });
    }
  }

  // 获取歌曲资源
  fetchSong = async (id) => {
    try {
      const res = await getPlaylistDetail(id);
      this.props.setMusic && this.props.setMusic(res.playlist.tracks, id);
    } catch (err) {
      showMessage({
        type: 'error',
        message: '暂时不能播放歌单哦'
      });
    }
  }

  // 获取分类资源
   fetchGategories = async () => {
     try {
       const res = await getPlaylistCatList();
       this.setState(() => ({
         categories: res.categories
       }));
     } catch (err) {
       console.log(err.msg);
     }
   }

  // 改变顺序
  changeOrder = (order) => {
    const { sentData } = this.state;
    const data = Object.assign({}, sentData, {
      order
    });
    this.setState({
      sentData: data
    });
  }

  // 改变标签
  changeCat = (cat) => {
    const { sentData } = this.state;
    if (cat === sentData.cat) {
      return;
    }
    const data = Object.assign({}, sentData, {
      cat
    });
    this.setState({
      isHideCat: true,
      sentData: data
    });
  }


  render () {
    const {
      categories,
      isHideCat,
      sentData
    } = this.state;
    const { cat, order } = sentData;
    return (
      <div className="playlist">
        <div className="playlist-title">
          <div className="playlist-title-btn" onClick={this.openCatList}>
            <h3 className="title-txt">{cat}</h3>
            <i className={`iconfont icon-down ${isHideCat ? '' : 'active'}`}></i>
          </div>
          <div
            className={`playlist-catlist ${isHideCat ? 'hide' : ''}`}
            onClick={(e) => { e.nativeEvent.stopImmediatePropagation(); }}
          >
            <div
              className={cat === '全部' ? 'active' : ''}
              onClick={() => this.changeCat('全部')}
            >全部
            </div>
            {categories.map((item, index) => (
              <dl className="playlist-catlist-list" key={index}>
                <dt className="playlist-catlist-title">{item.type}</dt>
                <dd className="playlist-catlist-box">
                  {item.subs.map((dd, i) => (
                    <span
                      className={`playlist-catlist-item ${cat === dd.name && 'active'}`}
                      key={`${index}-${i}`}
                      onClick={() => this.changeCat(dd.name)}
                    >{dd.name}
                    </span>
                  ))}
                </dd>
              </dl>
            ))}
          </div>
          <div className="title-tag-box pull-right">
            <button
              className={`title-btn ${order === 'hot' ? 'active' : ''}`}
              type="button"
              onClick={() => this.changeOrder('hot')}
            >热门
            </button>
            <button
              className={`title-btn ${order === 'new' ? 'active' : ''}`}
              type="button"
              onClick={() => this.changeOrder('new')}
            >最新
            </button>
          </div>
        </div>
        <section className="playlist-box">
          <ScrollBottom
            getUrl={getTopPlayList}
            limit={20}
            listPropName="playlists"
            params={sentData}
            render={({ list }) => (
              <SongSheet playList={list} onPlay={this.fetchSong} />
            )}
          />
        </section>
      </div>
    );
  }
}
export default Playlist;
