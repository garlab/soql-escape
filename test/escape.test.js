const test = require('node:test')
const assert = require('node:assert')
const escape = require('../src/escape')

test('undefined and null are converted to NULL', t => {
  assert.strictEqual(escape(null), 'NULL')
  assert.strictEqual(escape(undefined), 'NULL')
})

test('number values are converted to string', t => {
  assert.strictEqual(escape(10), '10')
  assert.strictEqual(escape(3.14), '3.14')
})

test('boolean values are converted to string', t => {
  assert.strictEqual(escape(true), 'true')
  assert.strictEqual(escape(false), 'false')
})

test('date are converted to YYYY-mm-dd HH:ii:ss', t => {
  assert.strictEqual(escape(new Date('December 17, 1995 03:24:00')), '1995-12-17T03:24:00Z')
  assert.strictEqual(escape(new Date('January 2, 2008 01:20:01')), '2008-01-02T01:20:01Z')
  assert.strictEqual(escape(new Date('fooo')), 'NULL')
})

test('string are escaped', t => {
  // See https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select_quotedstringescapes.htm
  assert.strictEqual(escape('foo'), `'foo'`)
  assert.strictEqual(escape("foo '"), `'foo \\\''`)
  assert.strictEqual(escape('new \r\n line'), `'new \\r\\n line'`)
  assert.strictEqual(escape('white \t space'), `'white \\t space'`)
  assert.strictEqual(escape('\bBell'), `'\\bBell'`)
  assert.strictEqual(escape('"quotes\''), `'\\"quotes\\''`)
  assert.strictEqual(escape('\\'), `'\\\\'`)
})

test('functions are called', t => {
  assert.strictEqual(escape(() => 'foo'), 'foo')
})

test('objects are not supported', t => {
  assert.throws(() => {
    escape({})
  })

  assert.throws(() => {
    escape({ dummy: 'value' })
  })
})

test('arrays are not supported', t => {
  assert.throws(() => {
    escape([])
  })

  assert.throws(() => {
    escape(['x', 'y'])
  })
})

test('symbols are not supported', t => {
  assert.throws(() => {
    escape(Symbol())
  })

  assert.throws(() => {
    escape(Symbol('symbol'))
  })
})
