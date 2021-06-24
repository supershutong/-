class Subject {
  constructor() {
    this.observers = []
  }
  add(observer) {
    this.observers.push(observer)
  }
  remove(observer) {
    this.observers = this.observers.filter(ob => ob !== observer)
  }
  notify() {
    this.observers.map(ob => {
      ob.update()
    })
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name
  }
  update() {
    console.log(`观察者${this.name}被通知更新了`)
  }
}

// 测试用例
// 实例化两个观察者
let obs1 = new Observer('张三')
let obs2 = new Observer('李四')
// 实例化被观察目标对象
let subject = new Subject()
// 被观察目标添加观察者
subject.add(obs1)
subject.add(obs2)
subject.remove(obs1)
// 通知更新
subject.notify()
