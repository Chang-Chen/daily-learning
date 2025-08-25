
/**
 * 求最长递增子序列
 * @param {number[]} arr 目标对象
 * @returns 结果
 */
function getSequence(arr) {
    const result = [];
    // 记录前驱节点 映射表
    const map = new Map();

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];

        // 忽略第一项是 -1 或 undefined
        if (result.length === 0) {
            result.push(i);
            continue;
        }

        const lastIndex = result[result.length - 1];
        const lastItem = arr[lastIndex];

        if (item > lastItem) {
            // 当前值大于上一次的值，就把当前所有放进去
            result.push(i);
            // 记录前驱节点
            map.set(i, lastIndex);
            continue;
        } else {
            // 二分法查找
            let left = 0, right = result.length - 1;
            while (left < right) {
                const mid = Math.floor((left + right) / 2);
                // 拿到中间项
                const midItem = arr[result[mid]];
                if (midItem < item) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }

            if (arr[result[left]] > item) {
                // 找到最合适的，把索引替换进去
                result[left] = i;
                map.set(i, map.get(left));
            }
        }

        // 反向追溯
        let l = result.length;
        let last = result[l - 1];
        while (l > 0) {
            l--;
            // 纠正顺序
            result[l] = last;
            // 去前驱节点里面找
            last = map.get(last);
        }
    }

    return result.map(v => arr[v]);
}

const res = getSequence([10, 3, 5, 9, 12, 8, 15, 18]);

console.log(res);