/**
 * @file 歌手页
 * @author luyanhong 2019-08-16
 */
import React, { Component } from 'react';
import { getArtistDesc, getArtistSongs, getArtistAlbum } from 'api/artist';
import BaseTable, { BaseTableColumn } from 'coms/BaseTable';
import BaseTabs, { BaseTabsPane } from 'coms/BaseTabs';
import ArtistHeader from './ArtistHeader';
import './artist.scss';
class Artist extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: null,
      hotSongs: [],
      albums: []
    };
    this.handlerTabChange = this.handlerTabChange.bind(this);
  }

  async componentDidMount () {
    const { id } = this.props.match.params;
    const [resDesc, resSongs] = await Promise.all([
      getArtistDesc(id),
      getArtistSongs(id)
    ]);
    this.setState({
      info: resSongs.artist,
      hotSongs: resSongs.hotSongs
    });
  }

  onPlay = (idx) => {
    const track = this.state.hotSongs[idx];
    this.props.setMusic([track], track.id);
  }

  linkToSong = (idx) => {
    const { id } = this.state.hotSongs[idx];
    this.props.history.push({
      pathname: `/song/${id}`
    });
  }

  linkToAlbum = (idx) => {
    const { id } = this.state.hotSongs[idx].al;
    this.props.history.push({
      pathname: `/album/${id}`
    });
  }

  handlerTabChange (tag) {
    console.log('收到', tag);
    switch (tag) {
      case 'albums':
        this.fetchAlbums();
        break;
      case 'mv':
        break;
      default:
        break;
    }
  }

  async fetchAlbums () {
    try {
      const { id } = this.props.match.params;
      const params = {
        offset: 0,
        id
      };
      const res = await getArtistAlbum(params);
    } catch (err) {
      console.log(err);
    }
  }

  render () {
    const { info, hotSongs } = this.state;
    return (
      <div className="artist">
        <ArtistHeader info={info} />
        <div className="artist-content">
          <BaseTabs activeName="songs" tabClick={this.handlerTabChange}>
            <BaseTabsPane label="热门歌曲" name="songs">
              <section className="artist-songs">
                <BaseTable data={hotSongs} isIndex keyName="id">
                  <BaseTableColumn width="40" onClick={this.onPlay}>
                    <i className="iconfont icon-play artist-songs-icon"></i>
                  </BaseTableColumn>
                  <BaseTableColumn label="歌曲" prop="name" className="nav-link" onClick={this.linkToSong} />
                  <BaseTableColumn label="时间" prop="durationPretty" width="70" />
                  <BaseTableColumn label="专辑" prop="album" className="nav-link" onClick={this.linkToAlbum} />
                </BaseTable>
              </section>
            </BaseTabsPane>
            <BaseTabsPane label="专辑" name="albums">
              <section className="artist-albums">
                <h4 className="title">
                  <span className="title-txt">专辑</span>
                </h4>
              </section>
            </BaseTabsPane>
            <BaseTabsPane label="相关MV" name="mv">
              ewf
            </BaseTabsPane>
            <BaseTabsPane label="艺人介绍" name="desc">
              ewf
            </BaseTabsPane>
          </BaseTabs>
        </div>
      </div>
    );
  }
}
export default Artist;
