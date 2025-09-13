### 事件订阅总线

```js
class EventBus {
    events = {};

    on(name, cb) {
        ;(this.events[name] ??= new Set()).add(cb);
    }

    emit(name, ...agrs) {
        this.events[name]?.forEach(cb => cb(...agrs));
    }

    off(name, cb) {
        this.events[name]?.delete(cb);
    }

    once(name, cb) {
        const hanlder = function (...agrs) {
            cb(...agrs);
            this.off(name, hanlder);
        }
        this.on(name, hanlder);
    }
}


// 测试代码
const bus = new EventBus();

bus.on('hahaha', (...args) => {
    console.log('输出结果：', ...args);
});

setTimeout(() => {
    bus.emit('hahaha', 1, 2, 3, 4);
}, 3000);
```