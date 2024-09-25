// @ts-check
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

/**
 * @param {string} val
 */
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

/**
 * @param {Date} date
 */
function escapeDate(date) {
  if (isNaN(date.getTime())) {
    return NULL
  }

  return date
    .toISOString()
    .replace(/\.[0-9]{1,3}Z$/, 'Z')
    .replace('.', ':')
}

/**
 * @param {object | null} obj
 */
function escapeObject(obj) {
  if (obj === null) {
    return NULL
  }

  if (obj instanceof Date) {
    return escapeDate(obj)
  }

  throw new Error('Objects are not supported')
}

/**
 * @param {unknown} val 
 * @returns {string}
 */
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
      return escapeObject(val)
    default:
      // symbols and exotic types
      throw new Error(`Unsupported value type ${typeof val}: ${val}`)
  }
}

module.exports = escape
