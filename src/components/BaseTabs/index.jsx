/**
 * @file Tabs标签页
 * @author luyanhong 2019-08-16
 */
import React, { Component } from 'react';
import BaseTabsPane from './BaseTabsPane';
import './BaseTabs.scss';
class BaseTabs extends Component {
  render () {
    const { children } = this.props;
    const lists = children.map((child) => {
      const { label } = child.props;
      console.log(label);
      return (
        <BaseTabsPane label={label} key={label}>{label}</BaseTabsPane>
      );
    });
    return (
      <nav className="tabs">
        {lists}
      </nav>
    );
  }
}
export default BaseTabs;
export { BaseTabsPane };
