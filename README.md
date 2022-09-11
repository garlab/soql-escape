# soql-escape

Escape soql queries

## Installation

```sh
npm i soql-escape
```

or with yarn

```sh
yarn add soql-escape
```

## Usage

```js
const { soql } = require('soql-escape')
```

Query with characters to escape:

```js
soql`SELECT foo FROM Bar WHERE str = ${unEscapedString}`
```

Query using a date:

```js
soql`
    SELECT id, CreatedDate
    FROM Sales_Order__c
    WHERE CreatedDate < ${new Date('2013-05-21T00:00:00Z')}
`
```

It is also possible to import the escape function directly:

```js
const { escape } = require('soql-escape')

assert(escape('"quotes\'') === `'\\"quotes\\''`)
```

## Contributing

Fork this repo and create a pull-request.