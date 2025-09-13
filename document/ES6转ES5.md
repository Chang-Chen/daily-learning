### ES6的写法

```js
class Person {

    #aaa = 'xxx';

    static sayHi() {
        console.log('sayHi')
    }

    constructor(name) {
        this.name = name;
    }

    get username() {
        return '张' + this.name;
    }

    sayHello() {
        console.log('hello world');
    }
}
```

### 私有变量通过闭包实现

```js
var Person = (function() {
    // 私有变量
    var _aaa = 'xxx';
    
    // 构造函数
    function Person(name) {
        this.name = name;
    }
    
    // 静态方法
    Person.sayHi = function() {
        console.log('sayHi');
    };
    
    // 实例方法
    Person.prototype.sayHello = function() {
        console.log('hello world');
    };
    
    // 定义getter属性
    Object.defineProperty(Person.prototype, 'username', {
        get: function() {
            return '张' + this.name;
        },
        enumerable: true,
        configurable: true
    });
    
    return Person;
})();
```
