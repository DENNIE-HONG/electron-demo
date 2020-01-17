/**
 * @file 个人页
 * @author luyanhong 2019-10-10
 */
import React, { Component } from 'react';
import { getUserDetail } from 'api/user';
import Loading from 'coms/Loading';
import { Route, Link } from 'react-router-dom';
import BaseButton from 'coms/BaseButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FollowAction from 'containers/FollowAction';
import UserHome from './UserHome';
import UserFollow from './UserFollow';
import UserFans from './UserFans';

import './user.scss';
const mapStateToProps = (state) => {
  const { isLogin, userInfo: loginUserInfo } = state.loginReducer;
  return {
    isLogin,
    loginUserInfo
  };
};
@connect(mapStateToProps)
class User extends Component {
  static propTypes = {
    loginUserInfo: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      userInfo: null,
      isFollow: null,
      followeds: 0
    };
  }

  async componentDidMount () {
    const { id } = this.props.match.params;
    try {
      const res = await getUserDetail(id);
      this.setState({
        userInfo: res.profile,
        followeds: res.profile.followeds
      });
    } catch {
      //
    }
  }

  // 关注、取消关注后回调
  followCallback = ({ follow }) => {
    if (follow) {
      this.setState((prev) => ({
        isFollow: true,
        followeds: prev.followeds + 1
      }));
    }

    if (!follow) {
      this.setState((prev) => ({
        isFollow: false,
        followeds: prev.followeds - 1
      }));
    }
  }

  render () {
    const { userInfo, isFollow, followeds } = this.state;
    const { id } = this.props.match.params;
    let isMe = null;
    if (this.props.loginUserInfo.userId === parseInt(id, 10)) {
      isMe = true;
    }
    // 按钮模块
    const btnBox = (props) => {
      const followed = isFollow === null ? userInfo.followed : isFollow;
      return !followed
        ? <BaseButton onClick={props.follow} className="gap-top" icon="plus">关注</BaseButton>
        : <BaseButton onClick={props.cancelFollow} className="gap-top" icon="check">已关注</BaseButton>;
    };
    const FollowBox = FollowAction(btnBox);
    const UserFansBox = (rest) => <UserFans isFollow={isFollow} {...rest} />;
    return userInfo ? (
      <div className="user">
        <header className="user-header">
          <div className="user-header-pic">
            <img alt={userInfo.nickname} className="img-circle" src={userInfo.avatarUrl} />
          </div>
          <div className="user-header-info">
            <h3 className="user-header-name">{userInfo.nickname}</h3>
            <ul className="user-header-list">
              <li className="user-header-item">
                <Link to={`/user/${id}/follow`}>
                  <span className="item-count">{userInfo.follows}</span>关注
                </Link>
              </li>
              <li className="user-header-item">
                <Link to={`/user/${id}/fans`}>
                  <span className="item-count">{followeds}</span>粉丝
                </Link>
              </li>
            </ul>
            {(!this.props.isLogin || !isMe) && <FollowBox id={id} update={this.followCallback} />}
          </div>
        </header>
        <Route path="/user/:id" exact component={UserHome} />
        <Route path="/user/:id/follow" component={UserFollow} />
        <Route path="/user/:id/fans" component={UserFansBox} />
      </div>
    ) : <Loading />;
  }
}
export default User;
