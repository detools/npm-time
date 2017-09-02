#!/usr/bin/env node
const npmTime = require('./')

const [moduleName, originalDateStart, originalDateEnd] = process.argv.slice(2)

npmTime(moduleName, originalDateStart, originalDateEnd)
