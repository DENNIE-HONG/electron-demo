import React, { Component } from 'react';
import { getTopListDetail } from 'api/top';
import { getPlaylistDetail } from 'api/home';
import LazyImage from 'containers/LazyImage';
import showMessage from 'containers/Message';
import { Link } from 'react-router-dom';
import './top.scss';
class Top extends Component {
  constructor (props) {
    super(props);
    this.state = {
      topList: [
        {
          name: '云音乐特色榜',
          list: []
        },
        {
          name: '全球媒体榜',
          list: []
        }
      ]
    };
    this.playId = 0;
  }

  async componentDidMount () {
    try {
      const res = await getTopListDetail();
      const list = [];
      list.push(Object.assign(this.state.topList[0], { list: res.list.slice(0, 4) }));
      list.push(Object.assign(this.state.topList[1], { list: res.list.slice(5) }));
      this.setState({
        topList: list
      });
    } catch (err) {
      console.log(err);
    }
  }

  prettyCount (count) {
    if (count > 1E8) {
      return `${(count / 1E8).toFixed(1)}亿`;
    }
    if (count > 1E4) {
      return `${(count / 1E4).toFixed(1)}万`;
    }
  }

  async play (e, id) {
    try {
      e.preventDefault();
      if (this.playId === id) {
        showMessage({
          type: 'warning',
          message: '已经在播放当前榜单了呢'
        });
        return;
      }
      this.playId = id;
      const res = await getPlaylistDetail(id);
      this.props.setMusic && this.props.setMusic(res.playlist.tracks.slice(0, 20), id);
    } catch (err) {
      showMessage({
        type: 'error',
        message: err.toString()
      });
    }
  }

  render () {
    return (
      <div className="top">
        {this.state.topList.map((li, i) => (
          <section key={i}>
            <h3 className="top-title">{li.name}</h3>
            <ul className="top-list global-clearfix">
              {li.list.map((item) => (
                <li key={item.id} className="top-list-item">
                  <Link to={`/toplist/${item.id}`}>
                    <div className="top-list-avatar">
                      <div className="top-list-pic">
                        <LazyImage src={`${item.coverImgUrl}?param=120y120`} alt={item.name} />
                      </div>
                      <button className="top-list-btn" type="button" onClick={(e) => this.play(e, item.id)}>
                      </button>
                      <span className="top-list-item-count">{this.prettyCount(item.playCount)}</span>
                    </div>
                    <ol className="top-list-info">
                      {item.tracks.map((music, index) => (
                        <li key={`${item.id}-${index}`} className="top-list-info-item">
                          {index + 1}&nbsp;
                          <span className="top-list-info-name">{music.first}</span>-
                          <span className="top-list-info-name">{music.second}</span>
                        </li>
                      ))}
                      {!item.tracks.length && (
                        <span className="top-list-info-desc">{item.description}</span>
                      )}
                    </ol>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    );
  }
}

export default Top;
