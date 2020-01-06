/**
 * @file 个人页
 * @author luyanhong 2019-10-10
 */
import React, { Component } from 'react';
import { getUserDetail } from 'api/user';
import Loading from 'coms/Loading';
import { Route, Link } from 'react-router-dom';
import UserEvent from './UserEvents';
import UserHome from './UserHome';
import UserFollow from './UserFollow';
import UserFans from './UserFans';
import './user.scss';
class User extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userInfo: null
    };
  }

  async componentDidMount () {
    const { id } = this.props.match.params;
    try {
      const res = await getUserDetail(id);
      this.setState({
        userInfo: res.profile
      });
    } catch {
      //
    }
  }

  render () {
    const { userInfo } = this.state;
    const { id } = this.props.match.params;
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
                <Link to={`/user/${id}/event`}>
                  <span className="item-count">{userInfo.eventCount}</span>动态
                </Link>
              </li>
              <li className="user-header-item">
                <Link to={`/user/${id}/follow`}>
                  <span className="item-count">{userInfo.follows}</span>关注
                </Link>
              </li>
              <li className="user-header-item">
                <Link to={`/user/${id}/fans`}>
                  <span className="item-count">{userInfo.followeds}</span>粉丝
                </Link>
              </li>
            </ul>
          </div>
        </header>
        <Route path="/user/:id" exact component={UserHome} />
        <Route path="/user/:id/event" component={UserEvent} />
        <Route path="/user/:id/follow" component={UserFollow} />
        <Route path="/user/:id/fans" component={UserFans} />
      </div>
    ) : <Loading />;
  }
}
export default User;
