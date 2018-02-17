const escape = require('./escape')

function soql(strings, ...values) {
  if (strings == null || strings.length === 0) {
    return ''
  }

  if (values == null || values.length === 0) {
    return strings[0]
  }

  const query = [strings[0]]
  values.forEach((val, i) => {
    query.push(escape(val))
    query.push(strings[i + 1])
  })

  return query.join('')
}

module.exports = soql
