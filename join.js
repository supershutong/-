/*
Your previous Plain Text content is preserved below:

Boolean search is powerful in sourcing and recruiting.
We will use machine learning prediction to provide relations among skills. Now we need a function to transfer those relations to a string with correct boolean format.

Example1:
input: [["java", "python"], ["machine learning", "deep learning"]]
output: ("java" OR "python") AND ("machine learning" OR "deep learning")

Example2:
input: [[["java", "maven", "spring"], "python"], ["machine learning", "deep learning"]]
output: (("java" OR "maven" OR "spring") AND "python") AND ("machine learning" OR "deep learning")

 */

function join(arr) {
  let basicFlag = arr.every(item => typeof item !== 'object')

  return arr
    .map(item => (typeof item === 'object' ? '(' + join(item) + ')' : item))
    .join(basicFlag ? ' OR ' : ' AND ')
}

let arr = [
  [['java', 'maven', 'spring'], 'python'],
  ['machine learning', 'deep learning']
]

let arr2 = [
  ['java', 'python'],
  ['machine learning', 'deep learning']
]

console.log(join(arr))

console.log(join(arr2))
