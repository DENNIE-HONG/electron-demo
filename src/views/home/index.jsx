import React, { Component } from 'react';
import {
  getPersonalized,
  getPersonalizedNew,
  getPlaylistDetail,
  getAlbum
} from 'api/home';
import NewAlbum from 'coms/NewAlbum';
import CarouselBox from 'coms/CarouselBox';
import showMessage from 'coms/message';
import TopList from 'coms/TopList';
import SongSheet from 'coms/SongSheet';
import './home.scss';
class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      musicList: [],
      newAlbumList: []
    };
    this.fetch();
  }

  // 回调，设置播放音乐列表
  setPlayMusic = (playList, playId) => {
    this.props.setMusic && this.props.setMusic(playList, playId);
  }

  async fetch () {
    // 推荐歌单
    try {
      const [musicListRes, newAlbumListRes] = await Promise.all([
        getPersonalized(),
        getPersonalizedNew(10)
      ]);
      this.setState({
        musicList: musicListRes.result.slice(0, 5),
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
        this.setPlayMusic(res.playlist.tracks, playId);
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
        this.setPlayMusic(res.songs, playId);
      } else {
        this.fail('资源获取失败啦');
      }
    } catch (err) {
      this.fail(err.message);
    }
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
      newAlbumList
    } = this.state;
    return (
      <div className="home">
        <main className="global-clearfix">
          <section className="home-recommend">
            <div className="home-title">
              <i className="iconfont icon-circle"></i>
              <span className="title-txt">热门推荐</span>
            </div>
            <SongSheet
              playList={musicList}
              isShowArtist={false}
              onPlay={this.fetchPlaylistDetail.bind(this)}
            />
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
            <TopList getPlayList={this.setPlayMusic} />
          </section>
        </main>
      </div>
    );
  }
}
export default Home;
