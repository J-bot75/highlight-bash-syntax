# highlight-bash-syntax

highlight bash syntax with html

# example

given a shell script:

``` sh
#!/bin/bash
echo hello > cool.txt
echo 'ok <3'
```

and a program to turn it into html:

``` js
var highlight = require('highlight-bash-syntax')
var fs = require('fs')
var src = fs.readFileSync('whatever.sh')
console.log(highlight(src))
```

output:

``` html
#!/bin/bash
<span class="complete-command"><span class="simple-command"><span class="word">echo</span> <span class="word">hello</span> <span class="io-redirect"><span class="op">&gt;</span> <span class="word">cool.txt</span></span></span>
<span class="simple-command"><span class="word">echo</span> <span class="word">'ok &lt;3'</span></span></span>
```

# api

``` js
var highlight = require('highlight-bash-syntax')
```

## var html = highlight(src)

Return a string of `html` from a string of bash `src`.

# install

```
npm install highlight-bash-syntax
```

# license

BSD
