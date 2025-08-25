<script setup lang="ts">
import {useSortable} from "@/use/useSortable.ts";
import {useAttrs, useTemplateRef} from "vue";

const modelValue = defineModel();
const container = useTemplateRef('container');
const data = useSortable(container, modelValue, useAttrs());

defineExpose({data});
</script>

<template>
  <div ref="container">
    <slot :data="data"></slot>
  </div>
</template>

<style scoped>

</style>