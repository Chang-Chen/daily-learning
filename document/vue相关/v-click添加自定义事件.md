### 给v-click添加自定义事件

- Button.vue

```vue

<template>
  <div>
    <div>111</div>
    <button v-click.debounce="click">我是防抖的按钮</button>
    <div>222</div>
  </div>
</template>

<script setup>
  const click = ref();

  function onClick() {
    console.log('防抖啊');
  }

  function handleClick() {
    console.log('点击事件');
  }

  click.value = onClick;

  setTimeout(() => {
    click.value = handleClick;
  }, 10000);
</script>
```

```js
/**
 * 防抖函数
 * @param fn 函数
 * @param ms 时长
 * @return {(function(...[*]): void)|*}
 */
function debounce(fn, ms = 500) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, ms);
    };
}

const targetMap = new WeakMap();

function bindEvent(el, binding) {
    const value = binding.value;
    const options = [value].flat();
    
    /**
     *  1. 函数
     *  2. 数组 [Function,number]
     */
    const handler = debounce(...options);
    const args = ['click', handler];
    el.addEventListener(...args);
    targetMap.set(el, () => el.removeEventListener(...args));
}

const VClick = {
    mounted(el, binding, vnode) {
        bindEvent(el, binding);
    },
    updated(el, binding) {
        targetMap.get(el)?.();
        bindEvent(el, binding);
    },
    unmount(el) {
        targetMap.get(el)?.();
    },
}
```