function findRepeat(arr) {
  let result = new Map()
  arr.map((item) => {
    result.set(item, !result.get(item) ? 1 : result.get(item) + 1)
  })
  return Array.from(result).filter((el) => el[1] > 1)
}

// 测试用例
let arr = [1, 1, 5, 2, 4, 6, 1, 5]
let res = findRepeat(arr)
console.log(res)
