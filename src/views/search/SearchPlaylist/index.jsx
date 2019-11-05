/**
 * @file 搜索歌单
 * @param {String}  keywords, 必须，搜索关键词，非空
 * @param {Boolean} isShow, 是否展示，默认否
 * @author luyanhong 2019-09-06
 */
import React, { PureComponent } from 'react';
import LoadMore from 'containers/LoadMore';
import SongSheet from 'coms/SongSheet';
import { getSearch } from 'api/search';
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux';
import { getPlaylistDetail } from 'api/home';
import showMessage from 'containers/Message';
import playAction from '@/redux/actions';
class SearchPlaylist extends PureComponent {
  static propTypes = {
    keywords: PropTypes.string.isRequired,
    isShow: PropTypes.bool
  }

  static defaultProps = {
    isShow: true
  }

  static contextType = ReactReduxContext;

  playDetail = async (playId) => {
    try {
      const res = await getPlaylistDetail(playId);
      const { store } = this.context;
      const payload = {
        playId,
        playList: res.playlist.tracks
      };
      store.dispatch(playAction(payload));
    } catch {
      showMessage({
        type: 'error',
        message: '歌单播放不了呢'
      });
    }
  }

  render () {
    const { keywords, isShow } = this.props;
    const params = {
      keywords,
      type: 'playlist'
    };
    return (
      <section className="search-playlist">
        <LoadMore
          getUrl={getSearch}
          listPropName="list"
          params={params}
          limit={25}
          isFetch={isShow}
          render={({ list }) => (
            <SongSheet playList={list} onPlay={this.playDetail} />
          )}
        />
      </section>
    );
  }
}
export default SearchPlaylist;
