# ufec
ustack front end component

## Install

```bash
npm i ufec --save
```

## External
This repo based on some libraries:

* React
* React-dom
* React-dom-router
* antd

So you should make sure these repo is in your context.

## Api

### Main

Main layout.

```javascript
import {Main} from 'ufec';
```

### ModalV2

Main modal component.

### ModalPlus

Main modal plus.

### ModalDelete

Main modal delete.

### ModalAlert

Main modal alert.

### SideMenu

Side menu component.

### Subs `{Object}`

A list of subs components.

```javascript
import {Subs} from 'ufec';
const Steps = Subs.Steps;
```

### history

React-router's history state.

## Style

Remember to import stylesheets.

```less
@import '~ufec/style/index.less';
```
