/**
 * loading
 * @param {String} width, 默认是100%
 * @param {String} height, 默认是100%
 * @author luyanhong 2018-12-04
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Loading.scss';
class Loading extends Component {
  static propsType = {
    height: PropTypes.string,
    width: PropTypes.string
  }

  static defaultProps = {
    height: '100%',
    width: '100%'
  }

  render () {
    const { height, width } = this.props;
    return (
      <div className="loading" style={{ height, width }}>
        {[0, 1, 2, 3, 4].map((item) => (
          <span className="loading-item" key={item}></span>
        ))}
      </div>
    );
  }
}
export default Loading;
