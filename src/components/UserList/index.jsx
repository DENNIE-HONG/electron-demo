/**
 * @file  用户列表 展示组件
 * @param {Array} data，用户列表数组
 * @author luyanhong 2019-11-22
 */
import React from 'react';
import LazyImage from 'containers/LazyImage';
import { Link } from 'react-router-dom';
import BaseButton from 'coms/BaseButton';
import PropTypes from 'prop-types';
import EmptyList from 'coms/EmptyList';
import './UserList.scss';
const UserList = (props) => {
  const { data } = props;
  return data.length ? (
    <ul className="userlist">
      {data.map((user) => (
        <li key={user.userId} className="userlist-item">
          <Link to={`/user/${user.userId}`}>
            <div className="userlist-pic">
              <LazyImage src={user.avatarUrl} alt={user.nickname} className="userlist-pic-img" />
            </div>
            <h5 className="userlist-name" title={user.nickname}>{user.nickname}</h5>
          </Link>
          <BaseButton type="info">已关注</BaseButton>
        </li>
      ))}
    </ul>
  ) : <EmptyList />;
};
UserList.propTypes = {
  data: PropTypes.array
};
UserList.defaultProps = {
  data: []
};
export default UserList;
