function spawn(genFn) {
  return new Promise(function (resolve, reject) {
    let gen = genFn()  // 生成器对象

    function step(nextFn) {
      let next
      try {
        next = nextFn()  // 执行gen.next
      } catch (e) {
        return reject(e)
      }
      if (next.done) {
        return resolve(next.value)
      }  // next.done为false时继续step
      Promise.resolve(next.value).then(
        function (v) {
          step(function () {
            return gen.next(v)
          })
        },
        function (e) {
          step(function () {
            return gen.throw(e)
          })
        }
      )
    }

    step(function () {
      return gen.next()
    })
  })
}
