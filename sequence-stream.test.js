var qs = require('q-stream');
var assert = require('assert');
var seq = require('../sequence-stream');


describe("sequence-stream", function() {
  it("should combine a sequence of streams", function() {
    var results = [];
    var a = qs();
    var b = qs();
    var c = qs();

    var p = seq([a, b, c])
      .pipe(qs(function(d) { results.push(d); }))
      .promise()
      .then(function() {
        assert.deepEqual(results, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
      });

    a.push(1);
    b.push(4);
    c.push(7);

    a.push(2);
    b.push(5);
    c.push(8);

    a.push(3);
    b.push(6);
    c.push(9);

    a.push(null);
    b.push(null);
    c.push(null);

    return p;
  });

  it("should act as an ended stream if no streams are given", function() {
    assert(seq()._readableState.ended);
  });

  it("should emit errors occuring when the streams fail to push", function(done) {
    var s = qs();

    var t = seq([s])
      .on('error', function(e) {
        assert(e instanceof Error);
        assert.equal(e.message, ':(');
        done();
      });

    t.push = function() {
      throw new Error(':(');
    };

    s.push(1);
  });
});
