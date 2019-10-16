import React, { Component } from 'react';
import BaseTabs, { BaseTabsPane } from 'coms/BaseTabs';
import login from 'coms/UserLogin';
import { getLoginStatus } from 'api/login';
import { getLikeList } from 'api/user';
import './myLike.scss';
class MyLike extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLogin: null
    };
  }

  async componentDidMount () {
    try {
      const res = await getLoginStatus();
      const { userId } = res.profile;
      const resList = await getLikeList(userId);
      this.setState({
        isLogin: true
      });
    } catch {
      login(() => {
        setTimeout(() => {
          window.location.reload();
        }, 200);
      });
    }
  }

  render () {
    const { isLogin } = this.state;
    return isLogin && (
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
