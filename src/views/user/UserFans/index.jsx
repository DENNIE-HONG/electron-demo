/**
 * @file 用户的粉丝页
 * @author luyanhong 2019-11-28
 */
import React, { Component } from 'react';
import UserList from 'coms/UserList';
import ScrollBottom from 'containers/ScrollBottom';
import { getUserFans } from 'api/user';
const LIMIT = 30;
class UserFans extends Component {
  updateData = (result, sentData) => {
    const { length } = result.followeds;
    sentData.lasttime = result.followeds[length - 1].time;
  }

  render () {
    const { id } = this.props.match.params;
    const params = {
      uid: id
    };
    return (
      <section className="user-fans">
        <ScrollBottom
          getUrl={getUserFans}
          limit={LIMIT}
          params={params}
          listPropName="followeds"
          updateCallback={this.updateData}
          render={({ list }) => (
            <UserList data={list} />
          )}
        />
      </section>
    );
  }
}

export default UserFans;
