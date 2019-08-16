/**
 * @file 歌手页
 * @author luyanhong 2019-08-16
 */
import React, { Component } from 'react';
import { getArtistDesc, getArtistSongs } from 'api/artist';
import BaseTable, { BaseTableColumn } from 'coms/BaseTable';
import BaseTabs, { BaseTabsPane } from 'coms/BaseTabs';
import ArtistHeader from './ArtistHeader';
import './artist.scss';
class Artist extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: null,
      hotSongs: []
    };
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

  render () {
    const { info, hotSongs } = this.state;
    return (
      <div className="artist">
        <ArtistHeader info={info} />
        <div className="artist-content">
          <BaseTabs>
            <BaseTabsPane label="热门歌曲">ae</BaseTabsPane>
            <BaseTabsPane label="专辑">ee</BaseTabsPane>
          </BaseTabs>
          <section className="artist-songs">
            <h4 className="title">
              <span className="title-txt">热门歌曲</span>
            </h4>
            <BaseTable data={hotSongs} isIndex keyName="id">
              <BaseTableColumn width="40" onClick={this.onPlay}>
                <i className="iconfont icon-play artist-songs-icon"></i>
              </BaseTableColumn>
              <BaseTableColumn label="歌曲" prop="name" className="nav-link" onClick={this.linkToSong} />
              <BaseTableColumn label="时间" prop="durationPretty" width="70" />
              <BaseTableColumn label="专辑" prop="album" className="nav-link" onClick={this.linkToAlbum} />
            </BaseTable>
          </section>
          <section className="artist-albums">
            <h4 className="title">
              <span className="title-txt">专辑</span>
            </h4>
          </section>
        </div>
      </div>
    );
  }
}
export default Artist;
