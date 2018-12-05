/**
 * 懒加载图片模块
 * @param {String} src, 图片url
 * @param {String} alt, 图片描述
 * @param {String} className, 类名
 * @author luyanhong 2018-12-05
 */
import React, { Component } from 'react';
import LazyLoad from 'vanilla-lazyload';
import PropTypes from 'prop-types';
if (!document.lazyLoadInstance) {
  document.lazyLoadInstance = new LazyLoad({
    element_selector: '.lazy'
  });
}
class LazyImage extends Component {
  static propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string,
    className: PropTypes.string
  }

  static defaultProps = {
    alt: '',
    src: '',
    className: ''
  }

  componentDidMount () {
    document.lazyLoadInstance.update();
  }

  componentDidUpdate () {
    document.lazyLoadInstance.update();
  }

  render () {
    const { alt, src, className } = this.props;
    return (
      <img
        alt={alt}
        data-src={src}
        data-setsrc={src}
        className={`lazy ${className}`}
      />
    );
  }
}
export default LazyImage;
