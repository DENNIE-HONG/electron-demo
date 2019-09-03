/**
 * @file history前进、后退模块
 * @author luyanhong 2019-09-03
 */
import React, { Component } from 'react';
import { createHashHistory } from 'history';
class SearchHeaderHistory extends Component {
  state = {
    historyLen: 0
  }

  componentDidMount () {
    const history = createHashHistory();
    console.log(history.length);
    this.setState({
      historyLen: history.length
    });
    history.listen(() => {
      console.log('url变了');
      this.forceUpdate();
    });
  }

  // 返回上一页
  backHistory = () => {
    const history = createHashHistory();
    console.log(history.length);
    history.length > this.state.historyLen && history.goBack();
  }

  render () {
    const { historyLen } = this.state;
    const history = createHashHistory();
    console.log(history);
    const disableBack = history.length <= historyLen;
    return (
      <div className="search-h-history">
        <i className={`iconfont icon-left${disableBack ? ' disable' : ''}`} onClick={this.backHistory}></i>
        <i className="iconfont icon-right"></i>
      </div>
    );
  }
}
export default SearchHeaderHistory;
