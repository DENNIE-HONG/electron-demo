/**
 * 简介展开收起模块
 * @param {Boolean} hasDescBtn, 是否有展开按钮, 默认没有
 * @param {Boolean} isOpen,  是否展开，默认收起
 * @param {Number}  maxHeight, 收起时候最大高度
*/
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './ShowDesc.scss';
class ShowDesc extends PureComponent {
  static propTypes = {
    hasDescBtn: PropTypes.bool,
    isOpen: PropTypes.bool,
    maxHeight: PropTypes.number.isRequired
  }

  static defaultProps = {
    hasDescBtn: false,
    isOpen: false
  }

  constructor (props) {
    super(props);
    this.state = {
      isOpen: props.isOpen
    };
    this.showDesc = this.showDesc.bind(this);
  }

  // 展开、收起
  showDesc () {
    this.setState((prev) => ({
      isOpen: !prev.isOpen
    }));
  }

  render () {
    const { children, hasDescBtn, maxHeight } = this.props;
    const { isOpen } = this.state;
    const style = isOpen ? null : { maxHeight: `${maxHeight}px` };
    return (
      <>
        <div
          className="show-desc"
          style={style}
        >
          {children}
        </div>
        {hasDescBtn && (
          <div
            className={`pull-right show-desc-btn ${isOpen ? 'active' : ''}`}
            onClick={this.showDesc}
          >
            <span className="on">展开</span>
            <span className="off">收起</span>
            <i className="iconfont icon-down on"></i>
            <i className="iconfont icon-up off"></i>
          </div>
        )}
      </>
    );
  }
}
export default ShowDesc;
