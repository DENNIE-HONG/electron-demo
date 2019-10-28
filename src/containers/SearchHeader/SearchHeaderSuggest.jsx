/**
 * @file 搜索结果列表 容器组件
 * @author luyanhong 2019-08
 */
import React, { Component } from 'react';
import SearchHeaderSuggestCom from 'coms/SearchHeader/SearchHeaderSuggest';
function SearchHeaderSuggest (WrappedComponent) {
  return class extends Component {
    stopLink = (e) => {
      e.stopPropagation();
    }

    render () {
      return <WrappedComponent {...this.props} onClick={this.stopLink} />;
    }
  };
}
export default SearchHeaderSuggest(SearchHeaderSuggestCom);
