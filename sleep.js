/**
 * sleep函数
 */
function sleep(time, cb) {
  return new Promise(resolve => {
    setTimeout(() => {
      let res = cb()
      resolve(res)
    }, time)
  })
}

function fn() {
  console.log(new Date().getSeconds())
}

fn()
sleep(2000, fn).then(() => {
  console.log('awake')
})
