import {reactive} from "vue";
import {useCloned} from "@vueuse/core";

/**
 * 可重置的 reactive 函数
 * @param value
 */
export function useResettableReactive<T extends object>(value: T) {
    const state = reactive(useCloned(value) as object) as T;
    const reset = () => {
        ;(Object.keys(state) as Array<keyof T>).forEach(key => delete state[key]);
        Object.assign(state, value);
    }

    return [state, reset] as const;
}