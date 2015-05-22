module.exports = function (op) {
  var face = {}
    , pred = function () { return false }
    , timeout_ms = 0 // keep going forever by default
    , interval_ms = 5000
    , finish = function ()  {}

  face.until = function (predicate) {
    pred = predicate
    return this
  }

  face.every = function (time) {
    interval_ms = time
    return this
  }

  face.timeout = function (time) {
    timeout_ms = time
    return this
  }

  face.then = function (done) {
    finish = done
    return this
  }

  face.run = function run() {
    var started = Date.now()

    op(function decision() {
      var elapsed = Date.now() - started

      pred.apply(null, arguments) || (timeout_ms && elapsed >= timeout_ms) 
        ? finish.apply(null, arguments) 
        : setTimeout(function () { op(decision) }, interval_ms)
    })
  }

  return face
}
