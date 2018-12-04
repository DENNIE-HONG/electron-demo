import React, { Component } from 'react';
import {
  getPersonalized,
  getPersonalizedNew,
  getPlaylistDetail,
  getAlbum
} from 'api/home';
import PlayBox from 'coms/PlayBox';
import NewAlbum from 'coms/NewAlbum';
import CarouselBox from 'coms/CarouselBox';
import showMessage from 'coms/message';
import TopList from 'coms/TopList';
import LazyImage from 'coms/LazyImage';
import './home.scss';
class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      musicList: [],
      playId: 0,
      newAlbumList: [],
      playList: []
    };
    this.fetch();
  }

  async fetch () {
    // 推荐歌单
    try {
      const [musicListRes, newAlbumListRes] = await Promise.all([
        getPersonalized(),
        getPersonalizedNew(10)
      ]);
      this.setState({
        musicList: musicListRes.result.slice(0, 4),
        newAlbumList: newAlbumListRes.albums
      });
    } catch (err) {
      console.log(err);
    }
  }

  swipeNext () {
    CarouselBox.next();
  }

  swipePrev () {
    CarouselBox.prev();
  }

  // 获取歌单列表
  async fetchPlaylistDetail (playId) {
    try {
      const res = await getPlaylistDetail(playId);
      if (res.code === 200) {
        this.setState({
          playList: res.playlist.tracks,
          playId
        });
      } else {
        this.fail('资源获取失败了');
      }
    } catch (err) {
      this.fail(err.message);
    }
  }

  // 获取专辑内容
  async fetchAlbum (playId) {
    try {
      const res = await getAlbum(playId);
      if (res.code === 200) {
        this.setState({
          playList: res.songs,
          playId
        });
      } else {
        this.fail('资源获取失败啦');
      }
    } catch (err) {
      this.fail(err.message);
    }
  }

  // 回调获取榜单列表
  fetchTop (playList, playId) {
    this.setState({
      playList,
      playId
    });
  }

  fail (message) {
    showMessage({
      type: 'error',
      message
    });
  }

  render () {
    const {
      musicList,
      newAlbumList,
      playList,
      playId
    } = this.state;
    return (
      <div className="home">
        <main className="global-clearfix">
          <section className="home-recommend">
            <div className="home-title">
              <i className="iconfont icon-circle"></i>
              <span className="title-txt">热门推荐</span>
            </div>
            <ul className="home-list">
              {musicList.map((item) => (
                <li className="home-list-item" key={item.id}>
                  <div className="item-info">
                    <div className="item-info-pic">
                      {/* <img src={item.picUrl} alt={item.name} /> */}
                      <LazyImage src={item.picUrl} alt={item.name} />
                    </div>
                    <div className="item-info-play">
                      <i className="iconfont icon-headset"></i>
                      <span className="item-info-count">{item.playCount > 10000 ? `${Math.round(item.playCount / 10000)}万` : item.playCount}</span>
                      <i className="iconfont icon-play item-info-play-btn pull-right" onClick={this.fetchPlaylistDetail.bind(this, item.id)}></i>
                    </div>
                  </div>
                  <h4 className="item-title">{item.name}</h4>
                </li>
              ))}
            </ul>
          </section>
          <section className="home-new">
            <div className="home-title">
              <i className="iconfont icon-circle"></i>
              <span className="title-txt">新碟上架</span>
            </div>
            <div className="home-new-list">
              <CarouselBox speed={0.9}>
                <NewAlbum playList={newAlbumList.slice(0, 5)} getPlayId={this.fetchAlbum.bind(this)} />
                <NewAlbum playList={newAlbumList.slice(5, 10)} getPlayId={this.fetchAlbum.bind(this)} />
              </CarouselBox>
              <div
                onClick={this.swipeNext.bind(this)}
                className="home-new-nextbtn"
              ><i className="iconfont icon-right"></i>
              </div>
              <div
                onClick={this.swipePrev.bind(this)}
                className="home-new-prevbtn"
              ><i className="iconfont icon-left"></i>
              </div>
            </div>
          </section>
          <section className="home-top">
            <div className="home-title">
              <i className="iconfont icon-circle"></i>
              <span className="title-txt">榜单</span>
            </div>
            <TopList getPlayList={this.fetchTop.bind(this)} />
          </section>
          <PlayBox playList={playList} id={playId} />
        </main>
      </div>
    );
  }
}
export default Home;
