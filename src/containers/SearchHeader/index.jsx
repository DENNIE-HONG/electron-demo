/**
 * @file 搜索栏 容器组件
 * @author luyanhong 2019-08-30
 */
import React, { PureComponent } from 'react';
import { getSearchSuggest } from 'api/search';
import { debounce } from 'throttle-debounce';
import { createHashHistory } from 'history';
import SearchHeaderCom from 'coms/SearchHeader';
const history = createHashHistory();
function SearchHeader (WrappedComponent) {
  return class extends PureComponent {
    constructor (props) {
      super(props);
      this.handleInput = debounce(300, this.handleInput);
      this.state = {
        results: null,
        displayDelete: false
      };
    }

    // 头部的搜索框不用卸载
    componentDidMount () {
      SearchHeaderCom.input.addEventListener('blur', () => {
        setTimeout(() => {
          this.state.results && this.setState({
            results: null
          });
        }, 200);
      }, false);
    }

    clearKeywords = () => {
      SearchHeaderCom.input.value = '';
      this.setState({
        results: null,
        displayDelete: false
      });
    }

    // 转到搜索页
    navLink = () => {
      const value = SearchHeaderCom.input.value.trim();
      if (value === '') {
        return;
      }
      this.setState({
        results: null,
        displayDelete: false
      });
      history.push({
        pathname: '/search',
        search: `?keywords=${value}`
      });
    }

    handleInput = async () => {
      const { value } = SearchHeaderCom.input;
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
      const { navLink, handleInput, clearKeywords } = this;
      const newProps = {
        results,
        displayDelete,
        navLink,
        handleInput,
        clearKeywords
      };
      return <WrappedComponent {...newProps} />;
    }
  };
}
export default SearchHeader(SearchHeaderCom);
