/**
 * @file 歌手页
 * @author luyanhong 2019-08-16
 */
import React, { Component } from 'react';
import { getArtistSongs } from 'api/artist';
import BaseTabs, { BaseTabsPane } from 'containers/BaseTabs';
import SongTableList from 'containers/SongTableList';
import ArtistDesc from './ArtistDesc';
import ArtistHeader from './ArtistHeader';
import ArtistAlbums from './ArtistAlbums';
import './artist.scss';
class Artist extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: null,
      hotSongs: [],
      isShowAlbums: false,
      isShowDesc: false
    };
    this.handlerTabChange = this.handlerTabChange.bind(this);
  }

  async componentDidMount () {
    const { id } = this.props.match.params;
    const resSongs = await getArtistSongs(id);
    this.setState({
      info: resSongs.artist,
      hotSongs: resSongs.hotSongs
    });
  }

  handlerTabChange (tag) {
    switch (tag) {
      case 'albums':
        !this.state.isShowAlbums && this.setState({
          isShowAlbums: true
        });
        break;
      case 'mv':
        break;
      case 'desc':
        !this.state.isShowDesc && this.setState({
          isShowDesc: true
        });
        break;
      default:
        break;
    }
  }

  render () {
    const {
      info, hotSongs, isShowAlbums, isShowDesc
    } = this.state;
    const { id } = this.props.match.params;
    return info && (
      <div className="artist">
        <ArtistHeader info={info} />
        <div className="artist-content">
          <BaseTabs activeName="songs" tabClick={this.handlerTabChange}>
            <BaseTabsPane label="热门歌曲" name="songs">
              <section className="artist-songs">
                <SongTableList data={hotSongs} isIndex artistName={null} />
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
              <ArtistDesc id={id} name={info.name} isFetch={isShowDesc} />
            </BaseTabsPane>
          </BaseTabs>
        </div>
      </div>
    );
  }
}
export default Artist;
