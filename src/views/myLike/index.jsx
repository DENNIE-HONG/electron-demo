import React, { Component } from 'react';
import BaseTabs, { BaseTabsPane } from 'coms/BaseTabs';
import './myLike.scss';
class MyLike extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className="my">
        <h3 className="my-title">我喜欢</h3>
        <div className="my-content">
          <BaseTabs activeName="songs">
            <BaseTabsPane label="歌曲" name="songs">歌曲</BaseTabsPane>
            <BaseTabsPane label="专辑" name="albums">z</BaseTabsPane>
            <BaseTabsPane label="歌单" name="playlist">p</BaseTabsPane>
          </BaseTabs>
        </div>
      </div>
    );
  }
}
export default MyLike;
