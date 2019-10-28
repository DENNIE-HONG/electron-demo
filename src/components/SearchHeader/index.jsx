/**
 * @file 搜索栏 展示组件
 * @author luyanhong 2019-08-30
 */
import React from 'react';
import SearchHeaderHistory from 'containers/SearchHeader/SearchHeaderHistory';
import PropTypes from 'prop-types';
import SearchHeaderSuggest from 'containers/SearchHeader/SearchHeaderSuggest';
import './SearchHeader.scss';
function noop () {}
const SearchHeader = (props) => {
  const {
    results, displayDelete, handleInput, clearKeywords, navLink
  } = props;
  return (
    <div className="search-h">
      <SearchHeaderHistory />
      <div className="search-h-box" onClick={navLink}>
        <i className="iconfont icon-search"></i>
        <input
          type="text"
          placeholder="搜索"
          className="search-h-input"
          ref={(input) => { SearchHeader.input = input; }}
          onInput={handleInput}
        />
        <i
          className={`iconfont icon-close-circle-fill search-h-delete${displayDelete ? ' active' : ''}`}
          onClick={clearKeywords}
        >
        </i>
        <SearchHeaderSuggest results={results} />
      </div>
    </div>
  );
};
SearchHeader.propTypes = {
  results: PropTypes.object,
  displayDelete: PropTypes.bool,
  handleInput: PropTypes.func,
  clearKeywords: PropTypes.func,
  navLink: PropTypes.func
};
SearchHeader.defaultProps = {
  results: {},
  displayDelete: false,
  handleInput: noop,
  clearKeywords: noop,
  navLink: noop
};
export default SearchHeader;
