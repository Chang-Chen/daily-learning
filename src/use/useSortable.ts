import {onMounted, onUnmounted, type Ref, shallowRef, type TemplateRef} from "vue";
import Sortable from "sortablejs";

export function useSortable<T extends object>(container: TemplateRef, list: Ref<T[]>, options?: Sortable.Options): Sortable {
    let instance = shallowRef();
    onMounted(() => {
        instance.value = Sortable.create(container.value, {
            ...options,
            animation: 500,
            onUpdate(event) {
                options?.onUpdate?.(event);
                const {newIndex, oldIndex} = event;
                const oldValue = list.value[oldIndex];
                list.value.splice(oldIndex, 1);
                list.value.splice(newIndex, 0, oldValue);
            }
        });

        onUnmounted(() => {
            instance.value.destroy();
        });
    });

    return instance;
}
