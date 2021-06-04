/**
 * @description 数组扁平化
 * @param {Number} depth 拍平层级
 * @returns Array
 */
Array.prototype.myflat = function (depth = 1) {
  return depth > 0
    ? this.reduce(
        (acc, cur) =>
          acc.concat(Array.isArray(cur) ? cur.myflat(depth - 1) : cur),
        []
      )
    : this
}

var arr = [1, [2, 3, [4, [5]], 6]]

console.log(arr.myflat(5))
