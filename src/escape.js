const NULL = 'NULL'
const CHARS_ESCAPE_REGEX = /[\n\r\t\b\f"'\\]/g
const CHARS_ESCAPE_MAP = {
  '\n': '\\n',
  '\r': '\\r',
  '\t': '\\t',
  '\b': '\\b',
  '\f': '\\f',
  '"': '\\"',
  "'": "\\'",
  '\\': '\\\\',
}

function escapeString(val) {
  let chunkIndex = (CHARS_ESCAPE_REGEX.lastIndex = 0)
  let escapedVal = ''
  let match

  while ((match = CHARS_ESCAPE_REGEX.exec(val))) {
    escapedVal +=
      val.slice(chunkIndex, match.index) + CHARS_ESCAPE_MAP[match[0]]
    chunkIndex = CHARS_ESCAPE_REGEX.lastIndex
  }

  if (chunkIndex === 0) {
    return `'${val}'`
  }

  if (chunkIndex < val.length) {
    return `'${escapedVal}${val.slice(chunkIndex)}'`
  }

  return `'${escapedVal}'`
}

function escapeDate(date) {
  if (isNaN(date.getTime())) {
    return NULL
  }

  return date
    .toISOString()
    .replace(/\.[0-9]{1,3}Z$/, 'Z')
    .replace('.', ':')
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
