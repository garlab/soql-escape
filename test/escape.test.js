const test = require('ava')
const escape = require('../src/escape')

test('undefined and null are converted to NULL', t => {
  t.is(escape(null), 'NULL')
  t.is(escape(undefined), 'NULL')
})

test('number values are converted to string', t => {
  t.is(escape(10), '10')
  t.is(escape(3.14), '3.14')
})

test('boolean values are converted to string', t => {
  t.is(escape(true), 'true')
  t.is(escape(false), 'false')
})

test('date are converted to YYYY-mm-dd HH:ii:ss', t => {
  t.is(escape(new Date('December 17, 1995 03:24:00')), '1995-12-17T03:24:00Z')
  t.is(escape(new Date('January 2, 2008 01:20:01')), '2008-01-02T01:20:01Z')
  t.is(escape(new Date('fooo')), 'NULL')
})

test('string are escaped', t => {
  // See https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select_quotedstringescapes.htm
  t.is(escape('foo'), `'foo'`)
  t.is(escape("foo '"), `'foo \\\''`)
  t.is(escape('new \r\n line'), `'new \\r\\n line'`)
  t.is(escape('white \t space'), `'white \\t space'`)
  t.is(escape('\bBell'), `'\\bBell'`)
  t.is(escape('"quotes\''), `'\\"quotes\\''`)
  t.is(escape('\\'), `'\\\\'`)
})

test('functions are called', t => {
  t.is(escape(() => 'foo'), 'foo')
})

test('objects are not supported', t => {
  t.throws(() => {
    escape({})
  })

  t.throws(() => {
    escape({ dummy: 'value' })
  })
})

test('arrays are not supported', t => {
  t.throws(() => {
    escape([])
  })

  t.throws(() => {
    escape(['x', 'y'])
  })
})

test('symbols are not supported', t => {
  t.throws(() => {
    escape(Symbol())
  })

  t.throws(() => {
    escape(Symbol('symbol'))
  })
})
