var falafel = require('falafel-bash')

module.exports = function (src) {
  return falafel(src, function (node) {
    var c = node.type.replace(/_/g,'-')
    var str = node.source()
    if (node.type === 'op') {
      str = esc(str)
    } else if (node.type === 'word') {
      str = esc(str)
    }
    node.update('<span class="' + c + '">' + str + '</span>')
  }).toString()
}

function esc (s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}
