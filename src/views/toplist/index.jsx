/**
 * @file 榜单详情页
 * @author luyanhong 2019-11-11
 */
import React, { Component } from 'react';
import { getPlaylistDetail } from 'api/playlist';
import ProgramHeader from 'coms/ProgramHeader';
import BaseButton from 'coms/BaseButton';
import { prettyDate } from 'utils/pretty-time';
import ShowDesc from 'containers/ShowDesc';
import SongTableList from 'containers/SongTableList';
import './toplist.scss';
class Toplist extends Component {
  state = {
    info: null
  }

  async componentDidMount () {
    try {
      const { id } = this.props.match.params;
      const res = await getPlaylistDetail(id);
      this.setState({
        info: res.playlist
      });
    } catch {
      //
    }
  }

  playAll = () => {
    const { id } = this.props.match.params;
    this.props.setMusic(this.state.info.tracks, id);
  }

  render () {
    const { info } = this.state;
    return info && (
      <div className="toplist-detail">
        <header>
          <ProgramHeader name={info.name} picUrl={info.coverImgUrl} width={120}>
            <div className="toplist-detail-txt">
              <p className="toplist-detail-time">
                <i className="iconfont icon-time-circle"></i>
              最近跟新：{prettyDate(info.updateTime)}
              </p>
              <ShowDesc text={info.description || '暂无简介'} maxHeight={40} />
            </div>
            <div className="toplist-detail-btns">
              <BaseButton type="primary" icon="play" onClick={this.playAll}>播放全部</BaseButton>
            </div>
          </ProgramHeader>
        </header>
        <section className="toplist-detail-table">
          <SongTableList data={info.tracks} isIndex />
        </section>
      </div>
    );
  }
}
export default Toplist;
