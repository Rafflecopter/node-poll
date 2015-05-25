var poll = require('./poll')

poll(function (cb) { setTimeout(function () { console.log('polling...'); cb(Math.random()) })})
  .until(function (num) { return num > 0.9 })
  .every(1000)
  .timeout(15000)
  .run(function (num) { console.log('Finished with: ' + num) })
