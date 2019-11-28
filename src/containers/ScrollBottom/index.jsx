/**
 * @file 触底自动加载模块 容器组件
 * @param {Function} getUrl, 必须，获取数据请求参数
 * @param {Function} render, 必须，渲染函数
 * @param {String}   listPropName, 必须，返回数据的属性名
 * @param {Object}   params, 请求参数，{}
 * @param {Number}   limit, 每页大小，默认20
 * @author luyanhong 2019-11-22
 */
import React, { Component } from 'react';
import { debounce } from 'throttle-debounce';
import scrollBottom from 'utils/scroll-bottom';
import PropTypes from 'prop-types';
class ScrollBottom extends Component {
  static propTypes = {
    params: PropTypes.object,
    getUrl: PropTypes.func.isRequired,
    limit: PropTypes.number,
    listPropName: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  }

  static defaultProps = {
    params: {},
    limit: 30
  }

  constructor (props) {
    super(props);
    this.state = {
      list: []
    };
    this.isLoading = false;
    this.isEnd = false;
    this.sentData = {
      offset: 0
    };
    this.debounceFun = debounce(300, this.loadMore);
  }

  componentDidMount () {
    this.fetch();
    this.$scrollNode = document.querySelector('.main');
    this.$scrollNode.addEventListener('scroll', this.debounceFun, false);
  }

  componentDidUpdate (prevProps) {
    if (prevProps.params !== this.props.params) {
      this.reset();
    }
  }

  componentWillUnmount () {
    // 要解除绑定
    this.$scrollNode = document.querySelector('.main');
    this.$scrollNode.removeEventListener('scroll', this.debounceFun, false);
  }

  // 获取数据列表
  fetch = async (params = this.props.params) => {
    try {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      const {
        getUrl, limit, listPropName
      } = this.props;
      this.sentData = Object.assign(this.sentData, { limit }, params);
      const res = await getUrl(this.sentData);
      if (!res.more && this.sentData.offset !== 0) {
        this.isEnd = true;
        return;
      }
      this.setState((prev) => ({
        list: prev.list.concat(res[listPropName])
      }));
      this.sentData.offset += limit;
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  }

  // 滚动加载更多
  loadMore = () => {
    if (this.isEnd) {
      return;
    }
    if (!scrollBottom(this.$scrollNode)) {
      return;
    }
    this.fetch();
  }

  // 传参，重置请求
  reset = () => {
    this.sentData.offset = 0;
    this.isLoading = false;
    this.isEnd = false;
    this.setState({
      list: []
    }, () => {
      this.fetch();
    });
  }

  render () {
    return (
      <div>
        {this.props.render(this.state)}
      </div>
    );
  }
}

export default ScrollBottom;
