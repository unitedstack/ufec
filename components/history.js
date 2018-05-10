/**
 * history.push(path, [state])
 * history.replace(path, [state])
 * history.go(n)
 * history.goBack()
 * history.goForward()
 *
 * history.listen(func) // listen for changes to the current location
 *
 * history.getPathList() // return pathlist array
 */
import createBrowserHistory from 'history/createBrowserHistory';

const getPathList = () => window.location.pathname.split('/').filter((m) => !!m && m !== 'dashboard');

const HISTORY = createBrowserHistory({
  basename: '/dashboard'
});
// 注意！这里的pathList是将basename忽略的！！为了跟忽略basename的link和route统一
HISTORY.getPathList = getPathList;

export default HISTORY;
