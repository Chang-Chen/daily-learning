### Class 写法
```js

class Person {

    constructor(name) {
        this.name = name;
    }

    func() {
        console.log('Hello');
    }
}

```

### 转成 function 写法

```js

function Person(name) {
    if (!new.target) {
        throw new Error(`Class constructor Person cannot be invoked without 'new'`);
    }
    this.name = name;
}

Object.defineProperty(Person.prototype, 'func', {
    value: function () {
        if(!new.target){
            throw new Error(`Person.prototype.func is not a constructor`)
        }
        console.log('Hello');
    },
    enumerable: false
});

```