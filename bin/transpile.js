const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

module.exports = function () {
  let language = process.env.npm_config_lang || process.env.language;
  if (!language) {
    language = 'zh-CN';
  }

  const clientDir = path.resolve(process.cwd(), 'client');
  const appsDir = path.join(clientDir, 'applications');
  const applications = fs.readdirSync(appsDir)
    .filter(m => fs.statSync(path.join(appsDir, m)).isDirectory());
  const appList = (process.env.npm_config_app && process.env.npm_config_app.split(',')) || applications;

  function buildInvertedIndex(files, output) {
    const invertedIndex = {
      words: [],
      docIndex: {}
    };

    files.forEach((file) => {
      const obj = require(file)[language];
      Object.keys(obj).forEach((key) => {
        if (invertedIndex.words.indexOf(key) === -1) {
          invertedIndex.words.push(key);
          invertedIndex.docIndex[key] = [file];
          output[key] = obj[key];
        } else {
          invertedIndex.docIndex[key].push(file);
        }
      });
    });

    invertedIndex.words.forEach((word) => {
      const dupCount = invertedIndex.docIndex[word].length;
      if (dupCount > 1) {
        console.log(`${chalk.white.bgYellow.bold(' WARNING ')} the key ${chalk.bold(word)} is duplicate in ${chalk.bold(dupCount)} files: `);
        invertedIndex.docIndex[word].forEach((_path) => {
          console.log(_path);
        });
      }
    });
  }


  function writeFile(fileName, str) {
    const localePath = path.resolve(clientDir, 'locale');
    try {
      fs.accessSync(localePath, fs.F_OK);
    } catch (e) {
      fs.mkdirSync(localePath);
    }
    try {
      fs.writeFileSync(path.join(localePath, fileName), str, 'utf-8');
      console.log(`${chalk.white.bgGreen.bold(' SUCCESS ')} The ${chalk.bold(language)} i18n file ${chalk.bold(fileName)} has been generated!`);
    } catch (e) {
      console.log(`${chalk.white.bgRed.bold('ERROR')} Fail to write i18n file ${chalk.bold(fileName)}`);
    }
  }

  appList.forEach((app) => {
    const appDir = `${clientDir}/applications/${app}`;

    glob(`${appDir}/modules/**/lang.json`, {}, (er, files) => {
      files.unshift(`${appDir}/locale/lang.json`);
      const file = '';
      try {
        const output = {};
        buildInvertedIndex(files, output);
        writeFile(`${app}.lang.json`, JSON.stringify(output));
      } catch (e) {
        console.log(`${chalk.white.bgRed.bold(' ERROR ')} i18n file ${file} got something wrong!`);
      }
    });
  });
};
