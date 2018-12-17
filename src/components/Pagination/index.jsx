/**
 * 分页模块
 * @param {Number}  total, 总页数
 * @param {Number}  current, 当前页
 * @param {Number}  pagerCount, 按钮个数， 一般是3个，奇数
 * @param {Funtion} change, 点击按钮的回调事件
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';
class Pagination extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
    current: PropTypes.number,
    pagerCount: (props, propName) => {
      if (props[propName] % 2 === 0) {
        return new Error('分页按钮个数必须是奇数');
      }
    },
    change: PropTypes.func
  }

  static defaultProps = {
    current: 1,
    pagerCount: 3,
    change: undefined
  }

  constructor (props) {
    super(props);
    this.state = {
      current: this.props.current
    };
    this.cachePageList = {};
  }

  get range () {
    const { current } = this.state;
    if (this.cachePageList[current]) {
      return this.cachePageList[current];
    }
    const { pagerCount, total } = this.props;
    const result = [];
    let start;
    if (total < pagerCount) {
      start = 1;
    } else if (current >= total) {
      start = total - pagerCount + 1;
    } else if (current % pagerCount === 0) {
      start = (current / pagerCount - 1) * pagerCount + 1;
    } else {
      start = Math.trunc(current / pagerCount) * pagerCount + 1;
    }
    const len = Math.min(pagerCount, total);
    const end = start + len;
    for (let i = start; i < end; i += 1) {
      result.push(i);
    }
    this.cachePageList[current] = result;
    return result;
  }

  change (current) {
    if (current === this.state.current) {
      return;
    }
    if (current < 1 || current > this.props.total) {
      return;
    }
    this.setState({
      current
    }, () => {
      this.props.change && this.props.change(current);
    });
  }

  render () {
    const { total, pagerCount } = this.props;
    const { current } = this.state;
    return (
      <div className="pager">
        {total > pagerCount
        && (
          <span className="pager-btn" onClick={() => this.change(current - 1)}>
            <i className="iconfont icon-left"></i>
          </span>
        )}
        {this.range.map((item) => (
          <span className={`pager-btn ${current === item ? 'active' : ''}`} key={item} onClick={() => this.change(item)}>{item}</span>
        ))}
        {total > pagerCount
        && (
          <span className="pager-btn" onClick={() => this.change(current + 1)}>
            <i className="iconfont icon-right"></i>
          </span>
        )}
      </div>
    );
  }
}
export default Pagination;
