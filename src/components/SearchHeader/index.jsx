/**
 * @file 搜索栏
 * @author luyanhong 2019-08-30
 */
import React, { Component } from 'react';
import { getSearchSuggest } from 'api/search';
import SearchHeaderSuggest from './SearchHeaderSuggest';
import './SearchHeader.scss';
class SearchHeader extends Component {
  constructor (props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      results: null
    };
  }

  async handleInput () {
    console.log(this.input.value);
    const { value } = this.input;
    if (value === '') {
      return;
    }
    try {
      const res = await getSearchSuggest(value);
      this.setState({
        results: res.result
      });
    } catch (err) {
      console.log(err);
    }
  }

  render () {
    const { results } = this.state;
    return (
      <div className="search-h">
        <div className="search-h-history">
          <i className="iconfont icon-left"></i>
          <i className="iconfont icon-right"></i>
        </div>
        <div className="search-h-box">
          <i className="iconfont icon-search"></i>
          <input
            type="text"
            placeholder="搜索"
            className="search-h-input"
            ref={(input) => { this.input = input; }}
            onInput={this.handleInput}
          />
          <i className="iconfont icon-close-circle-fill search-h-delete"></i>
          <SearchHeaderSuggest results={results} />
        </div>
      </div>
    );
  }
}
export default SearchHeader;
