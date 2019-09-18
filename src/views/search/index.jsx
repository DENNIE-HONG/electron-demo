/**
 * @file 搜索页
 * @author luyanhong 2019-09-05
 */
import React, { Component } from 'react';
import BaseTabs, { BaseTabsPane } from 'coms/BaseTabs';
import { parse } from 'querystringify';
import { getSearch } from 'api/search';
import LoadMore from 'coms/LoadMore';
import BaseTable, { BaseTableColumn } from 'coms/BaseTable';
import BaseButton from 'coms/BaseButton';
import SearchAlbum from './SearchAlbum';
import SearchPlaylist from './SearchPlaylist';
import './search.scss';
class Search extends Component {
  state = {
    keywords: '',
    displayAlbum: false,
    displayPlaylist: false
  }

  componentDidMount () {
    const query = parse(this.props.location.search);
    const { keywords } = query;
    this.setState({
      keywords
    });
  }

  navLink = (id, type = 'song') => {
    this.props.history.push({
      pathname: `/${type}/${id}`
    });
  }

  // 播放单曲
  playSong = (song) => {
    const { id } = song;
    this.props.setMusic([song], id);
  }

  // 播放全部歌曲
  playAllSongs = (songs) => {
    const { id } = songs[0];
    this.props.setMusic(songs, id);
  }

  // 切换tab
  handlerTabChange = (tag) => {
    switch (tag) {
      case 'albums':
        !this.state.displayAlbum && this.setState({
          displayAlbum: true
        });
        break;
      case 'mv':
        break;
      case 'playlist':
        !this.state.displayPlaylist && this.setState({
          displayPlaylist: true
        });
        break;
      default:
        break;
    }
  }

  render () {
    const { keywords, displayAlbum, displayPlaylist } = this.state;
    const params = { keywords };
    return keywords && (
      <div className="search">
        <h3 className="search-title">搜索<em>{keywords}</em></h3>
        <BaseTabs activeName="songs" tabClick={this.handlerTabChange}>
          <BaseTabsPane label="单曲" name="songs">
            <LoadMore
              getUrl={getSearch}
              listPropName="list"
              params={params}
              limit={30}
              isMountedFetch
              render={({ list }) => (
                <section className="search-songs">
                  <div className="search-songs-btns">
                    <BaseButton icon="play" type="primary" onClick={this.playAllSongs.bind(this, list)}>播放全部</BaseButton>
                  </div>
                  <BaseTable data={list} keyName="id">
                    <BaseTableColumn width="40" onClick={(idx) => this.playSong(list[idx])}>
                      <i className="iconfont icon-play search-songs-icon"></i>
                    </BaseTableColumn>
                    <BaseTableColumn label="歌曲" prop="name" className="nav-link" onClick={(idx) => this.navLink(list[idx].id)}></BaseTableColumn>
                    <BaseTableColumn label="歌手" prop="artist" className="nav-link" onClick={(idx) => this.navLink(list[idx].artists[0].id, 'artist')}></BaseTableColumn>
                    <BaseTableColumn label="专辑" prop="albumName" className="nav-link" onClick={(idx) => this.navLink(list[idx].album.id, 'album')}></BaseTableColumn>
                    <BaseTableColumn label="时长" prop="durationPretty"></BaseTableColumn>
                  </BaseTable>
                </section>
              )}
            />
          </BaseTabsPane>
          <BaseTabsPane label="专辑" name="albums">
            <SearchAlbum isShow={displayAlbum} keywords={keywords} />
          </BaseTabsPane>
          <BaseTabsPane label="歌单" name="playlist">
            <SearchPlaylist keywords={keywords} isShow={displayPlaylist} />
          </BaseTabsPane>
          <BaseTabsPane label="MV" name="mv">没做</BaseTabsPane>
        </BaseTabs>
      </div>
    );
  }
}
export default Search;
