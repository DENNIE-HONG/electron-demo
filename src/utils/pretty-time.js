/**
 * 格式化日期
 * @param {Number}  时间戳
 * @return {String} 2018-xx-xx时间格式
 * @author luyanhong 2018-12-19
*/
export const prettyDate = (time) => {
  let date = new Date(time).toLocaleDateString();
  date = date.replace(/\//g, '-');
  return date;
};

/**
 * 格式化节目时长
 * @param {Number} duration, 时长，单位是毫秒‘
 * @return {String}  xx:xx的时间格式
 * @author luyanhong
*/
export const prettyDuration = (duration) => {
  if (!duration) {
    return '00:00';
  }
  duration = Math.trunc(duration / 1000);
  let min = Math.trunc(duration / 60);
  let sec = Math.trunc(duration % 60);
  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;
  return `${min}:${sec}`;
};
/**
 * 格式化时间
 * @param {Number} timeStamp, 时间戳
 * @return {Stiring} 2018-xx-xx xx:xx
 */
export const prettyTime = (timeStamp) => {
  const dateInstance = new Date(timeStamp);
  const date = prettyDate(timeStamp);
  let hour = dateInstance.getHours();
  let min = dateInstance.getMinutes();
  hour < 10 && (hour = `0${hour}`);
  min < 10 && (min = `0${min}`);
  const time = `${date} ${hour}:${min}`;
  return time;
};
