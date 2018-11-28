/**
 * 轮播组件
 * @param {Number}   startSlide, 从第几个开始显示，默认是0
 * @param {Number}   speed, 动画过渡时间，以秒为单位, 默认是0.8
 * @method {Function} next(), 下一个
 * @method {Function} prev(), 上一个
 * @author luyanhong 2018-11-27
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CarouselBox.scss';
let isAnimated = false;
class CarouselBox extends Component {
  static next () {
    this.showNext();
  }

  static prev () {
    this.showPrev();
  }

  static propTypes = {
    startSlide: PropTypes.number,
    speed: PropTypes.number
  }

  static defaultProps = {
    startSlide: 0,
    speed: 0.8
  }

  constructor (props) {
    super(props);
    this.state = {
      index: props.startSlide + 1
    };
    this.length = this.props.children.length;
    CarouselBox.next = CarouselBox.next.bind(this);
    CarouselBox.prev = CarouselBox.prev.bind(this);
  }

  componentDidMount () {
    this.carouselRef.addEventListener('transitionend', () => {
      isAnimated = false;
      const { index } = this.state;
      // 监听过渡到最后一个卡片
      if (index === this.length + 1) {
        this.setState({
          index: 1
        });
        this.transform(1, 0);
      }
      if (index === 0) {
        this.setState({
          index: this.length
        });
        this.transform(this.length, 0);
      }
    }, false);
    this.transform(this.state.index);
  }

  // 展示下一页
  showNext () {
    if (isAnimated) {
      return;
    }
    isAnimated = true;
    this.setState((prev) => {
      const index = prev.index + 1;
      this.transform(index);
      return {
        index
      };
    });
  }

  // 展示上一页
  showPrev () {
    if (isAnimated) {
      return;
    }
    isAnimated = true;
    this.setState((prev) => {
      const index = prev.index - 1;
      this.transform(index);
      return {
        index
      };
    });
  }

  /**
   * 移动x轴
   * @param {Number} 移动距离是x * 100%
   * @param {Number} 过渡效果持续时间
  */
  transform (index, duration = this.props.speed) {
    this.carouselRef.style.transitionDuration = `${duration}s`;
    this.carouselRef.style.transform = `translate3d(${- index * 100}%, 0, 0)`;
  }

  render () {
    const { length } = this.props.children;
    const { children } = this.props;
    return (
      <div className="carousel">
        <ul
          className="carousel-list"
          ref={(el) => { this.carouselRef = el; }}
        >
          <li
            key={0}
            className="carousel-list-item"
          >{children[length - 1]}
          </li>
          {children.map((item, index) => (
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
  }
}
export default CarouselBox;

