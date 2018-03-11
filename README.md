# soql-escape
Escape soql queries

## Installation

    $ npm i soql-escape

or with yarn

    $ yarn add soql-escape

## Usage

`const { soql } = require('soql-escape')`


Query with characters to escape:

```
soql`SELECT foo FROM Bar WHERE str = ${unEscapedString}`
```


Query with a date:

```
soql`
    SELECT id, CreatedDate
    FROM Sales_Order__c
    WHERE CreatedDate < ${new Date('2013-05-21T00:00:00Z')}
`
```

It is also possible to import the escape function:

```
const { escape } = require('soql-escape')

assert(escape('"quotes\'') === `'\\"quotes\\''`)

```

