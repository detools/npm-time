# npm-time

## Installation as global module
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
`npm-time %PACKAGE_NAME% [dateStart] [dateEnd]`

## Installation as local dependency (npm@5)
```sh
$ npm i @isnifer/npm-time
$ npx npm-time webpack 08.11.2017 08.20.2017
3.5.4 => 12.08.2017
3.5.5 => 16.08.2017
```

## As module
```js
import npmTime from '@isnifer/npm-time'

npmTime(moduleName: string, dateStart?: string, dateEnd?: string)
```
