// 写一个循环红绿灯程序
function changeColor(color) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`%c颜色为 ${color}`, `color:${color}`)
      resolve()
    }, 1000)
  })
}

async function trafficLight() {
  while (true) {
    await changeColor('red')
    await changeColor('yellow')
    await changeColor('green')
  }
}

trafficLight()
