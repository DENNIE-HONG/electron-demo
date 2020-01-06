/**
 * @file 触底自动加载模块 容器组件
 * @param {Function} getUrl, 必须，获取数据请求参数
 * @param {Function} render, 必须，渲染函数
 * @param {String}   listPropName, 必须，返回数据的属性名
 * @param {Object}   params, 请求参数，{}
 * @param {Number}   limit, 每页大小，默认20
 * @param {Function} updateCallback, 更新方法
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
    render: PropTypes.func.isRequired,
    updateCallback: PropTypes.func
  }

  static defaultProps = {
    params: {},
    limit: 30,
    updateCallback: undefined
  }

  constructor (props) {
    super(props);
    this.state = {
      list: []
    };
    this.isLoading = false;
    this.isMore = null;
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

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.list === this.state.list) {
      return false;
    }
    return true;
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
      if (this.isMore === false) {
        return;
      }
      this.isLoading = true;
      const { getUrl, limit } = this.props;
      this.sentData = Object.assign(this.sentData, { limit }, params);
      const res = await getUrl(this.sentData);
      this.isMore = res.more;
      this.updateData(res);
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  }

  updateData = (res) => {
    const { listPropName, limit } = this.props;
    this.setState((prev) => ({
      list: prev.list.concat(res[listPropName])
    }));
    // 如有新的更新方法
    if (this.props.updateCallback) {
      this.props.updateCallback(res, this.sentData);
    } else {
      this.sentData.offset += limit;
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
