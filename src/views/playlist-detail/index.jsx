/**
 * 歌单详情页
 */
import React, { Component } from 'react';
import { getPlaylistDetail } from 'api/playlist';
import ProgramHeader from 'coms/ProgramHeader';
import LazyImage from 'coms/LazyImage';
import BaseButton from 'coms/BaseButton';
import { prettyDate } from 'utils/pretty-time';
import ShowDesc from 'coms/ShowDesc';
import BaseTable, { BaseTableColumn } from 'coms/BaseTable';
import './playlist-detail.scss';
class PlaylistDetail extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: null
    };
  }

  async componentDidMount () {
    const { id } = this.props.match.params;
    try {
      const res = await getPlaylistDetail(id);
      if (res.code === 200) {
        this.setState({
          info: res.playlist
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render () {
    const { info } = this.state;
    return info && (
      <div className="playlistDetail">
        <header className="playlistDetail-header">
          <ProgramHeader
            name={info.name}
            picUrl={`${info.coverImgUrl}?param=160y160`}
            tag="歌单"
          >
            <div className="info">
              <div className="info-pic">
                <LazyImage src={`${info.creator.avatarUrl}?param=30y30`} alt={info.creator.nickname} />
              </div>
              <span className="info-name">{info.creator.nickname}</span>
              <span>{prettyDate(info.createTime)} 创建</span>
            </div>
            <div className="btn-box">
              <BaseButton icon="play" type="primary">播放</BaseButton>
              <BaseButton icon="comment">({info.commentCount})</BaseButton>
            </div>
            <dl className="playlistDetail-header-tags">
              <dt className="tag-title">标签：</dt>
              {info.tags.map((tag, index) => (
                <dd key={index} className="tag">{tag}</dd>
              ))}
            </dl>
            <div className="playlistDetail-desc">
              <ShowDesc text={info.description} />
            </div>
          </ProgramHeader>
        </header>
        <section className="playlistDetail-songs">
          <div className="title">
            <span className="title-txt">歌曲列表</span>
            <i className="title-desc">{info.trackCount}首歌</i>
            <span className="pull-right">播放：
              <span className="red">{info.playCount}</span>次
            </span>
          </div>
          <BaseTable data={info.tracks} keyName="id" isIndex>
            <BaseTableColumn width="30">
              <i className="playlistDetail-table-iconfont iconfont icon-play"></i>
            </BaseTableColumn>
            <BaseTableColumn prop="name" label="歌曲标题" />
            <BaseTableColumn prop="singers" label="歌手" />
            <BaseTableColumn prop="album" label="专辑" />
          </BaseTable>
        </section>
      </div>
    );
  }
}
export default PlaylistDetail;
