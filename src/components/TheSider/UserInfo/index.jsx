/**
 * @file 登录后用户信息模块 展示组件
 * @author luyanhong 2019-09-27
 */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserInfo = (props) => {
  const {
    userInfo, isLogin, logout, loginAfter
  } = props;
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
                <span className="com-sider-user-btn nav-link" onClick={logout}>退出登录</span>
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
          <div className="nav-link" onClick={loginAfter}>登录网易音乐</div>
        </>
      )}
    </header>
  );
};
const noop = () => {};
UserInfo.propTypes = {
  userInfo: PropTypes.object,
  isLogin: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  loginAfter: PropTypes.func
};
UserInfo.defaultProps = {
  userInfo: {},
  isLogin: false,
  loginAfter: noop
};
export default UserInfo;
