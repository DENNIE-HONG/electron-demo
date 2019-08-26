/**
 * @file 错误捕获
 * @author luyanhong 2019-08-26
 */
import showMessage from 'coms/message';
const catchError = () => {
  // 捕获意外的异常
  window.onerror = function (message) {
    console.log('异常：', message);
    showMessage({
      type: 'error',
      message
    });
    return true;
  };

  // 捕获漏掉的promise异常
  window.addEventListener('unhandledrejection', (e) => {
    e.preventDefault();
    showMessage({
      type: 'error',
      message: e.message
    });
    return true;
  });
};
export default catchError;
