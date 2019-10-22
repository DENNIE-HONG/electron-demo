import React, { Component } from 'react';
import LazyImage from 'coms/LazyImage';
import { getDjDetail, getDjProgram } from 'api/dj';
import { Link } from 'react-router-dom';
import Pagination from 'coms/Pagination';
import showMessage from 'coms/message';
import { prettyDuration, prettyDate } from 'utils/pretty-time';
import BaseButton from 'coms/BaseButton';
import ProgramHeader from 'coms/ProgramHeader';
import ShowDesc from 'coms/ShowDesc';
import './djRadio.scss';
const PAGE_SIZE = 30;
class DjRadio extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: null,
      programList: []
    };
    this.offset = 0;
    this.isLoading = false;
    this.playAll = this.playAll.bind(this);
    this.changePage = this.changePage.bind(this);
    this.$desc = React.createRef();
  }

  async componentDidMount () {
    try {
      const { id } = this.props.match.params;
      const [detail, programRes] = await Promise.all([
        getDjDetail(id),
        this.fetch()
      ]);
      this.setState({
        info: detail.djRadio,
        programList: programRes.programs
      });
    } catch (err) {
      this.fail(err.toString());
    }
  }

  get total () {
    return Math.ceil(this.state.info.programCount / PAGE_SIZE);
  }

  play (playList, id) {
    this.props.setMusic && this.props.setMusic(playList, id);
  }

  // 获取节目资源
  fetch (offset = 0) {
    const sentData = {
      offset,
      rid: this.props.match.params.id
    };
    return getDjProgram(sentData);
  }

  // 跳页
  async changePage (pageNum) {
    try {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      const offset = (pageNum - 1) * PAGE_SIZE;
      const res = await this.fetch(offset);
      this.setState({
        programList: res.programs
      });
      this.offset = offset;
      document.querySelector('.main').scrollTo(0, 0);
    } catch (err) {
      this.fail(err.toString());
    } finally {
      this.isLoading = false;
    }
  }

  fail (message) {
    showMessage({
      type: 'error',
      message
    });
  }

  playAll () {
    const { id } = this.state.info;
    let playList = [];
    playList = this.state.programList.map((item) => item.mainSong);
    this.play(playList, id);
  }

  render () {
    const {
      info, programList
    } = this.state;
    return info && (
      <div className="djradio">
        <header className="djradio-head">
          <ProgramHeader
            picUrl={info.picUrl}
            name={info.name}
            tag="电台"
          >
            <div className="info-artist">
              <LazyImage src={info.dj.avatarUrl} alt={info.dj.nickname} />
              <span>{info.dj.nickname}</span>
            </div>
            <div className="info-btn">
              <BaseButton type="primary" icon="star">订阅({info.subCount})</BaseButton>
              <BaseButton icon="play" onClick={this.playAll}>播放全部</BaseButton>
            </div>
            <div className="info-desc">
              <ShowDesc maxHeight={78} text={info.desc}>
                <Link to={`/dj/${info.categoryId}`} className="info-cate"> {info.category}</Link>
              </ShowDesc>
            </div>
          </ProgramHeader>
        </header>
        <div className="djradio-box">
          <div className="title">
            <span className="title-txt">节目列表</span>
            <i>共{info.programCount}期</i>
          </div>
          <ol className="djradio-list">
            {programList.map((item, index) => (
              <li className="djradio-item" key={item.id}>
                <i className="djradio-item-order">{item.serialNum}</i>
                <i className="iconfont icon-play" onClick={() => this.play([programList[index].mainSong], item.mainSong.id)}></i>
                <Link to={`/program/${item.id}`}>
                  <h4 className="djradio-item-name" title={item.name}>{item.name}</h4>
                </Link>
                <span className="djradio-item-count">播放{item.listenerCount > 10000 ? `${Math.trunc(item.listenerCount / 10000)}万` : item.listenerCount}</span>
                <span>赞{item.likedCount}</span>
                <div className="pull-right">
                  <span className="djradio-item-time">{prettyDate(item.createTime)}</span>
                  <span>{prettyDuration(item.duration)}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
        {this.total > 1 && (
          <Pagination
            total={this.total}
            change={this.changePage}
          />
        )
        }
      </div>
    );
  }
}
export default DjRadio;
