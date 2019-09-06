/**
 * @file 搜索专辑
 * @param {String}  keywords, 必须，关键字
 * @param {Boolean} isShow, 是否展示
 * @author luyanhong 2019-09-06
 */
import React, { PureComponent } from 'react';
import LoadMore from 'coms/LoadMore';
import { getSearch } from 'api/search';
import NewAlbum from 'coms/NewAlbum';
import PropTypes from 'prop-types';
class SearchAlbum extends PureComponent {
  static propTypes = {
    keywords: PropTypes.string.isRequired,
    isShow: PropTypes.bool
  }

  static defaultProps = {
    isShow: false
  }

  render () {
    const { keywords, isShow } = this.props;
    const params = {
      keywords,
      type: 'album'
    };
    return (
      <section className="search-albums">
        <LoadMore
          getUrl={getSearch}
          listPropName="list"
          params={params}
          limit={25}
          isFetch={isShow}
          render={({ list }) => (
            <NewAlbum playList={list} />
          )}
        />
      </section>
    );
  }
}
export default SearchAlbum;
