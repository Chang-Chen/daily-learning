### this 指向问题
```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>this指向问题</title>
</head>

<body>
</body>
<script>
    // this 指向跟函数定义无关，取决于调用时的方式
    function Person() {
        console.log(this);
    }

    // new Person();  // Person {}

    // Person(); // Window

    // setTimeout(Person, 0); // Window

    const dom = document.createElement('div');
    dom.textContent = 'hello'
    document.body.append(dom)
    dom.addEventListener('click', Person); // dom
    dom.addEventListener('click', Person.bind({}));  // {}
    
    const obj = {
        a: 1,
        b: () => {
            console.log(this.a);
        },
        c: function () {
            console.log(this.a);
        }
    }
    obj.b(); // undefined
    obj.c(); // 1
</script>

</html>

```