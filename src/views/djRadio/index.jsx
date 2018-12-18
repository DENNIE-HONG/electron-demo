import React, { Component } from 'react';
import LazyImage from 'coms/LazyImage';
import { getDjDetail, getDjProgram } from 'server/api/dj';
import { NavLink } from 'react-router-dom';
import Pagination from 'coms/Pagination';
import showMessage from 'coms/message';
import './djRadio.scss';
const PAGE_SIZE = 30;
class DjRadio extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: null,
      programList: [],
      isShowDesc: false,
      hasDescBtn: false
    };
    this.offset = 0;
    this.isLoading = false;
    this.playAll = this.playAll.bind(this);
    this.changePage = this.changePage.bind(this);
    this.showDesc = this.showDesc.bind(this);
    this.$desc = React.createRef();
    console.log(this);
  }

  async componentDidMount () {
    try {
      const { id } = this.props.match.params;
      const [detail, programRes] = await Promise.all([
        getDjDetail(id),
        this.fetch()
      ]);
      if (detail.code === 200 && programRes.code === 200) {
        this.setState({
          info: detail.djRadio,
          programList: programRes.programs
        });
        // 简介字数少
        if (detail.djRadio.desc.length < 160) {
          return;
        }
        if (this.$desc.current.clientHeight > 60) {
          this.setState({
            hasDescBtn: true
          });
        }
      }
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

  // 格式化节目时长
  prettyDuration (duration) {
    if (!duration) {
      return '00:00';
    }
    duration = Math.trunc(duration / 1000);
    let min = Math.trunc(duration / 60);
    let sec = Math.trunc(duration % 60);
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;
    return `${min}:${sec}`;
  }

  // 格式化日期
  prettyDate (time) {
    let date = new Date(time).toLocaleDateString();
    date = date.replace(/\//g, '-');
    return date;
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
      if (res.code === 200) {
        this.setState({
          programList: res.programs
        });
        this.offset = offset;
        document.querySelector('.main').scrollTo(0, 0);
      }
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

  // 展开、收起
  showDesc () {
    this.setState((prev) => ({
      isShowDesc: !prev.isShowDesc
    }));
  }

  render () {
    const {
      info, programList, isShowDesc, hasDescBtn
    } = this.state;
    return info && (
      <div className="djradio">
        <header className="djradio-head">
          <div className="djradio-head-pic">
            <LazyImage src={info.picUrl} alt={info.name} />
          </div>
          <div className="djradio-head-info">
            <h3 className="info-name">
              <span className="info-name-tag">电台</span>{info.name}
            </h3>
            <div className="info-artist">
              <LazyImage src={info.dj.avatarUrl} alt={info.dj.nickname} />
              <span>{info.dj.nickname}</span>
            </div>
            <div className="info-btn">
              <button type="button" className="btn-primary">{`订阅(${info.subCount})`}</button>
              <button
                type="button"
                className="btn"
                onClick={this.playAll}
              >
                <i className="iconfont icon-play"></i>
                播放全部
              </button>
            </div>
            <div className={`info-desc ${isShowDesc ? '' : 'active'}`}>
              <NavLink to={`/dj/${info.categoryId}`} className="info-cate"> {info.category}</NavLink>
              <pre ref={this.$desc}>{info.desc}</pre>
            </div>
            {hasDescBtn && (
              <div className="pull-right info-desc-btn" onClick={this.showDesc}>
                <span className="on">展开</span>
                <span className="off">收起</span>
                <i className="iconfont icon-down on"></i>
                <i className="iconfont icon-up off"></i>
              </div>
            )}
          </div>
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
                <NavLink to={`/program/${item.id}`}>
                  <h4 className="djradio-item-name" title={item.name}>{item.name}</h4>
                </NavLink>
                <span className="djradio-item-count">播放{item.listenerCount > 10000 ? `${Math.trunc(item.listenerCount / 10000)}万` : item.listenerCount}</span>
                <span>赞{item.likedCount}</span>
                <div className="pull-right">
                  <span className="djradio-item-time">{this.prettyDate(item.createTime)}</span>
                  <span>{this.prettyDuration(item.duration)}</span>
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
