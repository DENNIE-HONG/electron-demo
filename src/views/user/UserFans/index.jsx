/**
 * @file 用户的粉丝页
 * @param {Boolean} isFollow, 是否新关注该用户
 * @author luyanhong 2019-11-28
 */
import React, { Component } from 'react';
import UserList from 'coms/UserList';
import ScrollBottom from 'containers/ScrollBottom';
import { getUserFans } from 'api/user';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const LIMIT = 30;
const mapStateToProps = (state) => {
  const { userInfo } = state.loginReducer;
  return {
    userInfo
  };
};
@connect(mapStateToProps)
class UserFans extends Component {
  static propTypes = {
    isFollow: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ])
  }

  static defaultProps = {
    isFollow: null
  }

  updateData = (result, sentData) => {
    const { length } = result.followeds;
    if (!length) {
      return;
    }
    sentData.lasttime = result.followeds[length - 1].time;
  }

  renderList = (list) => {
    const { isFollow, userInfo } = this.props;
    // 关注了
    if (isFollow === true) {
      list.length && !list.includes(userInfo) && list.unshift(userInfo);
    }
    // 取消关注，只支持第一个数据判断
    if (isFollow === false) {
      list.length && list[0].userId === userInfo.userId && list.shift();
    }
    return <UserList data={list} />;
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
          render={({ list }) => this.renderList(list)}
        />
      </section>
    );
  }
}

export default UserFans;
