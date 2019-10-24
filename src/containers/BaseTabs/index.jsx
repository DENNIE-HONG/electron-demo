/**
 * @file Tabs标签页 容器组件
 * @param {String}   activeName, 一开始选中的tab名字
 * @param {String}   textAlign, tab对齐，默认左对齐
 * @param {Function} tabClick, 切换tab的回调事件，参数为选中tab的name
 * @author luyanhong 2019-08-16
 * @example
 * <BaseTabs activeName="必须" tabClick={function(){}}>
 *  <BaseTabsPane label="xxx" name="必须"></BaseTabsPane>
 * </BaseTabs>
 */
import React, { PureComponent } from 'react';
import BaseTabsPane from 'coms/BaseTabs/BaseTabsPane';
import BaseTabsCom from 'coms/BaseTabs';
import PropTypes from 'prop-types';
function BaseTabs (WrappedComponent) {
  return class extends PureComponent {
    static propTypes = {
      activeName: PropTypes.string.isRequired,
      tabClick: PropTypes.func,
      textAlign: PropTypes.string
    };

    static defaultProps = {
      tabClick: undefined,
      textAlign: 'left'
    };

    constructor (props) {
      super(props);
      this.state = {
        activePane: props.activeName
      };
    }

    handlerClick = (name) => {
      if (name) {
        this.setState({
          activePane: name
        });
        this.props.tabClick && this.props.tabClick(name);
      }
    }

    // 注意不能更改原有props
    render () {
      const { activePane } = this.state;
      const { props } = this;
      const newProps = {
        activeName: activePane,
        onClick: this.handlerClick
      };
      return <WrappedComponent {...props} {...newProps} />;
    }
  };
}
export default BaseTabs(BaseTabsCom);
export { BaseTabsPane };
