/**
 * @file 搜索歌单
 * @author luyanhong 2019-09-06
 */
import React from 'react';
import LoadMore from 'coms/LoadMore';
import SongSheet from 'coms/SongSheet';
import { getSearch } from 'api/search';
import PropTypes from 'prop-types';

const SearchPlaylist = (props) => {
  const { keywords, isShow } = props;
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
          <SongSheet playList={list} />
        )}
      />
    </section>
  );
};
SearchPlaylist.propTypes = {
  keywords: PropTypes.string.isRequired,
  isShow: PropTypes.bool
};
SearchPlaylist.defaultProps = {
  isShow: true
};
export default SearchPlaylist;
