/**
 * 轮播组件
 * @author luyanhong 2018-11-27
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CarouselBox.scss';
class CarouselBox extends Component {
  static next () {
    // this.carouselRef.current.style.transform = 'translate3d(100%, 0, 0)';
    this.showNext();
  }

  static propTypes = {
    index: PropTypes.number
  }

  static defaultProps = {
    index: 0
  }

  constructor (props) {
    super(props);
    this.state = {
      index: props.index + 1
    };
    this.length = this.props.children.length;
    CarouselBox.next = CarouselBox.next.bind(this);
  }

  componentDidMount () {
    this.transform(- this.state.index);
    this.carouselRef.addEventListener('transitionend', () => {
      console.log(this.state.index);
      if (this.state.index === this.length + 1) {
        this.carouselRef.style.left = '200%';
      }
    }, false);
  }

  // 展示下一页
  showNext () {
    this.setState((prev) => {
      let index;
      if (prev.index === this.length + 1) {
        index = 2;
      } else {
        index = prev.index + 1;
      }
      this.transform(- index);
      return {
        index
      };
    });
  }

  // 移动x轴
  transform (index) {
    this.carouselRef.style.transform = `translate3d(${index * 100}%, 0, 0)`;
    this.carouselRef.style.left = '0px';
  }

  render () {
    const { length } = this.props.children;
    const { children } = this.props;
    return (
      <ul
        className="carousel"
        ref={(el) => { this.carouselRef = el; }}
      >
        <li
          key={0}
          className="carousel-list"
        >{children[length - 1]}
        </li>
        {children.map((item, index) => (
          <li
            key={index + 1}
            className="carousel-list"
          >{item}
          </li>
        ))}
        <li
          key={length + 1}
          className="carousel-list"
        >{children[0]}
        </li>
      </ul>
    );
  }
}
export default CarouselBox;

