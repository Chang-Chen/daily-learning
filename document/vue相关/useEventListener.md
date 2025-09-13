### 实现useEventListener
```js
import {ref, toValue} from 'vue'

function useEventListener(...args) {
    if (typeof args[0] === 'string') {
        args.unshift(window)
    }

    const [el, ...rest] = args
    // 参数标准化
    // args element
    // h 参数标准化 createVNode
    const bindEvent = (element) => {
        if (!element) return () => {
        }
        element = toValue(element)
        element.addEventListener(...rest)
        return () => element.removeEventListener(...rest)
    }

    let off

    watch(el, (_n, _o, onCleanup) => {
            // remove
            off = bindEvent(toValue(el))
            onCleanup(off)
        },
        {
            immediate: true
        }
    )

    return () => off();
}

const Comp = {
    setup() {
        const elRef = ref();

        const off = useEventListener('mousemove', () => {
        });

        off();

        // window
        const flag = ref(true);

        setTimeout(() => {
            flag.value = false;
        }, 1000)

        return () => {
            return flag.value && h('div', {ref: elRef}, 'hello world');
        }
    },
}
```