// 操作日志
function operateLog(str) {
  let items = str
    .split('.')
    .reduce((acc, cur) => acc.concat(cur.split('(')), [])

  return items
    .map((item, index) =>
      index === items.length - 1
        ? item.replace(/\)/, '')
        : item.replace(/\)/, ' and')
    )
    .join(' ')
}

const res = operateLog('a.get(b).set(c)')
console.log(res) // a get b and set c
