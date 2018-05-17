import React from 'react';
import ReactDOM from 'react-dom';
import Base from './base';
import history from '../history';
import event from './event';

function modal(props) {

  let doc = document.getElementById('main'),
    root = document.getElementById('modal-container'),
    container = null;

  if (!root) {
    root = document.createElement('div');
    root.id = 'modal-container';

    doc.appendChild(root);
  }

  container = document.createElement('div');
  root.appendChild(container);

  // location发生改变时destroy掉pop
  const unlisten = history.listen(destroy);

  function destroy() {
    root && root.parentNode && root.parentNode.removeChild(root);
    ReactDOM.unmountComponentAtNode(root);
    unlisten();
  }

  function onAfterClose() {
    event.off();
    destroy();
  }

  let _props = {
    ...props,
    root,
    onAfterClose
  };

  ReactDOM.render(<Base {..._props}/>, container);
}

export default modal;
