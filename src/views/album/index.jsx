/**
 * @file 专辑页
 * @author luyanhong 2019-08-08
 */
import React, { Component } from 'react';
import ProgramHeader from 'coms/ProgramHeader';
import { getAlbum } from 'api/home';
import BaseButton from 'coms/BaseButton';
import { prettyDate } from 'utils/pretty-time';
import ShowDesc from 'coms/ShowDesc';
import BaseTable, { BaseTableColumn } from 'coms/BaseTable';
import './album.scss';

class Album extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: null,
      songs: []
    };
  }

  async componentDidMount () {
    try {
      const { id } = this.props.match.params;
      const res = await getAlbum(id);
      if (res.code === 200) {
        this.setState({
          info: res.album,
          songs: res.songs
        });
      }
    } catch {
      //
    }
  }

  render () {
    const { info, songs } = this.state;
    if (!info) {
      return null;
    }
    const publishTime = prettyDate(info.publishTime);
    return (
      <div className="album">
        <header className="album-header">
          <ProgramHeader picUrl={info.picUrl} name={info.name} tag="专辑">
            <div className="album-info">
              <p>
                歌手：<span className="">{info.artist.name}</span>
              </p>
              <p>发行时间：{publishTime}</p>
              <p>发行公司：{info.company}</p>
            </div>
            <div className="album-header-btns">
              <BaseButton type="primary" icon="play">播放</BaseButton>
              <BaseButton icon="comment">({info.info.commentCount})</BaseButton>
            </div>
          </ProgramHeader>
        </header>
        <section className="album-desc">
          <h4 className="album-desc-title">专辑介绍：</h4>
          <div className="album-desc-txt">
            <ShowDesc text={info.description} />
          </div>
        </section>
        <section className="album-songs">
          <h4 className="title">
            <span className="title-txt">包含歌曲列表</span>
            <i className="title-desc">{info.size}首歌</i>
          </h4>
          <BaseTable data={songs} isIndex keyName="id">
            <BaseTableColumn>
              <i className="iconfont icon-play"></i>
            </BaseTableColumn>
            <BaseTableColumn label="歌曲标题" prop="name"></BaseTableColumn>
            <BaseTableColumn label="时长" prop="durationPretty"></BaseTableColumn>
            <BaseTableColumn label="歌手" prop="artist"></BaseTableColumn>
          </BaseTable>
        </section>
      </div>
    );
  }
}
export default Album;
