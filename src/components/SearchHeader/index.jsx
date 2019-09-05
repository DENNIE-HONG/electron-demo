/**
 * @file 搜索栏
 * @author luyanhong 2019-08-30
 */
import React, { Component } from 'react';
import { getSearchSuggest } from 'api/search';
import { debounce } from 'throttle-debounce';
import { createHashHistory } from 'history';
import SearchHeaderSuggest from './SearchHeaderSuggest';
import SearchHeaderHistory from './SearchHeaderHistory';
import './SearchHeader.scss';
const history = createHashHistory();
class SearchHeader extends Component {
  constructor (props) {
    super(props);
    this.handleInput = debounce(300, this.handleInput.bind(this));
    this.state = {
      results: null,
      displayDelete: false
    };
  }

  // 头部的搜索框不用卸载
  componentDidMount () {
    this.input.addEventListener('blur', () => {
      setTimeout(() => {
        this.state.results && this.setState({
          results: null
        });
      }, 200);
    }, false);
  }

  clearKeywords = () => {
    this.input.value = '';
    this.setState({
      results: null,
      displayDelete: false
    });
  }

  // 转到搜索页
  navLink = () => {
    const value = this.input.value.trim();
    if (value === '') {
      return;
    }
    history.push({
      pathname: '/search',
      search: `?keywords=${value}`
    });
  }

  async handleInput () {
    const { value } = this.input;
    if (value.trim() === '') {
      this.setState({
        results: null,
        displayDelete: false
      });
      return;
    }
    try {
      const res = await getSearchSuggest(value);
      this.setState({
        results: res.result,
        displayDelete: true
      });
    } catch (err) {
      console.log(err);
    }
  }

  render () {
    const { results, displayDelete } = this.state;
    return (
      <div className="search-h">
        <SearchHeaderHistory />
        <div className="search-h-box" onClick={this.navLink}>
          <i className="iconfont icon-search"></i>
          <input
            type="text"
            placeholder="搜索"
            className="search-h-input"
            ref={(input) => { this.input = input; }}
            onInput={this.handleInput}
          />
          <i
            className={`iconfont icon-close-circle-fill search-h-delete${displayDelete ? ' active' : ''}`}
            onClick={this.clearKeywords}
          >
          </i>
          <SearchHeaderSuggest results={results} />
        </div>
      </div>
    );
  }
}
export default SearchHeader;
