# ufec
ustack front end component

## Install

```bash
npm i ufec --save
```

## External
Ufec依赖一些库，你需要保证你的上下文中有以下这些库:

* React
* React-dom
* React-dom-router
* antd

## Api

### Main

Main layout.

```javascript
import {Main} from 'ufec';
```

### ModalV2

弹出框主逻辑，支持通过json文件配置`Subs`中的子组件，并且支持自动验证.

### ModalPlus

和`ModalV2`逻辑相同，只是样式不一样，大弹出框.

### ModalDelete

包含删除逻辑的弹出框.

### ModalAlert

弹出消息／提醒／确认等信息的弹出框.

### SideMenu

菜单组件.

### Subs `{Object}`

Subs包含着一些小组件，这些子组件和Modal配合使用可以通过配置来进行组件验证。

* alert
* alertWithClick
* autoComplete
* checkbox
* checkboxTable
* datePicker
* iconLabel
* input
* inputNumber
* multipleChoice
* multistageTabs
* radio
* select
* slider
* steps
* switch
* text
* treeSelect

```javascript
import {Subs} from 'ufec';
const Steps = Subs.Steps;
```

### history

React-router的状态管理.

```javascript
import { history } from 'ufec';

history.push(xxx);
history.getPathList();
...
```

## Style

组件的样式需要另外引入.

```less
@import '~ufec/style/index.less';
```

## Cli

Ufec 有一些命令行的操作.

你可以输入 `node_modules/.bin/ufec -h` 来查看ufec都支持哪些操作。

### 初始化svg图片。

因为ufec本身有一些icon要支持，所以在初始化一个项目的时候，可以使用这个命令把ufec所需要的svg复制到目标文件夹中，比如：

```bash
ufec --svg client/iconfonts/svgs/ufec
```

上边这个命令会把ufec需要的svg图片都复制到`client/iconfonts/svgs/ufec`这个文件夹中。

### 打包i18n json文件

这个命令会把`client`文件夹下所有目录的`lang.json`打包合成一个`${app}.lang.json`，然后放到`client/locale`文件夹中。

```bash
ufec --transpile
```

当然，这个脚本也接受npm参数，如果你把这个脚本放在`package.json`的`scripts`中，比如：

```json
{
  "scripts": {
    "transpile": "ufec --transpile"
  }
}
```

那么，你可以通过传入npm参数来指定生成什么语言的文件。比如：

```bash
npm run transpile --lang=en
```

这样会生成英文lang文件，不传的默认生成中文lang文件。