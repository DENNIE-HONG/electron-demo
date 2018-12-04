import React, { Component } from 'react';
import LazyLoad from 'vanilla-lazyload';
import loadingImage from 'assets/img/loading.gif';
if (!document.lazyLoadInstance) {
  document.lazyLoadInstance = new LazyLoad({
    element_selector: '.lazy',
    data_bg: loadingImage
  });
}
class LazyImage extends Component {
  componentDidMount () {
    document.lazyLoadInstance.update();
  }

  render () {
    const { alt, src, className } = this.props;
    return (
      <img
        alt={alt}
        className={`lazy ${className}`}
        data-src={src}
      />
    );
  }
}
export default LazyImage;
