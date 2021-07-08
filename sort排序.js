// 1、冒泡 时间：O(n^2)，空间：O(1)
// 实现思路：比较相邻两数，较大数靠后放
function bubbleSort(arr) {
  let len = arr.length
  // 每轮循环结果：当前最大数被放在了最后
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

/**  ---------- 重要 -----------
 * 2、快速排序 ES6版本 时间：O(nlogn)，空间：O(logn)
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

/* 3、快速排序 时间：O(nlogn)，空间：O(logn)
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

// 4、选择排序 时间：O(n^2)，空间：O(1)
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

// 5、插入排序 时间：O(n^2)，空间：O(1)
// 实现思路：将元素插入到已排序好的数组中。类似扑克牌摸牌
function insertSort(arr) {
  let len = arr.length
  for (let i = 1; i < len; i++) {
    let temp = arr[i]
    let j = i - 1 // 默认已排序的元素
    while (j >= 0 && arr[j] > temp) {
      // 在已排序好的队列中从后向前扫描
      arr[j + 1] = arr[j] // 已排序元素大于新元素，将该元素移到下一个位置
      j--
    }
    arr[j + 1] = temp // 找到考察的数应处于的位置
  }
  return arr
}

let arr = [2, 1, 3, 5, 3, 3, 7, -6, 4]
console.log('bubbleSort', bubbleSort(arr))
console.log('quickSortEs6', quickSortEs6(arr))
console.log('quickSort', quickSort(arr))
console.log('selectSort', selectSort(arr))
console.log('insertSort', insertSort(arr))
