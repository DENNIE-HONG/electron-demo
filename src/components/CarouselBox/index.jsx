/**
 * 轮播组件 展示组件
 * @param {Number}   startSlide, 从第几个开始显示，默认是0
 * @param {Number}   speed, 动画过渡时间，以秒为单位, 默认是0.8
 * @method {Function} next(), 下一个
 * @method {Function} prev(), 上一个
 * @author luyanhong 2018-11-27
*/
import React from 'react';
import PropTypes from 'prop-types';
import './CarouselBox.scss';

const CarouselBox = (props) => {
  const { children, carouselRef } = props;
  const { length } = children;
  return (
    <div className="carousel">
      <ul
        className="carousel-list"
        ref={carouselRef}
      >
        <li
          key={0}
          className="carousel-list-item"
        >{children[length - 1]}
        </li>
        {React.Children.map(children, (item, index) => (
          <li
            key={index + 1}
            className="carousel-list-item"
          >{item}
          </li>
        ))}
        <li
          key={length + 1}
          className="carousel-list-item"
        >{children[0]}
        </li>
      </ul>
    </div>
  );
};
CarouselBox.propTypes = {
  carouselRef: PropTypes.object.isRequired
};
export default CarouselBox;

