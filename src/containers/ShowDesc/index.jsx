/**
 * 简介展开收起模块
 * @param {String}  text, 必须，文案
 * @param {Boolean} isOpen,  是否展开，默认收起
 * @param {Number}  maxHeight, 收起时候最大高度, 默认100px
 * @author luyanhong
 * @example
 * <ShowDesc text={xxx} />
*/
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ShowDescCom from 'coms/ShowDesc';
function ShowDesc (WrappedComponent) {
  return class extends PureComponent {
    static propTypes = {
      isOpen: PropTypes.bool,
      maxHeight: PropTypes.number,
      text: PropTypes.string.isRequired
    }

    static defaultProps = {
      isOpen: false,
      maxHeight: 100
    }

    constructor (props) {
      super(props);
      this.state = {
        isOpen: props.isOpen,
        hasDescBtn: false
      };
      this.$desc = React.createRef();
    }

    componentDidMount () {
      const { text, maxHeight } = this.props;
      // 字数太少, 直接展示
      if (text.length < 160) {
        this.setState({
          isOpen: true
        });
        return;
      }
      // 字数超过限制，并且高度也超过限制
      if (this.$desc.current.clientHeight > maxHeight) {
        this.setState({
          hasDescBtn: true
        });
      }
    }

    // 展开、收起
    showDesc = () => {
      this.setState((prev) => ({
        isOpen: !prev.isOpen
      }));
    }

    render () {
      const { maxHeight } = this.props;
      const { isOpen, hasDescBtn } = this.state;
      const style = isOpen ? null : { maxHeight: `${maxHeight}px` };
      const newProps = {
        isOpen,
        hasDescBtn,
        style,
        showDesc: this.showDesc,
        $desc: this.$desc
      };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}
export default ShowDesc(ShowDescCom);
