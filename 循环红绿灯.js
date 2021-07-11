// 写一个循环红绿灯程序
function changeColor(color, time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(color)
    }, time)
  })
}

async function trafficLight() {
  let result
  while (true) {
    result = await changeColor('red', 2000)
    console.log(`%c现在颜色为 ${result}`, `color:${result}`)
    result = await changeColor('yellow', 1000)
    console.log(`%c现在颜色为 ${result}`, `color:${result}`)
    result = await changeColor('green', 2000)
    console.log(`%c现在颜色为 ${result}`, `color:${result}`)
  }
}

trafficLight()
