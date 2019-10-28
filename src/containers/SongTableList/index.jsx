/**
 * @file 歌曲列表表格  容器组件
 * @param {Array}    data, 列表数据
 * @param {Boolean}  isIndex, 是否需要索引，默认是
 * @param {Boolean}  artistName, 展示歌手字段属性，默认'ar'
 * @param {Boolean}  albumName, 展示专辑字段属性，默认'album'
 * @author luyanhong 2019-10-21
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createHashHistory } from 'history';
import { connect } from 'react-redux';
import SongTableListCom from 'coms/SongTableList';
import playAction from '@/redux/actions';
const history = createHashHistory();
const mapDispatchToProps = (dispatch) => ({
  setMusic: (playList, playId) => {
    const payload = {
      playId,
      playList
    };
    dispatch(playAction(payload));
  }
});
function SongTableList (WrappedComponent) {
  return class extends Component {
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

    // 获取音乐资源并播放
    onPlay = (idx) => {
      const { data } = this.props;
      const playList = [data[idx]];
      this.props.setMusic(playList, data[idx].id);
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
      const { onPlay, linkToSong, linkToAlbum } = this;
      const newProps = {
        onPlay,
        linkToSong,
        linkToAlbum
      };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}
const SongTableListCon = SongTableList(SongTableListCom);
export default connect(null, mapDispatchToProps)(SongTableListCon);

