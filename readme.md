# sequence-stream

> **note** For now, this project is deprecated. I no longer use or work on it, and doubt others are using it. If by any chance you were using this, and would like to see more of it in some form, let me know: justnvdm(at)gmail.com

![Build Status](https://api.travis-ci.org/justinvdm/sequence-stream.png)

gather a sequence of streams into a single stream.


```javascript
var Readable = require('readable-stream/readable');
var seq = require('sequence-stream');

var a = new Readable();
var b = new Readable(); 
var c = new Readable();

seq([a, b, c]).pipe(process.stdout);

a.push('1');
b.push('4');
c.push('7');

a.push('2');
b.push('5');
c.push('8');

a.push('3');
b.push('6');
c.push('9');

a.push(null);
b.push(null);
c.push(null);

// 123456789
```


## install

node:

```
$ npm install sequence-stream
```


## api

### `seq(streams[, opts])`

Creates a new stream from the given array of streams. Each stream in the given array is paused until the stream immediately before it has finished, at which point it will be resumed and have its output passed through the sequence stream.

If `opts` are given, they will be used as the options to use to initialise the new stream.

The returned stream is a [`q-stream`](https://github.com/justinvdm/q-stream), and is thus technically a `Transform` stream.
