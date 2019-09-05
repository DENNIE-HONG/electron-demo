/**
 * @file Tabs标签页
 * @param {String} activeName, 一开始选中的tab名字
 * @author luyanhong 2019-08-16
 * @example
 * <BaseTabs activeName="必须">
 *  <BaseTabsPane label="xxx" name="必须"></BaseTabsPane>
 * </BaseTabs>
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BaseTabsPane from './BaseTabsPane';
import './BaseTabs.scss';
class BaseTabs extends Component {
  static propTypes = {
    activeName: PropTypes.string.isRequired,
    tabClick: PropTypes.func
  }

  static defaultProps = {
    tabClick: undefined
  }

  constructor (props) {
    super(props);
    this.state = {
      activePane: props.activeName
    };
    this.handlerClick = this.handlerClick.bind(this);
  }

  handlerClick (name) {
    if (name) {
      this.setState({
        activePane: name
      });
      this.props.tabClick && this.props.tabClick(name);
    }
  }


  render () {
    const { children } = this.props;
    const { activePane } = this.state;
    const lists = children.map((child) => {
      const { label, name } = child.props;
      const isActive = activePane === child.props.name;
      return (
        <BaseTabsPane
          label={label}
          key={label}
          name={name}
          onClick={this.handlerClick}
          className={isActive ? 'active' : ''}
        >{label}
        </BaseTabsPane>
      );
    });
    return (
      <>
        <nav className="tabs">
          {lists}
        </nav>
        <div className="tabs-content">
          {this.props.children.map((child) => (
            <div key={child.props.label} className={activePane === child.props.name ? '' : 'tabs-cont-active'}>{child.props.children}</div>
          ))}
        </div>
      </>
    );
  }
}
export default BaseTabs;
export { BaseTabsPane };
