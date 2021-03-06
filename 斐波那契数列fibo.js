// 递归，时间复杂度 O(2^n)
function fiboSequence(n) {
  if (n === 1 || n === 2) return n - 1
  return fiboSequence(n - 1) + fiboSequence(n - 2)
}

// 迭代，时间复杂度 O(n)。推荐！
function fiboSequence(n) {
  let a = 0,
    b = 1,
    c = a + b
  for (let i = 3; i < n; i++) {
    // 斐波那契数列第三个数字开始才是前两数和
    a = b
    b = c
    c = a + b
  }
  return c
}

// 测试用例
console.log(fiboSequence(5)) // 3
