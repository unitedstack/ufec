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
import { createBrowserHistory } from 'history';

const currentUfecApp = window.CURRENT_UFEC_APP || 'dashboard';

const getPathList = () => window.location.pathname.split('/').filter(m => !!m && m !== currentUfecApp);

const HISTORY = createBrowserHistory({
  basename: `/${currentUfecApp}`
});
// 注意！这里的pathList是将basename忽略的！！为了跟忽略basename的link和route统一
HISTORY.getPathList = getPathList;
HISTORY.currentUfecApp = currentUfecApp;

export default HISTORY;
