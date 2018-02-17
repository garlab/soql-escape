const NULL = 'NULL'

function escapeString(val) {
  return val
}

function escapeDate(date) {
  if (isNaN(date.getTime())) {
    return NULL
  }

  return date
}

function escape(val) {
  switch (typeof val) {
    case 'undefined':
      return NULL
    case 'boolean':
    case 'number':
      return String(val)
    case 'string':
      return escapeString(val)
    case 'function':
      return val()
    case 'object':
      if (val === null) {
        return NULL
      } else if (val instanceof Date) {
        return escapeDate(val)
      } else {
        throw new Error('Objects are not supported')
      }
    case 'symbol':
      throw new Error(`Symbols are not supported: ${val}`)
    default:
      throw new Error(`Unsupported value type ${typeof val}: ${val}`)
  }
}

module.exports = escape
