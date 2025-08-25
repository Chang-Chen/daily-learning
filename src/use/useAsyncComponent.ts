import {h, shallowRef} from 'vue';

export function defineAsyncComponent(options = {}) {
    if (typeof options === 'function') {
        options = {
            loader: options
        }
    }
    const defaultComponent = () => h('span', 'defineAsyncComponent默认占位Element');
    const {
        loader,
        loadingComponent = defaultComponent,
        errorComponent = defaultComponent,
        timeout
    } = options;

    return {
        setup(_, {attrs, slots}) {
            const component = shallowRef(loadingComponent());
            let loaderComponent = () => new Promise((resolve, reject) => {
                loader().then(resolve, reject);
            });
            if (timeout && timeout > 0) {
                setTimeout(async () => {
                    component.value = errorComponent();
                    loaderComponent = await Promise.reject('timeout');
                }, timeout);
            }
            // function loaderComponent() {
            //     return new Promise((resolve, reject) => {
            //         if (timeout && timeout > 0) {
            //             setTimeout(() => {
            //                 reject('加载失败了！');
            //             }, timeout);
            //         }
            //         loader().then(resolve, reject);
            //     });
            // }
            loaderComponent().then(res => {
                if (res && res[Symbol.toStringTag] === 'Module') {
                    res = res.default;
                }
                component.value = res;
            }, () => {
                component.value = errorComponent();
            });

            return () => {
                return h('div', [h(component.value, attrs, slots)])
            }
        }
    }
}