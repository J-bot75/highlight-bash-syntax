var test = require('tape')
var highlight = require('../')
var src = `
  #!/bin/bash
  echo hello > cool.txt
  echo 'ok <3'
`.trim().replace(/^\s+/mg,'')

var expected = `
  |#!/bin/bash|
  |||echo| |hello| ||&gt;| |cool.txt|||
  ||echo| |'ok &lt;3'|||
`.trim().replace(/^\s+/mg,'')

test('sh', function (t) {
  t.equal(highlight(src).replace(/<span[^>]*>|<\/span>/g,'|'), expected)
  t.end()
})
