import React, { Component } from 'react';
import { getLikedAlbums } from 'api/album';
import NewAlbum from 'coms/NewAlbum';
import LoadMore from 'containers/LoadMore';
import PropTypes from 'prop-types';
import EmptyList from 'coms/EmptyList';
class MyLikeAlbums extends Component {
  static propTypes = {
    isFetch: PropTypes.bool
  }

  static defaultProps = {
    isFetch: false
  }

  render () {
    const { isFetch } = this.props;
    return (
      <section>
        <LoadMore
          isFetch={isFetch}
          params={{}}
          getUrl={getLikedAlbums}
          listPropName="data"
          render={({ list }) => (
            list.length ? <NewAlbum playList={list} /> : <EmptyList />
          )}
        />
      </section>
    );
  }
}

export default MyLikeAlbums;
