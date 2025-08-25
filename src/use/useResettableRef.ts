import {useCloned} from "@vueuse/core";
import {type Ref, ref} from "vue";

/**
 * 可重置的 ref 函数
 * @param value
 */
export function useResettableRef<T extends object>(value: T): [state: Ref<T>, reset: () => void] {
    const initialValue = useCloned(value);
    const state = ref(value) as Ref<T>;
    const reset = () => {
        state.value = useCloned(initialValue);
    }
    return [state, reset];
}