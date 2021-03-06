/**
 * 懒加载图片模块 容器组件
 * @param {String} src, 图片url
 * @param {String} alt, 图片描述
 * @param {String} className, 类名
 * @author luyanhong 2018-12-05
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from '../../../node_modules/vanilla-lazyload/dist/lazyload.min.js';
if (!document.lazyLoadInstance) {
  document.lazyLoadInstance = new LazyLoad({
    element_selector: 'img.lazy'
  });
}
class LazyImage extends PureComponent {
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
