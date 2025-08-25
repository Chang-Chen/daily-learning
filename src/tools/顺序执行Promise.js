/**
 * 顺序执行Promise集合
 * @param {Promise[]} functions Promise对象集合
 * @returns 返回集合内的结果
 */
function mergePromise(functions) {
    return functions.reduce((prev, cur, index) => {
        return prev.then(async (res) => {
            res[index] = await cur;
            return res;
        });
    }, Promise.resolve([]));
}

function createTask(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data);
        }, 1000);
    });
}

const f1 = createTask('1');
const f2 = createTask('2');
const f3 = createTask('3');

mergePromise([f1, f2, f3]).then((res) => {
    console.log('res ===>', res);
})