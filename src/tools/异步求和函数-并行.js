
function asyncSum(a, b) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(a + b);
        }, 1000);
    });
}

function sums(numbers) {
    if (numbers.length === 0) return Promise.resolve(0);
    if (numbers.length === 1) return Promise.resolve(numbers[0]);
    if (numbers.length === 2) return asyncSum(numbers[0], numbers[1]);

    return new Promise(resolve => {
        const mid = Math.floor(numbers.length / 2);
        const left = numbers.slice(0, mid);
        const right = numbers.slice(mid);

        // console.log('left, right', left, right);

        Promise.all([
            sums(left),
            sums(right)
        ]).then(([leftSum, rightSum]) => {
            asyncSum(leftSum, rightSum).then(resolve);
        });
    });
}

console.time('计算时间');
sums([1, 2, 3, 4, 5, 6, 7]).then(res => {
    console.timeEnd('计算时间');
    console.log('res ===>', res);
})