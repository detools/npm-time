const { exec } = require('child_process')
const format = require('date-fns/format')
const isAfter = require('date-fns/is_after')
const isBefore = require('date-fns/is_before')
const isEqual = require('date-fns/is_equal')
const isWithinRange = require('date-fns/is_within_range')

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

const logDates = ([version, date]) => console.log(`${version} => ${format(date, 'DD.MM.YYYY')}`)

module.exports = async function npmTime(moduleName, dateStart, dateEnd) {
  const getBetween = ([, date]) => isWithinRange(date, dateStart, dateEnd)
  const getAfter = ([, date]) => isAfter(date, dateStart) || isEqual(date, dateStart)
  const getBefore = ([, date]) => isBefore(date, dateStart) || isEqual(date, dateStart)

  const { array: versions } = await getVersions(moduleName)
  const [, actualFilter] = [
    [!!(dateStart && dateEnd), getBetween],
    [!!(dateStart && !dateEnd), getAfter],
    [!!(!dateStart && dateEnd), getBefore],
    [!!(!dateStart && !dateEnd), x => x],
  ].find(([status]) => status)

  return versions.filter(actualFilter).forEach(logDates)
}
