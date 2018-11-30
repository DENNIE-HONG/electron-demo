import React, { Component } from 'react';
import { getTopList } from 'server/api/top';
import './TopList.scss';

class TopList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      topList: []
    };
  }

  componentDidMount () {
    getTopList().then((res) => {
      if (res.code === 200) {
        this.setState({
          topList: res.list.slice(0, 3)
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  render () {
    return (
      <div className="toplist global-clearfix">
        {this.state.topList.map((item) => (
          <dl className="toplist-list" key={item.id}>
            <dt className="toplist-list-title">
              <div className="toplist-list-pic">
                <img src={item.coverImgUrl} alt={item.name} />
              </div>
              <div className="toplist-list-info">
                <h4>{item.name}</h4>
                <i className="iconfont icon-play"></i>
              </div>
            </dt>
            <dd></dd>
          </dl>
        ))}
      </div>
    );
  }
}
export default TopList;
