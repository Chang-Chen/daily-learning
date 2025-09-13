### LRU缓存策略

```js
/**
 * LRU 缓存策略：
 * 1、访问时：如果缓存没有就算了；如果缓存内有，更新缓存位置到最后面。
 * 2、赋值时：如果之前有，就把它放在最后面；如果没有，判断下是否超出最大缓存数量，把最前面的删除，把新的加到最后
 */
class LRUCache {
    cache = new Map();
    max;

    constructor(max = Infinity) {
        this.max = max;
    }

    get(key) {
        if (!this.cache.has(key)) return;

        // 移动位置，到最后面去
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);

        return value;
    }

    set(key, value) {
        let vnode;
        if (this.cache.has(key)) {
            // 之前有，先删掉，后面再 set，就是更新位置放到最后面
            this.cache.set(key, value);
        } else {
            if (this.cache.size >= this.max) {
                // 之前没有，把最久没事用过的删除掉，然后把最新的 set
                const firstKey = this.cache.keys().next().value;
                // 拿到 vnode，一会要执行卸载操作
                vnode = this.cache.get(firstKey);
                this.cache.delete(firstKey);
            }
        }

        this.cache.set(key, value);

        return vnode;
    }
}
```