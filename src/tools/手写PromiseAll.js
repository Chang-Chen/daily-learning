/**
 * 手撕 Promise.all
 * @param promises Promise队列
 */
export function PromiseAll(promises) {
    promises = [...promises];
    if (promises.length === 0) return Promise.resolve([]);
    return new Promise((resolve, reject) => {
        let results = Array.from({length: promises.length}).fill(null);
        let count = 0;
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then((res) => {
                results[index] = res;
                count++;
                if (count === promises.length) {
                    resolve(results);
                }
            }, reject);
        });
    });
}