/**
 * @file 登录后用户信息模块
 * @author luyanhong 2019-09-27
 */
import React, { Component } from 'react';
import { ReactReduxContext } from 'react-redux';
import { getLoginStatus, logout } from 'api/login';
import { Link } from 'react-router-dom';
import { loginAction } from '@/redux/actions';
import login from '../UserLogin';
class UserInfo extends Component {
  static contextType = ReactReduxContext;

  constructor (props) {
    super(props);
    this.state = {
      isLogin: false,
      userInfo: null
    };
  }

  async componentDidMount () {
    try {
      const res = await getLoginStatus();
      if (res.code === 200) {
        this.updateUserInfo(res.profile);
      }
    } catch {
      //
    }
  }

  loginAfter = () => {
    login((profile) => {
      this.updateUserInfo(profile);
    });
  }

  // 退出登录
  logout = () => {
    logout();
    this.setState({
      isLogin: false,
      userInfo: null
    });
    this.updateUserInfo();
  }

  // 更新用户头像、昵称
  updateUserInfo (profile) {
    const { store } = this.context;
    if (!profile) {
      store.dispatch({
        type: 'logout'
      });
      return;
    }
    const payload = {
      nickName: profile.nickname,
      avatar: profile.avatarUrl
    };
    store.dispatch(loginAction(payload));
    this.setState({
      isLogin: true,
      userInfo: profile
    });
  }

  render () {
    const { store } = this.context;
    const { nickName, avatar } = store.getState().loginReducer;
    const { isLogin, userInfo } = this.state;
    return (
      <header className="com-sider-head">
        {isLogin ? (
          <>
            <div className="com-sider-pic">
              <Link to={`/user/${userInfo.userId}`}>
                <img src={avatar} alt="用户" className="img-circle" />
              </Link>
              <div className="com-sider-user">
                <ul className="com-sider-user-info">
                  <li className="com-sider-user-item">
                    <i>{userInfo.eventCount}</i>
                    <p>动态</p>
                  </li>
                  <li className="com-sider-user-item">
                    <i>{userInfo.follows}</i>
                    <p>关注</p>
                  </li>
                  <li className="com-sider-user-item">
                    <i>{userInfo.followeds}</i>
                    <p>粉丝</p>
                  </li>
                </ul>
                <div className="com-sider-user-btns">
                  <Link to={`/user/${userInfo.userId}`} className="com-sider-user-btn">个人主页</Link>
                  <span className="com-sider-user-btn nav-link" onClick={this.logout}>退出登录</span>
                </div>
              </div>
            </div>
            <h4 className="com-sider-name">{nickName}</h4>
          </>
        ) : (
          <>
            <div className="com-sider-pic">
              <img src={avatar} alt="用户" className="img-circle" />
            </div>
            <div className="nav-link" onClick={this.loginAfter}>登录网易音乐</div>
          </>
        )}
      </header>
    );
  }
}
export default UserInfo;
