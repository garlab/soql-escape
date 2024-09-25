const test = require('node:test')
const assert = require('node:assert')
const soql = require('../src/soql')

test('empty queries', t => {
  assert.strictEqual(soql``, '')
  assert.strictEqual(soql`   `, '   ')
  assert.strictEqual(soql(null), '')
})

test('query without values', t => {
  assert.strictEqual(
    soql`
    SELECT Account.Name, (SELECT Contact.LastName FROM Account.Contacts)
    FROM Account
  `,
    `
    SELECT Account.Name, (SELECT Contact.LastName FROM Account.Contacts)
    FROM Account
  `
  )
})

test('query with simple values', t => {
  assert.strictEqual(
    soql`
    SELECT Id, Name, Status__c, Location__c
    FROM Property__c
    WHERE Status__c = ${'Available'}
    AND Beds__c > ${2}
    AND Price__c < ${500000}
    ORDER BY CreatedDate DESC
  `,
    `
    SELECT Id, Name, Status__c, Location__c
    FROM Property__c
    WHERE Status__c = 'Available'
    AND Beds__c > 2
    AND Price__c < 500000
    ORDER BY CreatedDate DESC
  `
  )
})

test('query with function values', t => {
  assert.strictEqual(
    soql`
    SELECT Name, Status__c, Location__c, Main_Thumbnail__c
    FROM Property__c
    WHERE Distance(Location__c, GEOLOCATION(${51.998188}, ${-0.742017}), 'km') < ${10}
    ORDER BY Distance(Location__c, GEOLOCATION(${51.998188}, ${-0.742017}), 'km')
    ${() => soql`LIMIT ${10}`}
  `,
    `
    SELECT Name, Status__c, Location__c, Main_Thumbnail__c
    FROM Property__c
    WHERE Distance(Location__c, GEOLOCATION(51.998188, -0.742017), 'km') < 10
    ORDER BY Distance(Location__c, GEOLOCATION(51.998188, -0.742017), 'km')
    LIMIT 10
  `
  )
})

test('query with date', t => {
  assert.strictEqual(
    soql`SELECT id, CreatedDate FROM Sales_Order__c where CreatedDate < ${new Date(
      '2013-05-21T00:00:00Z'
    )}`,
    soql`SELECT id, CreatedDate FROM Sales_Order__c where CreatedDate < 2013-05-21T00:00:00Z`
  )
})
