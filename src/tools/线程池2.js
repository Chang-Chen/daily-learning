
class TaskScheruler {
    constructor(max) {
        this._max = max;
        this._runingCount = 0;
        this._task = [];
    }

    addTask(task) {
        return new Promise((...args) => {
            const _task = () => task().then(...args)
            this._task.push(_task);
            this.runTask();
        });
    }

    runTask() {
        if (this._runingCount >= this._max || this._task.length === 0) return;
        const task = this._task.shift();
        if (task) {
            this._runingCount++;
            task().finally(() => {
                this._runingCount--;
                this.runTask();
            });
        }
    }
}


function createTaskPromise(data, ms) {
    console.time(data);
    return () => {
        return new Promise(resolve => {
            setTimeout(() => {
                console.timeEnd(data);
                resolve(data)
            }, ms)
        })
    }
}

const task1 = createTaskPromise(1, 300);
const task2 = createTaskPromise(2, 600);
const task3 = createTaskPromise(3, 100);
const task4 = createTaskPromise(4, 4000);
const task5 = createTaskPromise(5, 100);

const scheruler = new TaskScheruler(3);

scheruler.addTask(task1).then(res => {
    console.log(res);
});
scheruler.addTask(task2).then(res => {
    console.log(res);
});
scheruler.addTask(task3).then(res => {
    console.log(res);
});
scheruler.addTask(task4).then(res => {
    console.log(res);
});
scheruler.addTask(task5).then(res => {
    console.log(res);
});