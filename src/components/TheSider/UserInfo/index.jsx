/**
 * @file 登录后用户信息模块
 * @author luyanhong 2019-09-27
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLoginStatus, logout } from 'api/login';
import { Link } from 'react-router-dom';
import login from 'coms/UserLogin';
import PropTypes from 'prop-types';
import { loginAction } from '@/redux/actions';
const mapStateToProps = (state) => {
  const { userInfo, isLogin } = state.loginReducer;
  return {
    userInfo,
    isLogin
  };
};
// Map Redux actions to component props
const mapDispatchToProps = (dispatch) => ({
  updateUser: (profile) => {
    const payload = {
      userInfo: profile
    };
    dispatch(loginAction(payload));
  },
  logout: () => {
    dispatch({
      type: 'logout'
    });
  }
});
class UserInfoa extends Component {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }

  async componentDidMount () {
    try {
      const res = await getLoginStatus();
      if (res.code === 200) {
        this.props.updateUser(res.profile);
      }
    } catch {
      //
    }
  }

  loginAfter = () => {
    login();
  }

  // 退出登录
  logout = () => {
    logout();
    this.props.logout();
  }

  render () {
    const { userInfo, isLogin } = this.props;
    return (
      <header className="com-sider-head">
        {isLogin && userInfo ? (
          <>
            <div className="com-sider-pic">
              <Link to={`/user/${userInfo.userId}`}>
                <img src={userInfo.avatarUrl} alt="用户" className="img-circle" />
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
            <h4 className="com-sider-name">{userInfo.nickname}</h4>
          </>
        ) : (
          <>
            <div className="com-sider-pic">
              <img src={userInfo.avatarUrl} alt="用户" className="img-circle" />
            </div>
            <div className="nav-link" onClick={this.loginAfter}>登录网易音乐</div>
          </>
        )}
      </header>
    );
  }
}
const UserInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoa);
export default UserInfo;
