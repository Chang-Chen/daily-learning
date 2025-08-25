<script setup lang="ts">
import {useSortable} from "@/use/useSortable.ts";
import {ref, useTemplateRef} from "vue";

const container = useTemplateRef('container');

const list = ref([
  {name: '张三', id: 1},
  {name: '李四', id: 2},
  {name: '王五', id: 3},
  {name: '老张', id: 4},
]);

const instance = useSortable(container, list);

// 5 秒后移除拖拽事件
// setTimeout(() => {
//   instance.value.destroy();
// }, 5000);
</script>

<template>
  <div>
    <ul ref="container" style="display: flex; flex-direction: column; align-items: center; gap: 20px">
      <li v-for="(item, index) in list" :key="index">
        <el-button type="primary" block>{{ item.name }}</el-button>
      </li>
    </ul>
    <div>{{ JSON.stringify(list) }}</div>
  </div>
</template>

<style scoped>

</style>