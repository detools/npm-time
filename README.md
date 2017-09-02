# npm-time

## Installation as a global module
```sh
$ npm i @isnifer/npm-time -g
```

## CLI Usage 
```sh
$ npm-time webpack 08.11.2017 08.20.2017
3.5.4 => 12.08.2017
3.5.5 => 16.08.2017
```

## CLI API
```sh
npm-time %PACKAGE_NAME% [dateStart] [dateEnd]
```

## Installation as a local dependency (npm@5)
```sh
$ npm i @isnifer/npm-time
$ npx npm-time webpack 08.11.2017 08.20.2017
3.5.4 => 12.08.2017
3.5.5 => 16.08.2017
```

## As a module
```js
const npmTime = require('@isnifer/npm-time')
const appiumDeps = require('./node_modules/appium/package.json').dependencies

const dateStart = '08.10.2017'
const dateEnd = '08.13.2017'

async function getVersions() {
  for (const moduleName of Object.keys(appiumDeps)) {
    console.log(`${moduleName}:`)
    await npmTime(moduleName, dateStart, dateEnd)
    console.log('=========================')
  }
}

getVersions()
```

## Result
```sh
$ node index.js
appium-android-driver:
1.24.2 => 10.08.2017
=========================
appium-base-driver:
=========================
appium-fake-driver:
=========================
appium-ios-driver:
=========================
appium-mac-driver:
=========================
appium-selendroid-driver:
=========================
appium-support:
=========================
appium-uiautomator2-driver:
=========================
appium-windows-driver:
=========================
appium-xcuitest-driver:
=========================
appium-youiengine-driver:
=========================
argparse:
=========================
asyncbox:
=========================
babel-runtime:
=========================
bluebird:
=========================
continuation-local-storage:
=========================
date-utils:
=========================
fsevents:
=========================
lodash:
=========================
npmlog:
=========================
request-promise:
=========================
source-map-support:
=========================
teen_process:
=========================
winston:
=========================
```
