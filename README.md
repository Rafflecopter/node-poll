```
var poll = require('simple-polling')

poll(function (cb) { setTimeout(function () { console.log('polling...'); cb(Math.random()) })})
  .until(function (num) { return num > 0.9 })
  .every(1000)
  .timeout_at(15000)
  .run(function (num) { console.log('Finished with: ' + num) })
```

```
// use break
var poll = require('simple-polling')

var poller = poll(function (cb) { setTimeout(function () { console.log('polling...'); cb(Math.random()) })})
  .until(function (num) { return num > 0.9 })
  .every(1000)
  .timeout_at(15000)
  .run(function (num) { console.log('Finished with: ' + num) })

// if u need to break this poller
poller.break();
```