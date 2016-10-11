var falafel = require('falafel-bash')
var keywords = {}
;['alias','bg','bind','break','builtin','caller','cd','command','compgen',
'complete','compopt','continue','declare','typeset','dirs','disown','echo',
'enable','eval','exec','exit','export','fc','fg','getopts','hash','help',
'history','jobs','kill','let','local','logout','mapfile','readarray','popd',
'printf','pushd','pwd','read','readonly','return','set','shift','shopt',
'source','suspend','test','[',']','times','trap','type','ulimit','umask',
'unalias','unset','wait','.'].forEach(function (key) {
  keywords[key] = key + '-command'
})

module.exports = function (src) {
  var msh = /^(#![^\n]+)\n/.exec(src)
  var sh = msh ? '<span class="shebang">' + msh[1] + '</span>\n' : ''
  return sh + falafel(src.replace(/^#![^\n]+\n/,''), function (node) {
    var c = node.type.replace(/_/g,'-')
    var str = node.source()
    if (node.type === 'op') {
      str = esc(str)
    } else if (node.type === 'word') {
      if (keywords[node.text]) c += ' builtin-command ' + keywords[node.text]
      else if (/^\$[\w*@#?$!{-]/.test(node.text)) c += ' env'
      else if (/^\$\(\(/.test(node.text)) c += ' arithmetic-expansion'
      else if (/^(\$\(|`)/.test(node.text)) c += ' command-substitution'
      else if (/^<\(/.test(node.text)) c += ' process-substitution'
      if (/^\w+=/.test(node.text)) {
        c += ' assignment'
        str = node.text.replace(/(\w+=)(.*)/,repw)
      } else str = esc(str)
    }
    node.update('<span class="' + c + '">' + str + '</span>')
  }).toString()
}

function repw (_,a,b) { return a + '<span class="word">'+b+'</span>' }
function esc (s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}
