Array.prototype.myreduce = function (cb, init) {
  let acc = init,
    self = this
  self.forEach((item, i) => {
    acc = cb(acc, item, i, self)
  })
  return acc
}

let arr = [1, 2, 3, 4]
let res = arr.myreduce((acc, cur) => acc.concat(cur), [])
console.log(res)
