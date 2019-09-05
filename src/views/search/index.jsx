/**
 * @file 搜索页
 * @author luyanhong 2019-09-05
 */
import React, { Component } from 'react';
import BaseTabs, { BaseTabsPane } from 'coms/BaseTabs';
import { parse } from 'querystringify';
import { getSearch } from 'api/search';
import LoadMore from 'coms/LoadMore';
import BaseTable, { BaseTableColumn } from 'coms/BaseTable';
import './search.scss';
class Search extends Component {
  state = {
    keywords: '',
    displayAlbum: false,
    displayPlaylist: false
  }

  componentDidMount () {
    const query = parse(this.props.location.search);
    const { keywords } = query;
    this.setState({
      keywords
    });
  }

  handlerTabChange = (tag) => {
    console.log('收到', tag);
    switch (tag) {
      case 'albums':
        !this.state.displayAlbum && this.setState({
          displayAlbum: true
        });
        break;
      case 'mv':
        break;
      case 'playlist':
        !this.state.displayPlaylist && this.setState({
          displayPlaylist: true
        });
        break;
      default:
        break;
    }
  }


  render () {
    const { keywords, displayAlbum } = this.state;
    const params = { keywords };
    return keywords && (
      <div className="search">
        <h3 className="search-title">搜索<em>{keywords}</em></h3>
        <BaseTabs activeName="songs" tabClick={this.handlerTabChange}>
          <BaseTabsPane label="单曲" name="songs">
            <LoadMore
              getUrl={getSearch}
              listPropName="list"
              params={params}
              limit={30}
              isMountedFetch
              render={({ list }) => (
                <section className="search-songs">
                  <BaseTable data={list}>
                    <BaseTableColumn label="歌曲" prop="name"></BaseTableColumn>
                    <BaseTableColumn label="歌手" prop="artist"></BaseTableColumn>
                    <BaseTableColumn label="专辑" prop="album"></BaseTableColumn>
                    <BaseTableColumn label="时长" prop="durationPretty"></BaseTableColumn>
                  </BaseTable>
                </section>
              )}
            />
          </BaseTabsPane>
          <BaseTabsPane label="专辑" name="albums">bb</BaseTabsPane>
          <BaseTabsPane label="歌单" name="playlist">歌单</BaseTabsPane>
          <BaseTabsPane label="MV" name="mv">没做</BaseTabsPane>
        </BaseTabs>
      </div>
    );
  }
}
export default Search;
