/**
 * @file 关注/取消关注 容器组件
 * @param {Number}   id, 用户id
 * @param {Function} update,关注完回调事件
 * @author luyanhong 2020-01-06
 */
import React, { Component } from 'react';
import { follow } from 'api/home';
import showMessage from 'containers/Message';
import PropTypes from 'prop-types';
let isFetching = false;
const FOLLOW = 1;
const CANCEL_FOLLOW = 0;
function FollowAction (WrappedComponent) {
  return class extends Component {
    static propTypes = {
      id: PropTypes.number.isRequired,
      update: PropTypes.func
    }

    static defaultProps = {
      update: undefined
    }

    follow = async () => {
      try {
        if (isFetching) {
          return;
        }
        isFetching = true;
        await follow(this.props.id, FOLLOW);
        showMessage({
          message: '关注成功',
          type: 'success'
        });
        this.props.update({
          follow: true
        });
      } catch (err) {
        console.log('关注失败');
      } finally {
        isFetching = false;
      }
    }

    cancelFollow = async () => {
      try {
        if (isFetching) {
          return;
        }
        isFetching = true;
        await follow(this.props.id, CANCEL_FOLLOW);
        showMessage({
          message: '取消关注成功',
          type: 'success'
        });
        this.props.update({
          follow: false
        });
      } catch (err) {
        console.log('取消关注失败');
      } finally {
        isFetching = false;
      }
    }

    render () {
      const newProps = {
        follow: this.follow,
        cancelFollow: this.cancelFollow
      };
      return <WrappedComponent {...newProps} />;
    }
  };
}
export default FollowAction;
