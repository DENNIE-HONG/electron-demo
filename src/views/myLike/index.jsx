import React, { Component } from 'react';
import BaseTabs, { BaseTabsPane } from 'coms/BaseTabs';
import login from 'coms/UserLogin';
import { getUserPlaylist } from 'api/user';
import { getPlaylistDetail } from 'api/playlist';
import BaseButton from 'coms/BaseButton';
import SongTableList from 'coms/SongTableList';
import { connect } from 'react-redux';
import MyLikeAlbums from './MyLikeAlbums';
import MyLikePlaylist from './MyLikePlaylist';
import './myLike.scss';
const mapStateToProps = (state) => {
  const { isLogin, userInfo } = state.loginReducer;
  return {
    isLogin,
    userInfo
  };
};
class MyLikeView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      list: [],
      id: null,
      isShowAlbums: false,
      playList: []
    };
  }

  async componentDidMount () {
    const { isLogin, userInfo } = this.props;
    if (!isLogin) {
      login((profile) => {
        // 请求数据
        this.fetchData(profile);
      });
      return;
    }

    this.fetchData(userInfo);
  }

  // 播放全部
  onPlayAll = () => {
    const { list, id } = this.state;
    this.props.setMusic(list, id);
  }

  handlerTabChange = (tag) => {
    switch (tag) {
      case 'albums':
        !this.state.isShowAlbums && this.setState({
          isShowAlbums: true
        });
        break;
      default:
        break;
    }
  }

  async fetchData (profile) {
    const { userId } = profile;
    const resList = await getUserPlaylist(userId);
    const { id } = resList.playlist[0];
    const resPlaylist = await getPlaylistDetail(id);
    this.setState({
      list: resPlaylist.playlist.tracks,
      id,
      playList: resList.playlist.slice(1)
    });
  }

  render () {
    const {
      list, isShowAlbums, playList
    } = this.state;
    const { isLogin } = this.props;
    return isLogin && (
      <div className="my">
        <h3 className="my-title">我喜欢</h3>
        <div className="my-content">
          <BaseTabs activeName="songs" tabClick={this.handlerTabChange}>
            <BaseTabsPane label={`歌曲(${list.length})`} name="songs">
              <section className="my-songs">
                <div className="my-songs-btns">
                  <BaseButton icon="play" type="primary" onClick={this.onPlayAll}>播放全部</BaseButton>
                </div>
                <SongTableList data={list} isIndex={false} />
              </section>
            </BaseTabsPane>
            <BaseTabsPane label="专辑" name="albums">
              <MyLikeAlbums isFetch={isShowAlbums} />
            </BaseTabsPane>
            <BaseTabsPane label={`歌单(${playList.length})`} name="playlist">
              <MyLikePlaylist playList={playList} />
            </BaseTabsPane>
          </BaseTabs>
        </div>
      </div>
    );
  }
}
const MyLike = connect(
  mapStateToProps
)(MyLikeView);
export default MyLike;
