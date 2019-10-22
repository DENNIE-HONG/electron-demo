/**
 * 首页榜单组件
 * @param {Function} getPlayList, 返回当前榜单的数据
 * @author luyanhong 2018-12-03
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyImage from 'coms/LazyImage';
import { getTopRecommend } from 'api/top';
import { Link } from 'react-router-dom';
import './TopList.scss';

class TopList extends Component {
  static propTypes = {
    getPlayList: PropTypes.func
  }

  static defaultProps = {
    getPlayList: undefined
  }

  constructor (props) {
    super(props);
    this.state = {
      topList: []
    };
  }

  async componentDidMount () {
    try {
      const res = await getTopRecommend();
      this.setState({
        topList: res.list
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * 播放当前榜单音乐
   * @param {Number} index, 当前第一个榜单
   * @return {Array} 返回该榜单数据列表,id
   */
  play (index) {
    const result = this.state.topList[index];
    this.props.getPlayList && this.props.getPlayList(result.tracks, result.id);
  }

  /**
   * 播放当前单曲
   */
  playSingle (column, row) {
    const result = this.state.topList[column].tracks[row];
    this.props.getPlayList && this.props.getPlayList([result], result.id);
  }

  render () {
    return (
      <div className="toplist">
        {this.state.topList.map((item, index) => (
          <dl className="toplist-list" key={item.id}>
            <dt className="toplist-list-title">
              <div className="toplist-list-pic">
                <LazyImage src={`${item.coverImgUrl}?param=80y80`} alt={item.name} />
              </div>
              <div className="toplist-list-info">
                <h4>{item.name}</h4>
                <i className="iconfont icon-play" onClick={() => this.play(index)}></i>
              </div>
            </dt>
            <dd>
              <ol>
                {item.tracks.map((music, i) => (
                  <li key={music.id} className="toplist-list-item global-clearfix">
                    <span className={`toplist-list-item-num ${i < 3 ? 'active' : ''}`}>{i + 1}</span>
                    <Link to={`/song/${music.id}`}>
                      <span className="toplist-list-item-txt">{music.name}</span>
                    </Link>
                    <span className="toplist-list-item-actions">
                      <i className="iconfont icon-play" onClick={() => this.playSingle(index, i)}></i>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="toplist-list-item global-clearfix more">
                <div className="pull-right">
                  查看更多
                  <i className="iconfont icon-right"></i>
                </div>
              </div>
            </dd>
          </dl>
        ))}
      </div>
    );
  }
}
export default TopList;
