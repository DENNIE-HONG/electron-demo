import React, { Component } from 'react';
import BaseTabs, { BaseTabsPane } from 'coms/BaseTabs';
import login from 'coms/UserLogin';
import { getLoginStatus } from 'api/login';
import { getUserPlaylist } from 'api/user';
import { getPlaylistDetail } from 'api/playlist';
import BaseTable, { BaseTableColumn } from 'coms/BaseTable';
import BaseButton from 'coms/BaseButton';
import MyLikeAlbums from './MyLikeAlbums';
import MyLikePlaylist from './MyLikePlaylist';
import './myLike.scss';
class MyLike extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLogin: null,
      list: [],
      id: null,
      isShowAlbums: false,
      playList: []
    };
  }

  async componentDidMount () {
    try {
      const res = await getLoginStatus();
      const { userId } = res.profile;
      const resList = await getUserPlaylist(userId);
      const { id } = resList.playlist[0];
      const resPlaylist = await getPlaylistDetail(id);
      this.setState({
        isLogin: true,
        list: resPlaylist.playlist.tracks,
        id,
        playList: resList.playlist.slice(1)
      });
    } catch {
      login(() => {
        setTimeout(() => {
          window.location.reload();
        }, 200);
      });
    }
  }

  linkTo = (pathname) => {
    this.props.history.push({
      pathname
    });
  }

  onPlay = (idx) => {
    const { list } = this.state;
    const song = list[idx];
    this.props.setMusic && this.props.setMusic([song], song.id);
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

  render () {
    const {
      isLogin, list, isShowAlbums, playList
    } = this.state;
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
                <BaseTable data={list} keyName="id">
                  <BaseTableColumn width="40" onClick={this.onPlay}><i className="iconfont icon-play my-songs-icon"></i></BaseTableColumn>
                  <BaseTableColumn
                    label="歌曲"
                    prop="name"
                    className="nav-link"
                    onClick={(idx) => { this.linkTo(`/song/${list[idx].id}`); }}
                  >
                  </BaseTableColumn>
                  <BaseTableColumn label="歌手" prop="singers" className="nav-link" onClick={(idx) => { this.linkTo(`/artist/${list[idx].ar[0].id}`); }}></BaseTableColumn>
                  <BaseTableColumn label="专辑" prop="album" className="nav-link" onClick={(idx) => { this.linkTo(`/album/${list[idx].al.id}`); }}></BaseTableColumn>
                  <BaseTableColumn label="时长" prop="durationPretty" width="70"></BaseTableColumn>
                </BaseTable>
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
export default MyLike;
