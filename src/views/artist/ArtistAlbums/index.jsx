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
import { ReactReduxContext } from 'react-redux';
import showMessage from 'coms/message';
import playAction from '@/redux/actions';
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

  static contextType = ReactReduxContext;

  constructor (props) {
    super(props);
    this.playAlbum = this.playAlbum.bind(this);
  }

  // 播放专辑
  async playAlbum (playId) {
    try {
      const res = await getAlbum(playId);
      const { store } = this.context;
      const payload = {
        playId,
        playList: res.songs
      };
      store.dispatch(playAction(payload));
    } catch {
      showMessage({
        type: 'error',
        message: '暂时无法播放专辑哦'
      });
    }
  }

  render () {
    const { id, isFetch } = this.props;
    return (
      <LoadMore
        limit={50}
        getUrl={getArtistAlbum}
        params={{ id }}
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
