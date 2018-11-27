import React, { Component } from 'react';
import { getPersonalized, getPersonalizedNew } from 'api/home';
import PlayBox from 'coms/PlayBox';
import NewAlbum from 'coms/NewAlbum';
import CarouselBox from 'coms/CarouselBox';
import './home.scss';
class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      musicList: [],
      playId: 0,
      newAlbumList: []
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
        musicList: musicListRes.result.slice(0, 8),
        newAlbumList: newAlbumListRes.albums
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * 设置推荐歌曲歌单id
  */
  play (playId) {
    this.setState({
      playId
    });
  }

  swipeNext () {
    CarouselBox.next();
  }

  swipePrev () {
    this.reactSwipeEl.prev();
  }

  render () {
    const { musicList, newAlbumList, playId } = this.state;
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
                      <img src={item.picUrl} />
                    </div>
                    <div className="item-info-play">
                      <i className="iconfont icon-headset"></i>
                      <span className="item-info-count">{item.playCount > 10000 ? `${Math.round(item.playCount / 10000)}万` : item.playCount}</span>
                      <i className="iconfont icon-play item-info-play-btn pull-right" onClick={this.play.bind(this, item.id)}></i>
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
              <span className="title-txt">新音乐推荐</span>
            </div>
            <div className="home-new-list">
              {/* <div><NewAlbum playList={newAlbumList.slice(0, 5)} /></div> */}
              {/* <div><NewAlbum playList={newAlbumList.slice(5, 10)} /></div> */}
              <CarouselBox>
                <div>1</div>
                <div>第二页</div>
              </CarouselBox>
              <div onClick={this.swipeNext.bind(this)}>Next</div>
              <div onClick={this.swipePrev.bind(this)}>Previous</div>
            </div>
          </section>
          <PlayBox playListId={playId} />
        </main>
      </div>
    );
  }
}
export default Home;
