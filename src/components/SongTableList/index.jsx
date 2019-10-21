/**
 * @file 歌曲列表表格
 * @param {Array}    data, 列表数据
 * @param {Boolean}  isIndex, 是否需要索引，默认是
 * @param {Boolean}  artistName, 展示歌手字段属性，默认'ar'
 * @param {Boolean}  albumName, 展示专辑字段属性，默认'album'
 * @author luyanhong 2019-10-21
 */

import React, { Component } from 'react';
import BaseTable, { BaseTableColumn } from 'coms/BaseTable';
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux';
import { createHashHistory } from 'history';
import { Link } from 'react-router-dom';
import playAction from '@/redux/actions';
import './SongTableList.scss';
const history = createHashHistory();
export default class SongTableList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    isIndex: PropTypes.bool,
    artistName: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    albumName: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ])
  }

  static defaultProps = {
    isIndex: true,
    artistName: 'ar',
    albumName: 'album'
  }

  static contextType = ReactReduxContext;

  // 获取音乐资源并播放
  onPlay = (idx) => {
    const { data } = this.props;
    const playList = [data[idx]];
    const { store } = this.context;
    const payload = {
      playId: data[idx].id,
      playList
    };
    store.dispatch(playAction(payload));
  }

  linkToSong =(idx) => {
    const { id } = this.props.data[idx];
    console.log(this.props);
    history.push({
      pathname: `/song/${id}`
    });
  }

  linkToAlbum = (idx) => {
    const { id } = this.props.data[idx].al;
    history.push({
      pathname: `/album/${id}`
    });
  }

  render () {
    const {
      data, isIndex
    } = this.props;
    let { artistName = null, albumName = null } = this.props;
    !artistName && (artistName = null);
    !albumName && (albumName = null);
    return (
      <BaseTable data={data} keyName="id" isIndex={isIndex}>
        <BaseTableColumn width="50" onClick={this.onPlay}>
          <i className="iconfont icon-play song-table-icon"></i>
        </BaseTableColumn>
        <BaseTableColumn label="歌曲" prop="name" className="nav-link" onClick={this.linkToSong}></BaseTableColumn>
        {artistName && (
          <BaseTableColumn
            label="歌手"
            prop={artistName}
            render={(item) => (
              <div className="table-td-ul">
                {item.map((li) => (
                  <Link className="nav-link table-td-li" key={li.id} to={`/artist/${li.id}`}>{li.name}</Link>
                ))}
              </div>
            )}
          >
          </BaseTableColumn>
        )}
        {albumName && <BaseTableColumn label="专辑" prop={albumName} className="nav-link" onClick={this.linkToAlbum}></BaseTableColumn>}
        <BaseTableColumn label="时长" prop="durationPretty" width="70"></BaseTableColumn>
      </BaseTable>
    );
  }
}

