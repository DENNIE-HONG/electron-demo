/**
 * @file 加载更多带分页组件
 * @param {String}   id, 必须，请求参数中的id
 * @param {Function} getUrl, 必须，获取请求的函数
 * @param {String}   listPropName, 必须，请求返回获取的数据字段
 * @param {Function} render, 必须，渲染的样式
 * @param {Number}   limit，每页大小，默认20
 * @param {Boolean}  isAnchor, 跳页后是否回到模块顶部
 * @param {Boolean}  isFetch, 是否开始请求，默认否
 * @author luyanhong 2019-08-28
 * @example
 * <LoadMore id={xx} getUrl={xxx} listPropName="comments" render={({list}) => (
 *    <div>xxx</div>
 * )}/>
 */
import React, { Component } from 'react';
import Pagination from 'coms/Pagination';
import PropTypes from 'prop-types';
class LoadMore extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    limit: PropTypes.number,
    getUrl: PropTypes.func.isRequired,
    listPropName: PropTypes.string.isRequired,
    isAnchor: PropTypes.bool,
    isFetch: PropTypes.bool
  }

  static defaultProps = {
    limit: 20,
    isAnchor: true,
    isFetch: false
  }

  constructor (props) {
    super(props);
    this.state = {
      list: [],
      totalCount: 0
    };
    this.$container = React.createRef();
    this.changePager = this.changePager.bind(this);
    this.total = 0;
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.isFetch !== nextProps.isFetch) {
      this.fetch();
    }
  }

  async fetch (offset = 0) {
    const {
      id, limit, getUrl, listPropName
    } = this.props;
    const params = {
      offset,
      limit,
      id
    };
    try {
      const res = await getUrl(params);
      if (res[listPropName].length) {
        if (!this.total) {
          this.total = Math.ceil(res.total / limit);
        }
        this.setState({
          list: res[listPropName],
          totalCount: res.total
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 跳页
  changePager (currentPage) {
    const offset = this.props.limit * (currentPage - 1);
    this.fetch(offset);
    this.props.isAnchor && this.scrollTop();
  }

  scrollTop () {
    this.$container.current.scrollIntoView();
  }

  render () {
    return (
      <div ref={this.$container}>
        {this.props.render(this.state)}
        {this.total > 1 && <Pagination total={this.total} change={this.changePager} />}
      </div>
    );
  }
}
export default LoadMore;
