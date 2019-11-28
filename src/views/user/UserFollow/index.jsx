/**
 * @file 我关注的用户
 * @author luyanhong 2019-11-22
 */
import React, { Component } from 'react';
import UserList from 'coms/UserList';
import { getUserFollows } from 'api/user';
import ScrollBottom from 'containers/ScrollBottom';
class UserFollow extends Component {
  render () {
    const { id } = this.props.match.params;
    const params = {
      uid: id
    };
    return (
      <section className="user-follow">
        <ScrollBottom
          limit={30}
          getUrl={getUserFollows}
          listPropName="follow"
          params={params}
          render={({ list }) => (
            <UserList data={list} />
          )}
        />
      </section>
    );
  }
}

export default UserFollow;
