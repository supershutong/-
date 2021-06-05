// 1、双层循环
function unique(arr) {
  if (arr.length <= 1) return arr
  let res = [arr[0]]
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < res.length; j++) {
      if (arr[i] === res[j]) break
      if (j === res.length - 1) res.push(arr[i])
    }
  }
  return res
}

// 2、indexOf
function unique(arr) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) res.push(arr[i])
  }
  return res
}

// 3、filter + indexOf
function unique(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}

// 4、Set
function unique(arr) {
  return [...new Set(arr)]
}

// 5、Map + filter
function unique(arr) {
  let tmp = new Map()
  return arr.filter(item => !tmp.has(item) && tmp.set(item, true))
}

// 6、Set + filter
function unique(arr) {
  let tmp = new Set()
  return arr.filter(item => !tmp.has(item) && tmp.add(item))
}

let arr = [2, 1, 3, 5, 3, 3, 7, 4, -6]
console.log(unique(arr))
