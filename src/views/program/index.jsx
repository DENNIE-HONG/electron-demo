import React, { Component } from 'react';
import LazyImage from 'coms/LazyImage';
import { getDjDetail, getDjProgram } from 'server/api/dj';
import { NavLink } from 'react-router-dom';
import Pagination from 'coms/Pagination';
import showMessage from 'coms/message';
import './program.scss';
const PAGE_SIZE = 30;
class Program extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: null,
      programList: []
    };
    this.offset = 0;
    this.isLoading = false;
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

  render () {
    const { info, programList } = this.state;
    return info && (
      <div className="program">
        <header className="program-head">
          <div className="program-head-pic">
            <LazyImage src={info.picUrl} alt={info.name} />
          </div>
          <div className="program-head-info">
            <h3 className="info-name">{info.name}</h3>
            <div className="info-artist">
              <LazyImage src={info.dj.avatarUrl} alt={info.dj.nickname} />
              <span>{info.dj.nickname}</span>
            </div>
            <div className="info-btn">
              <button type="button" className="btn-primary">{`订阅(${info.subCount})`}</button>
              <button type="button" className="btn">
                <i className="iconfont icon-play"></i>
                播放全部
              </button>
            </div>
            <p className="info-desc">
              <NavLink to="/dj" className="info-cate">{info.category}</NavLink>
              {info.desc}
            </p>
          </div>
        </header>
        <div className="program-box">
          <div className="title">
            <span className="title-txt">节目列表</span>
            <i>共{info.programCount}期</i>
          </div>
          <ol className="program-list">
            {programList.map((item) => (
              <li className="program-item" key={item.id}>
                <i className="program-item-order">{item.serialNum}</i>
                <i className="iconfont icon-play"></i>
                <h4 className="program-item-name">{item.name}</h4>
                <span className="program-item-count">播放{item.listenerCount}</span>
                <span>赞{item.likedCount}</span>
                <div className="pull-right">
                  <span className="program-item-time">{this.prettyDate(item.createTime)}</span>
                  <span>{this.prettyDuration(item.duration)}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Pagination
          total={Math.ceil(info.programCount / PAGE_SIZE)}
          change={this.changePage.bind(this)}
        />
      </div>
    );
  }
}
export default Program;
