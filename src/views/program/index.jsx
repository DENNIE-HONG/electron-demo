import React, { Component } from 'react';
import LazyImage from 'coms/LazyImage';
import { getDjDetail } from 'server/api/dj';
import './program.scss';
class Program extends Component {
  constructor (props) {
    super(props);
    this.state = {
      info: null
    };
  }

  async componentDidMount () {
    try {
      const { id } = this.props.match.params;
      const [detail] = await Promise.all([
        getDjDetail(id)
      ]);
      this.setState({
        info: detail.djRadio
      });
    } catch (err) {
      console.log(err);
    }
  }

  render () {
    const { info } = this.state;
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
          </div>
        </header>
      </div>
    );
  }
}
export default Program;
