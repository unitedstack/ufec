import './style/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Base from './base';
import history from 'client/utils/history';
function modal(props) {
  if(!window.modalRefList) {
    window.modalRefList = [];
  }
  let doc = document,
    root = doc.getElementById('modal-container'),
    container = null;
  if (!root) {
    root = doc.createElement('div');
    root.id = 'modal-container';
    doc.body.appendChild(root);
  }
  container = doc.createElement('div');
  root.appendChild(container);
  const modalNums = root.childNodes.length;
  if(modalNums > 1) {
    const prevModal = modalRefList[modalNums - 2].current;
    prevModal.setState({
      visible: false
    });
  }
  // location发生改变时destroy掉pop
  const unlisten = history.listen(destroy);
  function destroy() {
    window.modalRefList = [];
    root && root.parentNode && root.parentNode.removeChild(root);
    ReactDOM.unmountComponentAtNode(root);
    unlisten();
  }
  function onAfterClose() {
    destroy();
  }
  let _props = {
    ...props,
    root,
    childNodes: root.childNodes,
    onAfterClose
  };
  modalRefList.push(React.createRef());
  ReactDOM.render(<Base ref={modalRefList[modalRefList.length - 1]} {..._props}/>, container);
}
export default modal;
