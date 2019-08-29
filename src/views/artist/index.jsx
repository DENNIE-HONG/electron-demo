/**
 * @file 歌手页
 * @author luyanhong 2019-08-16
 */
import React, { Component } from 'react';
import { getArtistDesc, getArtistSongs, getArtistAlbum } from 'api/artist';
import BaseTable, { BaseTableColumn } from 'coms/BaseTable';
import BaseTabs, { BaseTabsPane } from 'coms/BaseTabs';
import ArtistHeader from './ArtistHeader';
import ArtistAlbums from './ArtistAlbums';
import './artist.scss';
const DESC_DEFAULT = '暂无介绍';
class Artist extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: null,
      hotSongs: [],
      albums: [],
      isShowAlbums: false,
      desc: DESC_DEFAULT
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
        !this.state.isShowAlbums && this.setState({
          isShowAlbums: true
        });
        break;
      case 'mv':
        break;
      case 'desc':
        this.state.desc === DESC_DEFAULT && this.fetchDesc();
        break;
      default:
        break;
    }
  }

  async fetchDesc () {
    const { id } = this.props.match.params;
    const resDesc = await getArtistDesc(id);
    this.setState({
      desc: resDesc
    });
  }

  render () {
    const {
      info, hotSongs, isShowAlbums, desc
    } = this.state;
    const { id } = this.props.match.params;
    return info && (
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
                <ArtistAlbums id={id} isFetch={isShowAlbums} />
              </section>
            </BaseTabsPane>
            <BaseTabsPane label="相关MV" name="mv">
              ewf
            </BaseTabsPane>
            <BaseTabsPane label="艺人介绍" name="desc">
              <section className="artist-desc">
                <h4 className="artist-desc-title">
                  {info.name}简介
                </h4>
                <p className="artist-desc-content">
                  {desc.briefDesc}
                </p>
              </section>
            </BaseTabsPane>
          </BaseTabs>
        </div>
      </div>
    );
  }
}
export default Artist;
