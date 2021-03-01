let fs = require('fs')
let Thunk = function (fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback)
    }
  }
}

let run = function (fn) {
  var gen = fn()
  function _next(err, data) {
    let result = gen.next(data)
    if (!result.done) {
      result.value(_next)
    }
  }
  _next()
}

const readFileThunk = Thunk(fs.readFile)
function* g() {
  let fileList = [
    '../textFile/text1.txt',
    '../textFile/text2.txt',
    '../textFile/text3.txt'
  ]
  for (let i = 0; i < fileList.length;) {
    const str = yield readFileThunk(fileList[i])
    console.log(str.toString())
    i++
  }
}

run(g)
