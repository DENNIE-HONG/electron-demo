import React, { Component } from 'react';
class Top extends Component {
  constructor (props) {
    super(props);
    console.log(1);
  }

  render () {
    return (
      <div className="top">
        排行榜
      </div>
    );
  }
}

export default Top;
