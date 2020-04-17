module.exports = function (op) {
  var face = {}
    ,pred = function () { return false }
    ,timeout_ms = 0 // keep going forever by default
    ,interval_ms = 5000,
    is_break = false // allow users to break this function

  face.until = function (predicate) {
    pred = predicate
    return this
  }

  face.every = function (time) {
    interval_ms = time
    return this
  }

  face.timeout_at = function (time) {
    timeout_ms = time
    return this
  }

  face.break = function () {
    is_break = true
    return this
  }

  face.run = function (cb) {
    var started = Date.now()
    if (is_break) {
      return;
    }
    op(function decision() {
      var elapsed = Date.now() - started

      pred.apply(null,arguments) || (timeout_ms && elapsed >= timeout_ms)
        ? cb.apply(null,arguments)
        : setTimeout(function () { op(decision) },interval_ms)
    })
    return this;
  }

  return face
}
