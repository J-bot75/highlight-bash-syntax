var highlight = require('../')
var fs = require('fs')
var src = fs.readFileSync('whatever.sh')
console.log(highlight(src))
