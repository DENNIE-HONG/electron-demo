/**
 * @file 搜索栏
 * @author luyanhong 2019-08-30
 */
import React, { Component } from 'react';
import './SearchHeader.scss';
class SearchHeader extends Component {
  render () {
    return (
      <div className="search-h">
        <div className="search-h-history">
          <i className="iconfont icon-left"></i>
          <i className="iconfont icon-right"></i>
        </div>
        <div className="search-h-box">
          <i className="iconfont icons-search"></i>
          <input type="text" placeholder="搜索" />
        </div>
      </div>
    );
  }
}
export default SearchHeader;
