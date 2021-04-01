// rgb(255,255,255)转换为#fff
function rgb2hex(rgb) {
  let arr = rgb.slice(4, -1).split(',')
  return `#${(+arr[0]).toString(16).padStart(2, '0')}${(+arr[1])
    .toString(16)
    .padStart(2, '0')}${(+arr[2]).toString(16).padStart(2, '0')}`
}
// 测试用例
rgb2hex('rgb(0,0,255)')

function hex2rgb(hex) {
  let str = hex[0] === '#' ? hex.slice(1) : hex
  if (str.length === 3) {
    str = str
      .split('')
      .map(item => item.repeat(2))
      .join('')
  }
  return `rgb(${parseInt(str.slice(0, 2), 16)},
  ${parseInt(str.slice(2, 4), 16)},
  ${parseInt(str.slice(4), 16)})`
}
// 测试用例
hex2rgb('#f0f')
