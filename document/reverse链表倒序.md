### 链表倒序

#### 方法一：

```js
function reverse(node) {
    let prev = null;
    let current = node;
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
}

// { value: 3, next: { value: 2, next: { value: 1, next: null } } }
console.log(reverse({
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
        }
    }
}))
```

#### 方法二（递归）：

```js
function reverse(node) {
    if (!node || !node.next) {
        return node;
    }

    const root = reverse(node.next);
    const curNext = node.next;
    curNext.next = node;
    node.next = null;
    return root;
}

// { value: 3, next: { value: 2, next: { value: 1, next: null } } }
console.log(reverse({
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
        }
    }
}))
```