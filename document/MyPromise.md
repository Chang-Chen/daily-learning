### 手写 Promise

```js

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    #state = PENDING;
    #result = undefined;
    #queue = [];

    constructor(executor) {
        const resolve = (data) => {
            this.#changeState(FULFILLED, data);
        }
        const reject = (data) => {
            this.#changeState(REJECTED, data);
        }
        executor(resolve, reject);
    }

    // 改变 promise 状态
    #changeState(state, result) {
        if (this.#state !== PENDING) return;
        this.#state = state;
        this.#result = result;
        this.#run();
    }

    // 处理回调函数
    #handleCallback(callback, resolve, reject) {
        if (typeof callback !== 'function') {
            // promise 状态穿透
            queueMicrotask(() => {
                const settled = this.#state === FULFILLED ? resolve : reject;
                settled(this.#result);
            });
            return;
        }
        queueMicrotask(() => {
            try {
                const data = callback(this.#result);
                debugger;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    // 处理任务队列
    #run() {
        if (this.#state === PENDING) return;
        while (this.#queue.length) {
            const {onFulfilled, onRejected, resolve, reject} = this.#queue.shift();
            debugger;
            if (this.#state === FULFILLED) {
                this.#handleCallback(onFulfilled, resolve, reject);
            } else {
                this.#handleCallback(onRejected, resolve, reject);
            }
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this.#queue.push({
                onFulfilled,
                onRejected,
                resolve,
                reject
            });
            this.#run();
        });
    }
}

const p = new MyPromise((resolve, reject) => {
    resolve(1);
});

p.then((res) =>{
    console.log(res); // 1
    return res + 1;
}).then(res => {
    console.log(res); // 2
});

```