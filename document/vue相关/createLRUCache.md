### LRU缓存策略 TS 版本

```ts
type ReadonlyMapMethods<K, V> = Omit<Map<K, V>, "set" | "delete" | "clear">;

type LRUCache<K, V> = {
    get(key: K): V | undefined;
    set(key: K, value: V): V | undefined;
    source: ReadonlyMapMethods<K, V>;
    dump(): Readonly<Record<string, V>>;
} & ReadonlyMapMethods<K, V>;

function createLRUCache<K = any, V = any>(max: number = Infinity): LRUCache<K, V> {
    const cacheMap = new Map<K, V>();

    function get(key: K): V | undefined {
        if (!cacheMap.has(key)) return;
        const value = cacheMap.get(key)!;
        cacheMap.delete(key);
        cacheMap.set(key, value);
        return value;
    }

    function set(key: K, value: V): V | undefined {
        let removedValue: V | undefined;
        if (cacheMap.has(key)) {
            cacheMap.delete(key);
        } else if (cacheMap.size >= max) {
            const firstKey = cacheMap.keys().next().value;
            removedValue = cacheMap.get(firstKey);
            cacheMap.delete(firstKey);
        }
        cacheMap.set(key, value);
        return removedValue;
    }

    // 只读视图 Proxy
    const readOnly = new Proxy(cacheMap, {
        get(target, prop: keyof Map<K, V>, receiver) {
            if (["set", "delete", "clear"].includes(prop as string)) {
                return () => {
                    throw new Error("❌ Cannot modify cacheMap directly (read-only)");
                };
            }
            const value = Reflect.get(target, prop, receiver);
            return typeof value === "function" ? (value as Function).bind(target) : value;
        },
    }) as ReadonlyMapMethods<K, V>;

    const handler: ProxyHandler<{}> = {
        get(target, property: string | symbol, receiver) {
            if (property === "set") return set;
            if (property === "get") return get;
            if (property === "source") return readOnly;
            if (property === "dump") return () => Object.freeze(Object.fromEntries(cacheMap)) as Readonly<Record<string, V>>;

            const value = Reflect.get(cacheMap, property as keyof Map<K, V>, receiver);
            return typeof value === "function" ? (value as Function).bind(cacheMap) : value;
        },
    };

    return new Proxy({}, handler) as LRUCache<K, V>;
}

const cache = createLRUCache(2);

cache.set("A", 1);
cache.set("B", 2);
cache.get("A");
cache.set("C", 3); // 淘汰 B

console.log(cache.source);

console.log(cache.dump());
// { A: 1, C: 3 } (不可变快照对象)
```