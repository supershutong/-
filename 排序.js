// 1、冒泡 时间：O(n^2)，空间：O(1)
// 实现思路：比较相邻两数，较大数靠后放
function bubbleSort(arr) {
  let len = arr.length
  for (let i = len; i >= 2; i--) {
    for (let j = 0; j < i - 1; j++) {
      // 前一个比后一个大，则交换位置，即较大数靠后放
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

// 2、选择排序 时间：O(n^2)，空间：O(1)
// 实现思路：遍历自身以后的元素，最小的元素跟自己调换位置。
function selectSort(arr) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[i]) {
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
  }
  return arr
}

// 3、插入排序 时间：O(n^2)，空间：O(1)
// 实现思路：将元素插入到已排序好的数组中。
function insertSort(arr) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[i]) {
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      } else {
        break
      }
    }
  }
  return arr
}

/* 4、快速排序 时间：O(nlogn)，空间：O(logn)
  实现思路：选择基准值 mid，循环原数组，小于基准值放左边数组，大于放右边数组，
          然后 concat 组合，最后递归。
 */
function quickSort(arr) {
  if (arr.length <= 1) return arr
  let left = [],
    right = [],
    mid = arr.splice(0, 1)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < mid) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(mid, quickSort(right))
}

/**
 * 5、快速排序 ES6版本 时间：O(nlogn)，空间：O(logn)
 * 实现思路：选择基准值 mid，循环原数组，小于基准值放左边数组，大于放右边数组，
 *          递归
 */
function quickSortEs6(arr) {
  if (!arr.length) return []
  const [mid, ...rest] = arr
  return [
    ...quickSortEs6(rest.filter(e => e < mid)),
    mid,
    ...quickSortEs6(rest.filter(e => e >= mid))
  ]
}

let arr = [2, 1, 3, 5, 3, 3, 7, 4, -6]
console.log(bubbleSort(arr))
console.log(selectSort(arr))
console.log(insertSort(arr))
console.log(quickSort(arr))
console.log(quickSortEs6(arr))
