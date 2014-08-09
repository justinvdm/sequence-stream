var qs = require('q-stream');
module.exports = seq;


function seq(streams, opts) {
  var t = qs(opts || {});

  if (!(streams || 0).length) {
    done();
    return t;
  }

  var pushes = streams.map(function(s) {
    s.pause();

    return s
      .pipe(qs(push))
      .on('error', error);
  });

  streams.forEach(function(s, i) {
    if (i < 1) return;
    pushes[i - 1].on('finish', function() { s.resume(); });
  });

  pushes[pushes.length - 1].on('finish', done);
  streams[0].resume();

  function done() { t.push(null); }
  function push(d) { t.push(d); }
  function error(e) { t.emit('error', e); }

  return t;
}
