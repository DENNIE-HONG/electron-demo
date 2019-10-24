/**
 * 歌单列表 容器组件
 * @param {Array}    playList, 数据列表
 * @param {Function} onPlay, 点击播放回调事件
 * @param {Boolean}  isShowArtist, 是否显示作者,默认是
 * @author luyanhong
 * @example
 * <SongSheet playList={} />
 */
import { connect } from 'react-redux';
import SongSheetCom from 'coms/SongSheet';
const mapStateToProps = (state) => {
  const { userInfo } = state.loginReducer;
  return {
    nickName: userInfo.nickname
  };
};
const SongSheet = connect(
  mapStateToProps
)(SongSheetCom);
export default SongSheet;
