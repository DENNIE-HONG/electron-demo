/**
 * @file 歌曲列表表格 展示组件
 * @param {Array}    data, 列表数据
 * @param {Boolean}  isIndex, 是否需要索引，默认是
 * @param {Boolean}  artistName, 展示歌手字段属性，默认'ar'
 * @param {Boolean}  albumName, 展示专辑字段属性，默认'album'
 * @author luyanhong 2019-10-21
 */

import React from 'react';
import BaseTable, { BaseTableColumn } from 'coms/BaseTable';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SongTableList.scss';
const noop = function () {};
const SongTableList = (props) => {
  const {
    data, isIndex, onPlay, linkToSong, linkToAlbum
  } = props;
  let { artistName = null, albumName = null } = props;
  !artistName && (artistName = null);
  !albumName && (albumName = null);
  return (
    <BaseTable data={data} keyName="id" isIndex={isIndex}>
      <BaseTableColumn width="50" onClick={onPlay}>
        <i className="iconfont icon-play song-table-icon"></i>
      </BaseTableColumn>
      <BaseTableColumn label="歌曲" prop="name" className="nav-link" onClick={linkToSong}></BaseTableColumn>
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
      {albumName && <BaseTableColumn label="专辑" prop={albumName} className="nav-link" onClick={linkToAlbum}></BaseTableColumn>}
      <BaseTableColumn label="时长" prop="durationPretty" width="70"></BaseTableColumn>
    </BaseTable>
  );
};
SongTableList.propTypes = {
  data: PropTypes.array.isRequired,
  isIndex: PropTypes.bool,
  artistName: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  albumName: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  onPlay: PropTypes.func,
  linkToSong: PropTypes.func,
  linkToAlbum: PropTypes.func
};

SongTableList.defaultProps = {
  isIndex: true,
  artistName: 'ar',
  albumName: 'album',
  onPlay: noop,
  linkToSong: noop,
  linkToAlbum: noop
};
export default SongTableList;
