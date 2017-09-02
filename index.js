const { exec } = require('child_process')
const format = require('date-fns/format')
const mapValues = require('lodash.mapvalues')
const findLastIndex = require('lodash.findlastindex')

const getVersions = packageName => new Promise(
  (resolve, reject) => exec(`npm view ${packageName} time`, (error, result) => (
    error ? reject(error) : resolve(parseJSObjectInString(result))
  ))
)

function parseJSObjectInString(string) {
  const array = string
    .replace(/\{\s/g, '')
    .replace(/\s\}/g, '')
    .split('\n')
    .map(item => item.trim())
    .filter(x => x)
    .map(item => item.replace(/\,/g, '').replace(/\'/g, '').trim().split(': '))
    .filter(([version]) => version !== 'created' && version !== 'modified')

  return {
    array,
    asObject: array => array.reduce((memo, [version, date]) => (
      Object.assign(memo, { [version]: date })
    ), {}),
  }
}

module.exports = async function npmTime(moduleName, originalDateStart, originalDateEnd) {
  const { array: versions } = await getVersions(moduleName)

  if (originalDateStart) {
    const dateStart = format(originalDateStart, 'YYYYMMDD')

    const left = versions.findIndex(([, date]) => (format(date, 'YYYYMMDD') - dateStart) >= 0)

    return versions.slice(left).forEach(([version, date]) => (
      console.log(`${version} => ${format(date, 'DD.MM.YYYY')}`)
    ))
  }

  if (originalDateStart && originalDateEnd) {
    const dateStart = format(originalDateStart, 'YYYYMMDD')
    const dateEnd = format(originalDateEnd, 'YYYYMMDD')

    const left = versions.findIndex(([, date]) => (format(date, 'YYYYMMDD') - dateStart) >= 0)
    const right = findLastIndex(versions, ([, date]) => (dateEnd - format(date, 'YYYYMMDD')) >= 0)

    return versions.slice(left, right + 1).forEach(([version, date]) => (
      console.log(`${version} => ${format(date, 'DD.MM.YYYY')}`)
    ))
  }

  console.log(versions)
}
