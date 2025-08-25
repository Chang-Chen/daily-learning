
function asyncSum(a, b) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(a + b);
        }, 1000);
    });
}

function sums(sums) {
    if (sums.length === 0) return 0;
    if (sums.length === 1) return sums[0];
    if (sums.length === 2) return asyncSum(...sums);

    let promise = asyncSum(...sums.slice(0, 2));
    for (let i = 2; i < sums.length; i++) {
        const num = sums[i];
        promise = promise.then(sum => asyncSum(sum, num))
    }

    return promise;
}

console.time('计算时间');
sums([1, 2, 3, 4, 5, 6, 7, 8]).then(res => {
    console.timeEnd('计算时间');
    console.log('res ===>', res);
})