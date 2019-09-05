/**
 * @file history前进、后退模块
 * @author luyanhong 2019-09-03
 */
import React, { Component } from 'react';
import { createHashHistory } from 'history';
const history = createHashHistory();
class SearchHeaderHistory extends Component {
  constructor (props) {
    super(props);
    this.current = 0;
    this.isBack = false;
    this.backCount = 0;
  }

  // 跳页，length增加，后退则不变
  componentDidMount () {
    history.listen(() => {
      // 后退
      if (this.isBack) {
        this.current -= 1;
      } else {
        this.current += 1;
      }
      this.forceUpdate();
      this.isBack = false;
    });
  }

  // 返回上一页
  backHistory = () => {
    this.isBack = true;
    this.current && history.goBack();
    this.backCount += 1;
  }

  // 后退过，才能前进
  forwardHistory = () => {
    this.backCount && history.goForward();
    this.backCount -= 1;
  }

  render () {
    const disableBack = !this.current;
    const { backCount } = this;
    return (
      <div className="search-h-history">
        <i className={`iconfont icon-left${disableBack ? ' disable' : ''}`} onClick={this.backHistory}></i>
        <i className={`iconfont icon-right${backCount ? '' : ' disable'}`} onClick={this.forwardHistory}></i>
      </div>
    );
  }
}
export default SearchHeaderHistory;
