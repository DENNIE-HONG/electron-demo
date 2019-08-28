/**
 * @file 歌手的专辑模块
 * @param {String}   id, 歌手id
 * @param {Boolean}  isFetch, 是否开始请求数据，默认否
 * @author luyanhong 2019-08-28
 */
import React, { Component } from 'react';
import NewAlbum from 'coms/NewAlbum';
import LoadMore from 'coms/LoadMore';
import { getArtistAlbum } from 'api/artist';
import { getAlbum } from 'api/album';
import PropTypes from 'prop-types';
class ArtistAlbums extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    isFetch: PropTypes.bool
  };

  static defaultProps = {
    isFetch: false
  }

  constructor (props) {
    super(props);
    console.log(1);
  }

  // 暂时不可听
  playAlbum (playId) {
    console.log(playId);
  }

  render () {
    const { id, isFetch } = this.props;
    return (
      <LoadMore
        limit={50}
        getUrl={getArtistAlbum}
        id={id}
        listPropName="hotAlbums"
        isFetch={isFetch}
        render={({ list }) => (
          <NewAlbum getPlayId={this.playAlbum} playList={list} />
        )}
      />
    );
  }
}
export default ArtistAlbums;
