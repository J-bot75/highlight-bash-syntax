var test = require('tape')
var highlight = require('../')
var src = `
  #!/bin/bash
  echo hello > cool.txt
  echo 'ok <3'
`.trim().replace(/^\s+/mg,'')

var expected = `
  #!/bin/bash
  <span class="complete-command"><span class="simple-command"><span class="word">echo</span> <span class="word">hello</span> <span class="io-redirect"><span class="op">&gt;</span> <span class="word">cool.txt</span></span></span>
  <span class="simple-command"><span class="word">echo</span> <span class="word">'ok &lt;3'</span></span></span>
`.trim().replace(/^\s+/mg,'')

test('sh', function (t) {
  t.equal(highlight(src), expected)
  t.end()
})
